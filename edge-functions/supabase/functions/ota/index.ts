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
    .select("project_id")
    .eq("key_id", keyId)
    .eq("key_hash", hashed)
    .eq("revoked", false)
    .maybeSingle();

  if (error || !data) {
    return new Response(JSON.stringify({ error: "Invalid API Key" }), { status: 403 });
  }

  const projectId = data.project_id;
  const reqdata = await req.json();
  const lastVersion = reqdata['version']

  const otaResponse = await supabase.from("ota")
    .select('id, translation, version')
    .eq("project_id", projectId)
    .gt('version', lastVersion)
    .order('version');

  if (!otaResponse.data) {
    return new Response(JSON.stringify({ error: "Invalid Project" }), { status: 403 });
  }

  const ids = otaResponse.data?.map((e) => e['id']);
  await supabase.rpc('increment_download', {
    'ids': ids,
  });

  const translationData = otaResponse.data?.map(function (e) {
    return { "translation": e['translation'], "version": e["version"] };
  })

  return new Response(JSON.stringify({ data: translationData }), {
    headers: { "Content-Type": "application/json" },
  });
});