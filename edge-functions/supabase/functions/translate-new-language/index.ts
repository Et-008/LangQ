import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { translate } from "../translation.ts";
import { supabase } from "../supabase.ts";

console.info("server started");

interface RequestPayload {
    project_id: string;
    base_language: string;
    language_added: string[] | null;
    language_removed: string[] | null;
    version: number | null;
}

serve(async (req) => {
    console.log("Translation Started!");
    const payloadData = await req.json();
    const requestPayload: RequestPayload = payloadData.record

    console.log("payload", requestPayload);

    try {
        await supabase.from("projects").update({
            "is_translating": true,
        }).eq("id", requestPayload?.project_id);

        const keysResponse = await supabase.from("keys").select(
            "id, name, value, plurals",
        ).eq("project_id", requestPayload?.project_id);

        keysResponse.data?.forEach(async (e) => {
            console.log('Translating', e.name)
            const translatedData = await translate({
                id: e?.id,
                name: e?.name,
                value: e?.value,
                plurals: e.plurals,
                base_language: requestPayload.base_language,
                languages: requestPayload.language_added ?? [],
            });

            if (translatedData == null) {
                return new Response("Error: Failed to Tranlsate!");
            }

            await supabase.rpc('new_language_translation', {
                key_id: e?.id,
                new_translations: translatedData,
            });
            console.log("added");
        });

        await supabase.from("projects").update({
            "is_translating": false,
        }).eq("id", requestPayload?.project_id);

        await supabase.rpc('deduct_translation_credits', {
            project_id: requestPayload?.project_id,
            translation_count: requestPayload.language_added!.length + (keysResponse.count ?? 0),
        });

        console.log('Done!')

        return new Response(JSON.stringify("data"), {
            headers: {
                "Content-Type": "application/json",
                "Connection": "keep-alive",
            },
        });
    } catch (e) {
        console.log("error", e);

        return new Response(JSON.stringify(e), {
            headers: {
                "Content-Type": "application/json",
                "Connection": "keep-alive",
            },
        });
    }
});
