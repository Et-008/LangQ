import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
import { createHash } from "node:crypto";


serve(async (req) => {
  const auth = req.headers.get("Authorization");

  if (!auth?.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ error: "Missing API Key" }), { status: 401 });
  }

  const token = auth.slice(7); // strip "Bearer "
  const [keyId, keySecret] = token.split(".");

  if (!keyId || !keySecret) {
    return new Response(JSON.stringify({ error: "Invalid format" }), { status: 400 });
  }

  const hashed = hashKeySecret(keySecret);

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const { data, error } = await supabase
    .from("api_keys")
    .select('id, projects(id, languages, base_language)')
    .eq("key_id", keyId)
    .eq("key_hash", hashed)
    .eq("revoked", false)
    .maybeSingle();

  if (error || !data) {
    return new Response(JSON.stringify({ error: "Invalid API Key" }), { status: 403 });
  }

  const projectId: string = data?.projects.id!;
  const languages: string[] = data?.projects.languages;

  const translationResponse = await supabase.from("keys").select('id, name, translations').eq("project_id", projectId);

  if (!translationResponse.data) {
    return new Response(JSON.stringify({ error: "Invalid Project" }), { status: 403 });
  }

  const translations: { [key: string]: { [key: string]: string } } = {}

  translationResponse.data?.forEach((e) => {
    languages.forEach((langCode) => {
      if (e.translations != null) {
        if (translations[`${langCode}`] == null) {
          translations[`${langCode}`] = {};
        }
        translations[`${langCode}`][`${e.name}`] = `${e.translations[langCode]}`;
      }
    });
  })

  return new Response(JSON.stringify({ languages, translations, base_language: data?.projects.base_language }), {
    headers: { "Content-Type": "application/json" },
  });
});


function hashKeySecret(secret: string): string {
  return createHash('sha256').update(secret).digest('hex');
}




