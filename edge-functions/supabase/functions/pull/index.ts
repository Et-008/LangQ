import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { hashKeySecret, validateToken } from "../api_key_generator.ts";
import { supabase } from "../supabase.ts";

serve(async (req) => {
  const auth = req.headers.get("Authorization");

  if (!auth?.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ error: "Missing API Key" }), { status: 401 });
  }

  const { keyId, keySecret } = validateToken(auth)

  if (!keyId || !keySecret) {
    return new Response(JSON.stringify({ error: "Invalid format" }), { status: 400 });
  }

  const hashed = hashKeySecret(keySecret);

  const { data, error } = await supabase
    .from("api_keys")
    .select('id, projects(id, languages, base_language, version)')
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

  console.log('project version', data?.projects.version)

  return new Response(JSON.stringify(
    {
      languages, translations,
      base_language: data?.projects.base_language,
      version: data?.projects.version,

    }), {
    headers: { "Content-Type": "application/json" },
  });
});