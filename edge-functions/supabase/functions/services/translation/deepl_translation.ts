// import { supabase } from "../../utils/supabase_client.ts";
// import { TranslationInput } from "../../utils/types/translationInput.ts";
// import * as deepl from 'npm:deepl-node';

// const translator = new deepl.Translator(Deno.env.get("DEEPL_API")!);

// async function translate(input: TranslationInput): Promise<{ [key: string]: string } | null> {

//     try {

//         const baseLanguage = input.base_language;
//         const baseValue = input.value;
//         const translatedData: { [key: string]: string } = {}
//         const translationResponse: deepl.TextResult[] = []
//         translatedData[baseLanguage] = baseValue;

//         for (const value of input.languages) {
//             if (value != baseLanguage) {
//                 console.log('Target Lang:',value)
//                 const result = await translator.translateText(baseValue, baseLanguage, value, {
//                     modelType: 'prefer_quality_optimized',
//                 });
//                 translationResponse.push(result)
//                 translatedData[value] = result.text;
//             }
//         }

//         await supabase.from("translation_logs").insert({
//             // "input": JSON.stringify(prompt),
//             "output": JSON.stringify(translationResponse),
//             "key_id": input?.id,
//             "language_count": input.languages.length,
//         });
//         console.log('logged');

//         return translatedData

//     } catch (e) {
//         console.log("error", e)
//         supabase.from("translation_logs").insert({
//             "input": JSON.stringify(prompt),
//             "output": JSON.stringify(e),
//             "key_id": input?.id,
//             "language_count": input.languages.length,
//         });

//         throw e;
//     }
// }


// export const deepLTranslation = { translate }