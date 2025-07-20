import OpenAI from "npm:openai";
import { supabase } from "../../utils/supabase_client.ts";
import { TranslationInput } from "../../utils/types/translationInput.ts";
import { generateTask, systemMessage } from "./translation.ts";

const openAI = new OpenAI({
    apiKey: Deno.env.get("OPENAI_API"),
});

const model = "gpt-4o-mini"


async function translate(input: TranslationInput): Promise<{ [key: string]: string } | null> {



    const prompt: OpenAI.Chat.Completions.ChatCompletionCreateParamsNonStreaming = {
        "model": model,
        "store": false,
        "messages": [
            {
                role: "system",
                content: systemMessage,
            },
            {
                role: "user",
                content: JSON.stringify(generateTask(input))
            }
        ]
    }

    try {
        const translationResponse = await openAI.chat.completions.create(prompt);

        const parsedData = JSON.parse(translationResponse.choices?.[0]?.message?.content ?? "");
        const translatedData: { [key: string]: string } = {};

        input.languages.forEach(element => {
            // console.log('translation', parsedData['translations'][`${element}`])
            translatedData[`${element}`] = parsedData[`${element}`];
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


export const openAiTranslation = { translate }