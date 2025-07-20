import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { supabase } from "../utils/supabase_client.ts";
import { openAiTranslation } from "../services/translation/openai_translation.ts";
import { generatePluralICU } from "../services/icu_generator.ts";

console.info('server started');

serve(async (req) => {
  console.log('Translation Started!')
  const { table, record } = await req.json();

  let projectId: string;
  let languages: string[] = [];
  let glossary: string[] = [];
  let baseLanguage: string = 'en';

  const isUpdate = table == 'translation_update'
  if (isUpdate) {
    await supabase.from('keys').update({
      value: record?.value,
      is_translating: true,
    }).eq('id', record?.id);
    // console.log('Translation update')

    const keysResponse = await supabase.from('keys').select('id, projects(id, languages, base_language, glossary)').eq('id', record?.id).single();
    console.log('Keys', keysResponse.data)

    projectId = keysResponse.data?.projects['id'];
    languages = keysResponse.data?.projects['languages'] ?? [];
    glossary = keysResponse.data?.projects['glossary'] ?? [];
    baseLanguage = keysResponse.data?.projects['base_language'] ?? 'en';
  } else {
    projectId = record?.project_id;
    const projectResponse = await supabase.from('projects').select('base_language, languages, glossary').eq('id', projectId).single();

    languages = projectResponse.data?.languages ?? [];
    glossary = projectResponse.data?.glossary ?? [];
    baseLanguage = projectResponse.data?.base_language ?? 'en';
  }

  try {
    // console.log("translationData => ", JSON.stringify(translationResponse))

    let icuMessage: string = record.value;

    if (record?.plurals?.length > 0) {
      icuMessage = await generatePluralICU(record.value, record.plurals) ?? record.value
    }

    const translatedData = await openAiTranslation.translate({
      id: record?.id,
      name: record?.name,
      value: icuMessage,
      plurals: record?.plurals,
      base_language: baseLanguage,
      languages: languages,
      glossary: glossary,
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
