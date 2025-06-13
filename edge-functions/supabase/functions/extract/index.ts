import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
import { createHash } from "node:crypto";


serve(async (req) => {
  console.log("req", req.headers)
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
  const extractedStrings: any[] = await req.json();

  console.log('reqbody', extractedStrings)


  const { data, error } = await supabase
    .from("api_keys")
    .select('id, project_id')
    .eq("key_id", keyId)
    .eq("key_hash", hashed)
    .eq("revoked", false)
    .maybeSingle();

  if (error || !data) {
    return new Response(JSON.stringify({
      error: "Invalid API Key",
      message: error,
    }), { status: 403 });
  }
  const projectId: string = data?.project_id!;

  extractedStrings.forEach((e) => {
    e['project_id'] = projectId
  });

  const resposne = await supabase.from("extract").upsert(extractedStrings, { onConflict: 'string, type, parent, path, platform, line_column', ignoreDuplicates: true });


  console.log('res', resposne)

  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" },
  });
});


function hashKeySecret(secret: string): string {
  return createHash('sha256').update(secret).digest('hex');
}




