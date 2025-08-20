import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { validateToken } from "../services/api_auth/api_key_generator.ts";
import { supabase } from "../utils/supabase_client.ts";
import { errorMonitor } from "node:events";
import { geminiTranslation } from "../services/translation/gemini_translation.ts";
import { ExtractedString } from "../utils/types/extracted_string.ts";


serve(async (req) => {
    console.log("req", req.headers)
    const auth = req.headers.get("Authorization");

    if (!auth?.startsWith("Bearer ")) {
        return new Response(JSON.stringify({ error: "Missing API Key" }), { status: 401 });
    }
    const tokenValue = validateToken(auth)


    if (!tokenValue) {
        return new Response(JSON.stringify({ error: "Invalid format" }), { status: 400 });
    }


    const { data, error } = await supabase
        .from("api_keys")
        .select('id, projects(id, users(translation_credits), languages, base_language, glossary)')
        .eq("key_id", tokenValue.keyId)
        .eq("key_hash", tokenValue.hash)
        .eq("revoked", false)
        .maybeSingle();

    if (error || !data) {
        console.log('error is ', error)
        console.log('data is ', data)
        return new Response(JSON.stringify({
            error: "Invalid API Key",
            message: error,
        }), { status: 403 });
    }
    console.log('crdits data:', data)
    const projectId: string = data?.projects['id'];

    console.log('project id', projectId)

    const payload = await req.json();
    console.log('payload', payload)

    const strings: [] = payload['strings'];
    console.log('reqbody', strings)

    const extractedStrings: ExtractedString[] = []

    strings.forEach((e) => {
        extractedStrings.push({
            project_id: projectId,
            reference_id: e['id'],
            value: e['value'],
            icu_format: e['icu_format'],
            line_column: {
                line: e['line'],
                column: e['column'],
            },
            offset: {
                start_offset: e['start_offset'],
                end_offset: e['end_offset'],
            },
            file_path: e['file_path'],
            file_name: e['file_name'],
            placeholder_mappings: e['placeholder_mappings'],
            placeholder_types: e['placeholder_types'],
            placeholders: e['placeholders'],
            widget_hierarchy: e['widget_hierarchy'],
            user_facing_type: e['user_facing_type'],
            ui_purpose: e['ui_purpose'],
            semantic_context: e['semantic_context'],
            code_snippet: e['code_snippet'],
        });
    });

    const credits: number = data?.projects['users']['translation_credits'];
    const languages: string[] = data?.projects['languages']
    const base_language: string = data?.projects['base_language']
    const glossary: string[] = data?.projects['glossary']


    const creditsRequired = (extractedStrings.length * languages.length);

    const hasCredits = credits >= creditsRequired

    const extractResponse = await supabase.from("extract").insert(extractedStrings).select('id, reference_id');
    console.log('res', extractResponse)

    for (const e of extractedStrings) {

        const icuData = await geminiTranslation.generateICUFromExtractedString(e);

        const key = icuData!['key']

        console.log('icu data:', icuData)

        const extractId = extractResponse.data?.find((value) => {
            return value.reference_id == e.reference_id
        })?.id;


        const keyData = await supabase.from('keys').insert({
            'project_id': projectId,
            'extract_id': extractId,
            'value': e.icu_format,
            'name': key,
            'plurals': icuData!['plurals'],
        }).select('id').single();


        const keyId = `${keyData.data?.id}`

        console.log('key id', keyId)


        const translatedData = await geminiTranslation.translate({
            name: key,
            value: icuData!['icu_message'],
            languages: languages,
            base_language: base_language,
            id: keyId,
            glossary: glossary,
            plurals: icuData!['plurals'],
        });

        console.log('translated data', translatedData)


        await supabase.from("keys").update({
            translations: translatedData,
            is_translating: false,
            is_translated: true,
            name: key,
            last_updated_at: new Date().toISOString(),
        }).eq('id', keyId);

        await supabase.from("extract").update({
            is_translated: true,
            last_updated_at: new Date().toISOString(),
        }).eq('id', extractId);

    }

    console.log('Finish!')

    return new Response(JSON.stringify({ success: true, }), {
        headers: { "Content-Type": "application/json" },
        status: 200,
    });
});