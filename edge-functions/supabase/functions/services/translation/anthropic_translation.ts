import Anthropic from "npm:@anthropic-ai/sdk";
import { supabase } from "../../utils/supabase_client.ts";
import { TranslationInput } from "../../utils/types/translationInput.ts";
import { generateTask, systemMessage } from "./translation.ts";

const anthropic = new Anthropic({
    apiKey: Deno.env.get("ANTHROPIC_API"),
});
const model = "claude-sonnet-4-20250514";

async function translate(input: TranslationInput): Promise<{ [key: string]: string } | null> {

    const task = generateTask(input)

    const prompt: Anthropic.Messages.MessageCreateParamsNonStreaming = {
        "model": model,
        max_tokens: 2048,
        system: systemMessage,
        "messages": [
            {
                role: "user",
                content: JSON.stringify(task)
            }
        ]
    }

    try {
        const translationResponse = await anthropic.messages.create(prompt);

        if (translationResponse.content) {
            const parsedData = JSON.parse(translationResponse.content[0].text ?? "");
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
        } else {
            throw "Translation Failed";
        }
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

export const anthropicTransalation = { translate }