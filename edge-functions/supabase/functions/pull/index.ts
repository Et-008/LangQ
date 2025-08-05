import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import {validateToken} from "../services/api_auth/api_key_generator.ts";
import { supabase } from "../utils/supabase_client.ts";

serve(async (req) => {
  try {
    const auth = req.headers.get("Authorization");

    if (!auth?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Missing API Key" }), {
        status: 401,
      });
    }

    const tokenValue = validateToken(auth);

    if (!tokenValue) {
      return new Response(JSON.stringify({ error: "Invalid API format" }), {
        status: 400,
      });
    }

    const { data, error } = await supabase
      .from("api_keys")
      .select("id, projects(id, languages, base_language, version)")
      .eq("key_id", tokenValue.keyId)
      .eq("key_hash", tokenValue.hash)
      .eq("revoked", false)
      .maybeSingle();

    if (error || !data) {
      return new Response(JSON.stringify({ error: "Invalid API Key" }), {
        status: 403,
      });
    }

    const projectId: string = data?.projects.id!;
    const languages: string[] = data?.projects.languages;

    const translationResponse = await supabase.from("keys").select(
      "id, name, translations",
    ).eq("project_id", projectId);

    if (!translationResponse.data) {
      return new Response(JSON.stringify({ error: "Invalid Project" }), {
        status: 403,
      });
    }

    const translations: { [key: string]: { [key: string]: string } } = {};

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
      JSON.stringify(
        {
          languages,
          translations,
          base_language: data?.projects.base_language,
          version: data?.projects.version,
        },
      ),

      {
        headers: { "Content-Type": "application/json" },
        status: 200,
      },

    );
  } catch (e) {
    return new Response(
      JSON.stringify({ message: "Something went wrong", error: e }),
      { status: 403 },
    );
  }
});
