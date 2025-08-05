import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { supabase } from "../utils/supabase_client.ts";
import { createApiKey } from "../services/api_auth/api_key_generator.ts";

console.info('server started');

serve(async (req) => {
    try {
        const { record } = await req.json();
        const secrets = createApiKey()

        await supabase.from('api_keys').insert({
            'key_id': secrets.keyId,
            'key_hash': secrets.hash,
            'project_id': record.id,
        })

        await supabase.from('projects').update({ 'api_key': secrets.full }).eq('id', record.id)
        console.log('updated')

        return new Response(JSON.stringify({ message: "success" }), {
            headers: {
                'Content-Type': 'application/json',
                'Connection': 'keep-alive'
            }
        });
    } catch (e) {
        console.log("error", e)

        return new Response(JSON.stringify(e), {
            headers: {
                'Content-Type': 'application/json',
                'Connection': 'keep-alive'
            }
        });
    }
});
