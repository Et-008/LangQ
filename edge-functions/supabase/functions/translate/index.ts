// Setup type definitions for built-in Supabase Runtime APIs
// import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
// import Together from "https://esm.sh/together-ai";
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import OpenAI from "npm:openai";


console.info('server started');

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

const openAI = new OpenAI({
  apiKey: Deno.env.get("OPENAI_API"),
});


const jsonSchema = {
  "type": "object",
  "properties": {
    "translations": {
      "type": "object",
      "patternProperties": {
        "^[a-z]{2,3}(-[A-Z]{2})?$": {
          "type": "object",
          "properties": {
            "key": {
              "type": "string"
            },
            "value": {
              "type": "string"
            }
          },
          "required": [
            "key",
            "value"
          ],
          "additionalProperties": false
        }
      },
      "additionalProperties": false
    }
  },
  "required": [
    "translations"
  ],
  "additionalProperties": false
};

const example1 = {
  "example1": {
    value: "There are {carCounts} on the road {roadName}.",
    plurals: ["carCounts"],
    baseLanguage: "en",
    languages: ["en", "es", "ar"],
    output: {
      "en": "There {carCounts, plural, =0{are no cars} one{is 1 car} other{are {carCounts} cars}} on the road {roadName}.",
      "es": "Hay {carCounts, plural, =0{ningún coche} one{1 coche} other{{carCounts} coches}} en la carretera {roadName}.",
      "ar": "هناك {carCounts, plural, =0{لا توجد سيارات} one{سيارة واحدة} two{سيارتان} few{{carCounts} سيارات} many{{carCounts} سيارة} other{{carCounts} سيارة}} على الطريق {roadName}."
    },
  }
};

// const example2 = {
//   "example2": {
//     value: "There are {appleCount} each with {wormCount} worms and {orangeCount} each with {seedCount} seeds on the table.",
//     plurals: ["appleCount", "orangeCount", "wormCount", "seedCount"],
//     baseLanguage: "en",
//     languages: ["en", "es", "ar"],
//     output: {
//       "en": "There {appleCount, plural, =0{are no apples} one{is 1 apple with {wormCount, plural, =0{no worms} one{1 worm} other{{wormCount} worms}}} other{are {appleCount} apples each with {wormCount, plural, =0{no worms} one{1 worm} other{{wormCount} worms}}}} and {orangeCount, plural, =0{no oranges} one{1 orange with {seedCount, plural, =0{no seeds} one{1 seed} other{{seedCount} seeds}}} other{{orangeCount} oranges each with {seedCount, plural, =0{no seeds} one{1 seed} other{{seedCount} seeds}}}} on the table.",
//       "es": "Hay {appleCount, plural, =0{no hay manzanas} one{1 manzana con {wormCount, plural, =0{ningún gusano} one{1 gusano} other{{wormCount} gusanos}}} other{{appleCount} manzanas cada una con {wormCount, plural, =0{ningún gusano} one{1 gusano} other{{wormCount} gusanos}}}} y {orangeCount, plural, =0{no hay naranjas} one{1 naranja con {seedCount, plural, =0{sin semillas} one{1 semilla} other{{seedCount} semillas}}} other{{orangeCount} naranjas cada una con {seedCount, plural, =0{sin semillas} one{1 semilla} other{{seedCount} semillas}}}} en la mesa.",
//       "ar": "هناك {appleCount, plural, =0{لا توجد تفاحات} one{تفاحة واحدة بها {wormCount, plural, =0{لا دود} one{دودة واحدة} two{دودتان} few{{wormCount} دود} many{{wormCount} دود} other{{wormCount} دود}}} two{تفاحتان بها {wormCount, plural, =0{لا دود} one{دودة واحدة} two{دودتان} few{{wormCount} دود} many{{wormCount} دود} other{{wormCount} دود}}} few{{appleCount} تفاحات كل واحدة بها {wormCount, plural, =0{لا دود} one{دودة واحدة} two{دودتان} few{{wormCount} دود} many{{wormCount} دود} other{{wormCount} دود}}} many{{appleCount} تفاحة كل واحدة بها {wormCount, plural, =0{لا دود} one{دودة واحدة} two{دودتان} few{{wormCount} دود} many{{wormCount} دود} other{{wormCount} دود}}} other{{appleCount} تفاحة كل واحدة بها {wormCount, plural, =0{لا دود} one{دودة واحدة} two{دودتان} few{{wormCount} دود} many{{wormCount} دود} other{{wormCount} دود}}}} و {orangeCount, plural, =0{لا توجد برتقالات} one{برتقالة واحدة بها {seedCount, plural, =0{لا بذور} one{بذرة واحدة} two{بذرتان} few{{seedCount} بذور} many{{seedCount} بذور} other{{seedCount} بذور}}} two{برتقالتان بها {seedCount, plural, =0{لا بذور} one{بذرة واحدة} two{بذرتان} few{{seedCount} بذور} many{{seedCount} بذور} other{{seedCount} بذور}}} few{{orangeCount} برتقالات كل واحدة بها {seedCount, plural, =0{لا بذور} one{بذرة واحدة} two{بذرتان} few{{seedCount} بذور} many{{seedCount} بذور} other{{seedCount} بذور}}} many{{orangeCount} برتقالة كل واحدة بها {seedCount, plural, =0{لا بذور} one{بذرة واحدة} two{بذرتان} few{{seedCount} بذور} many{{seedCount} بذور} other{{seedCount} بذور}}} other{{orangeCount} برتقالة كل واحدة بها {seedCount, plural, =0{لا بذور} one{بذرة واحدة} two{بذرتان} few{{seedCount} بذور} many{{seedCount} بذور} other{{seedCount} بذور}}}} على الطاولة.",
//     },
//   }
// };

serve(async (req) => {
  console.log('Translation Started!')
  const { table, record } = await req.json();

  // console.log('Table =>', table)
  // console.log('Record =>', record)

  let projectId: string;
  let languages: string[] = [];
  let baseLanguage: string = 'en';

  const isUpdate = table == 'translation_update'
  if (isUpdate) {
    supabase.from('keys').update({
      value: record?.value,
      is_translating: true,
    }).eq('id', record?.id).then((res) => {
      // console.log('update response', res.data)
    });
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

  const task = {
    task: "Translate and generate ICU messages for the given languages from the base language value. Handle all plural categories correctly.",
    key: record?.name,
    value: record?.value,
    plurals: record?.plurals,
    baseLanguage: baseLanguage,
    languages: languages,
  };


  const prompt: OpenAI.Chat.Completions.ChatCompletionCreateParamsNonStreaming = {
    "model": "gpt-4o-mini",
    "store": false,
    "response_format": {
      "type": "json_schema",
      "json_schema": {
        "name": "icu_translation_map_response",
        "strict": false,
        "schema": jsonSchema,
      }
    },
    "messages": [
      {
        "role": "system",
        "content": "You are a professional translation assistant for app localisation. Return translations in ICU format. Handle all plural categories (zero, one, two, few, many, other) according to each language. Preserve placeholders. Fix typos and grammar. Be efficient with tokens."
      },
      {
        role: "user",
        content: JSON.stringify(example1)
      },
      {
        role: "user",
        content: JSON.stringify(task)
      }
    ]
  }


  try {
    const translationResponse = await openAI.chat.completions.create({
      "model": "gpt-4o-mini",
      "store": false,
      "response_format": {
        "type": "json_schema",
        "json_schema": {
          "name": "icu_translation_map_response",
          "strict": false,
          "schema": jsonSchema,
        }
      },
      "messages": [
        {
          "role": "system",
          "content": "You are a professional translation assistant for app localisation. Return translations in ICU format. Handle all plural categories (zero, one, two, few, many, other) according to each language. Preserve placeholders. Fix typos and grammar. Be efficient with tokens."
        },
        {
          role: "user",
          content: JSON.stringify(example1)
        },
        {
          role: "user",
          content: JSON.stringify(task)
        }
      ]
    });
    // console.log("translationData => ", JSON.stringify(translationResponse))

    if (translationResponse !== null) {
      await supabase.rpc('increment_version', {
        'project_id': projectId,
      });
    }

    const parsedData = JSON.parse(translationResponse.choices?.[0]?.message?.content ?? "");
    const translatedData: { [key: string]: string } = {};

    languages.forEach(element => {
      // console.log('translation', parsedData['translations'][`${element}`])
      translatedData[`${element}`] = parsedData['translations'][`${element}`];
    });
    // console.log("parsedData => ", parsedData);

    let key: string | null = record?.name;

    if (key == null) {
      const keyResponse = await openAI.chat.completions.create(
        {
          "model": "gpt-4o-mini",
          "store": false,
          "response_format": {
            "type": "json_schema",
            "json_schema": {
              "name": "icu_key_name_response",
              "strict": false,
              "schema": {
                "type": "object",
                "properties": {
                  "key_name": {
                    "type": "string"
                  }
                },
                "required": [
                  "key_name"
                ],
                "additionalProperties": false
              }
            }
          },
          "messages": [
            {
              "role": "system",
              "content": "You are a professional translation assistant for app localisation. Please generate a localization key for given base value using best practices: - Format the key using dot notation and camelCase - Group by semantic context (e.g., auth.loginButton, profile.userNameLabel) - Avoid redundancy (e.g., don’t include words already implied by grouping) - Keep the value exactly the same"
            },
            {
              "role": "user",
              "content": "Example 1: {input: \"Sign in with Google\", output: \"auth.signInWithGoogle\"}"
            },
            {
              "role": "user",
              "content": "Example 2: {input: \"Cancel Your Request\", output: \"message.cancel.request\"}"
            },
            {
              "role": "user",
              "content": record?.value,
            }
          ]
        }
      );
      const parsedData = JSON.parse(keyResponse.choices?.[0]?.message?.content ?? "");

      key = parsedData['key_name'];
    }

    const res = await supabase.from("keys").update({
      translations: translatedData,
      is_translating: false,
      is_translated: true,
      name: key,
      last_updated_at: new Date().toISOString(),
    }).eq('id', record?.id);
    // console.log("TransRes => ", res);

    await supabase.from("translation_logs").insert({
      "input": JSON.stringify(prompt),
      "output": JSON.stringify(translationResponse),
      "key_id": record?.id,
    }).then((res) => {
      // console.log('logsRes =>', res);
    });
    console.log('logged');

    return new Response(JSON.stringify("data"), {
      headers: {
        'Content-Type': 'application/json',
        'Connection': 'keep-alive'
      }
    });

  } catch (e) {

    console.log("error", e)
    supabase.from("translation_logs").insert({
      "input": JSON.stringify(prompt),
      "output": JSON.stringify(e),
      "key_id": record?.id,
    });

    return new Response(JSON.stringify(e), {
      headers: {
        'Content-Type': 'application/json',
        'Connection': 'keep-alive'
      }
    });
  }
});
