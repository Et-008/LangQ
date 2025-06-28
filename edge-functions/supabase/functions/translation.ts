import OpenAI from "npm:openai";
import { supabase } from "./supabase.ts";
import { TranslationInput } from "./types/translationInput.ts";

const openAI = new OpenAI({
    apiKey: Deno.env.get("OPENAI_API"),
});

const model = "gpt-4o-mini"

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

export async function translate(input: TranslationInput): Promise<{ [key: string]: string } | null> {

    const task = {
        task: "Translate and generate ICU messages for the given languages from the base language value. Handle all plural categories correctly.",
        key: input.name,
        value: input.value,
        plurals: input.plurals,
        baseLanguage: input.base_language,
        languages: input.languages,
    };

    const prompt: OpenAI.Chat.Completions.ChatCompletionCreateParamsNonStreaming = {
        "model": model,
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

        const parsedData = JSON.parse(translationResponse.choices?.[0]?.message?.content ?? "");
        const translatedData: { [key: string]: string } = {};

        input.languages.forEach(element => {
            // console.log('translation', parsedData['translations'][`${element}`])
            translatedData[`${element}`] = parsedData['translations'][`${element}`];
        });
        // console.log("parsedData => ", parsedData);

        await supabase.from("translation_logs").insert({
            "input": JSON.stringify(prompt),
            "output": JSON.stringify(translationResponse),
            "key_id": input?.id,
            "language_count": input.languages.length,
        });
        console.log('logged');

        return translatedData

    } catch (e) {
        console.log("error", e)
        supabase.from("translation_logs").insert({
            "input": JSON.stringify(prompt),
            "output": JSON.stringify(e),
            "key_id": input?.id,
            "language_count": input.languages.length,
        });

        throw e;
    }
}