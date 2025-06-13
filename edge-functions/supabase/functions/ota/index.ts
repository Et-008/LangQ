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


function hashKeySecret(secret: string): string {
  return createHash('sha256').update(secret).digest('hex');
}




