import { supabase } from "../../utils/supabase_client.ts";
import { TranslationInput } from "../../utils/types/translationInput.ts";
import { CreateChatParameters, GoogleGenAI } from "npm:@google/genai";
import { generateTask, systemMessage } from "./translation.ts";

const gemini = new GoogleGenAI({
    apiKey: Deno.env.get("GEMINI_API"),
});
const model = "gemini-2.5-flash";

async function translate(input: TranslationInput): Promise<{ [key: string]: string } | null> {

    const task = generateTask(input)

    const prompt: CreateChatParameters = {
        model: model,
        config: {
            responseMimeType: "application/json",
            thinkingConfig: {
                thinkingBudget: 0, // Disables thinking
            },
            systemInstruction: {
                role: 'system',
                parts: [{ text: systemMessage }],
            }
        },
    }

    try {
        const translationResponse = await gemini.chats.create(prompt).sendMessage({ message: JSON.stringify(task) });

        if (translationResponse.candidates && translationResponse.candidates[0].content && translationResponse.candidates[0].content.parts) {

            const parsedData = JSON.parse(translationResponse.candidates[0].content.parts[0].text ?? "");
            const translatedData: { [key: string]: string } = {};

            input.languages.forEach(element => {
                // console.log('translation', parsedData['translations'][`${element}`])
                translatedData[`${element}`] = parsedData[`${element}`];
            });
            // console.log("parsedData => ", parsedData);

            await supabase.from("translation_logs").insert({
                "input": JSON.stringify({ ...prompt, task }),
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

export const geminiTranslation = { translate }