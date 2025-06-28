import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { translate } from "../translation.ts";
import { supabase } from "../supabase.ts";

console.info('server started');

serve(async (req) => {
  console.log('Translation Started!')
  const { table, record } = await req.json();

  let projectId: string;
  let languages: string[] = [];
  let baseLanguage: string = 'en';

  const isUpdate = table == 'translation_update'
  if (isUpdate) {
    await supabase.from('keys').update({
      value: record?.value,
      is_translating: true,
    }).eq('id', record?.id);
    // console.log('Translation update')

    const keysResponse = await supabase.from('keys').select('id, projects(id, languages, base_language)').eq('id', record?.id).single();
    console.log('Keys', keysResponse.data)

    projectId = keysResponse.data?.projects['id'];
    languages = keysResponse.data?.projects['languages'] ?? [];
    baseLanguage = keysResponse.data?.projects['base_language'] ?? 'en';
  } else {
    projectId = record?.project_id;
    const projectResponse = await supabase.from('projects').select('base_language, languages').eq('id', projectId).single();

    languages = projectResponse.data?.languages ?? [];
    baseLanguage = projectResponse.data?.base_language ?? 'en';
  }

  try {
    // console.log("translationData => ", JSON.stringify(translationResponse))
    const translatedData = await translate({
      id: record?.id,
      name: record?.name,
      value: record?.value,
      plurals: record?.plurals,
      base_language: baseLanguage,
      languages: languages,
    });

    if (translatedData == null) {
      return new Response("Error: Failed to Tranlsate!",);
    }
    // console.log("parsedData => ", parsedData);
    const key: string | null = record?.name;

    await supabase.from("keys").update({
      translations: translatedData,
      is_translating: false,
      is_translated: true,
      name: key,
      last_updated_at: new Date().toISOString(),
    }).eq('id', record?.id);

    await supabase.rpc('increment_version', {
      'project_id': projectId,
    });

    await supabase.rpc('deduct_translation_credits', {
      project_id: projectId,
      translation_count: languages.length - 1,
    });
    console.log('added');

    return new Response(JSON.stringify("data"), {
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
