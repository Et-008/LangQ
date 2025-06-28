import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { hashKeySecret } from "../api_key_generator.ts";
import { supabase } from "../supabase.ts";

export const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
        "authorization, x-client-info, apikey, content-type",
};


serve(async (req) => {
    // This is needed if you're planning to invoke your function from a browser.
    if (req.method === "OPTIONS") {
        return new Response("ok", {
            headers: corsHeaders,
        });
    }
    const auth = req.headers.get("Authorization");
    if (!auth?.startsWith("Bearer ")) {
        return new Response(
            JSON.stringify({
                error: "Missing API Key",
            }),
            {
                status: 401,
                headers: {
                    ...corsHeaders,
                    "Content-Type": "application/json",
                },
            },
        );
    }
    const token = auth.slice(7); // strip "Bearer "
    const [keyId, keySecret] = token.split(".");
    if (!keyId || !keySecret) {
        return new Response(
            JSON.stringify({
                error: "Invalid format",
            }),
            {
                status: 400,
                headers: {
                    ...corsHeaders,
                    "Content-Type": "application/json",
                },
            },
        );
    }
    const hashed = hashKeySecret(keySecret);
   
    const { data, error } = await supabase.from("api_keys").select(
        "id, projects(id, languages, base_language, version)",
    ).eq("key_id", keyId).eq("key_hash", hashed).eq("revoked", false)
        .maybeSingle();
    if (error || !data) {
        return new Response(
            JSON.stringify({
                error: "Invalid API Key",
            }),
            {
                status: 403,
                headers: {
                    ...corsHeaders,
                    "Content-Type": "application/json",
                },
            },
        );
    }
    const projectId = data?.projects.id;
    let languages = data?.projects.languages;
    const bodyData = await req?.json();
    if (bodyData?.langCode) {
        languages = languages?.filter((lang) => lang === bodyData?.langCode);
    }
    const translationResponse = await supabase.from("keys").select(
        "id, name, translations",
    ).eq("project_id", projectId);
    if (!translationResponse.data) {
        return new Response(
            JSON.stringify({
                error: "Invalid Project",
            }),
            {
                status: 403,
                headers: {
                    ...corsHeaders,
                    "Content-Type": "application/json",
                },
            },
        );
    }
    const translations = {};
    translationResponse.data?.forEach((e) => {
        languages.forEach((langCode) => {
            if (e.translations != null) {
                if (translations[`${langCode}`] == null) {
                    translations[`${langCode}`] = {};
                }
                translations[`${langCode}`][`${e.name}`] = `${e.translations[langCode]
                    }`;
            }
        });
    });
    console.log("project version", data?.projects.version);
    return new Response(
        JSON.stringify({
            languages,
            translations,
            base_language: data?.projects.base_language,
            version: data?.projects.version,
        }),
        {
            headers: {
                ...corsHeaders,
                "Content-Type": "application/json",
            },
        },
    );
});
