import { supabase } from "../../utils/supabase_client.ts";
import { TranslationInput } from "../../utils/types/translationInput.ts";
import { CreateChatParameters, GoogleGenAI } from "npm:@google/genai";
import { generateTask, systemMessage } from "./translation.ts";
import { ExtractedString } from "../../utils/types/extracted_string.ts";

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


async function generateICUFromExtractedString(input: ExtractedString): Promise<{ [key: string]: any } | null> {

    console.log('Generating ICU for', input.value)

    const systemInstruction = {
        role: 'system',
        parts: [{
            text: `You are an expert localization engineer specializing in ICU MessageFormat for Flutter/Dart applications. Your role is to:

1. Convert extracted Dart strings into proper ICU MessageFormat syntax
2. Generate semantic, hierarchical key names based on file path and widget context
3. Identify and handle pluralization correctly using CLDR plural categories
4. Preserve the original meaning and tone while fixing typos

Key Requirements:
- ALWAYS use placeholder names in ICU format, never use # alone
- For plurals, ALWAYS include the placeholder name (e.g., "{count} apples" not "# apples")
- Support all CLDR plural categories when needed: zero, one, two, few, many, other
- Generate keys using dot notation hierarchy (e.g., "screen.section.elementType")
- Detect plural indicators: "count", "number", "total", "quantity", numeric placeholders, or plural nouns
- Maintain the same level of formality as the original string`
        }]
    };


    const task = {
        task: `Analyze the extracted string and generate:
1. An ICU MessageFormat string with proper plural handling if applicable
2. A semantic key name using camelCase with dot notation
3. List of plural placeholders identified

CRITICAL RULES:
- In plural messages, ALWAYS use the placeholder name explicitly: "{count} items" NOT "# items"
- Use =0 for explicit zero cases when the string implies special handling for zero
- Only create plural forms if the string context suggests counting/quantity
- For compound plurals (multiple countable items), nest the plural structures
- Fix obvious typos but preserve intentional casual language

Examples of CORRECT ICU format:
- Simple: "Welcome {userName}!"
- Plural: "{count, plural, =0 {No apples} one {{count} apple} other {{count} apples}}"
- Nested: "{fileCount, plural, one {{fileCount} file} other {{fileCount} files}} in {folderCount, plural, one {{folderCount} folder} other {{folderCount} folders}}"

Examples of key naming:
- lib/screens/home_screen.dart + "Welcome" button → "home.welcomeButton"
- lib/widgets/cart/item_counter.dart + item count text → "cart.itemCounter.countText"
- lib/dialogs/confirm_dialog.dart + cancel button → "dialog.confirm.cancelButton"

Input Context:`,

        extracted_string: input.icu_format,

        placeholders: input.placeholders?.length > 0
            ? input.placeholders
            : "No placeholders detected",

        placeholder_types: input.placeholder_types,

        widget_context: {
            widget_hierarchy: input.widget_hierarchy || "Unknown",
            semantic_context: input.semantic_context,
            ui_purpose: input.ui_purpose,
            user_facing_type: input.user_facing_type,
        },

        file_info: {
            file_path: input.file_path,
            file_name: input.file_name,
            is_widget: input.file_path?.includes('/widgets/'),
            is_dialog: input.file_path?.includes('/dialog'),
            is_common: input.file_path?.includes('/common/') || input.file_path?.includes('/shared/')
        },

        output_format: `Return ONLY valid JSON:
{
  "icu_message": "The ICU MessageFormat string",
  "key": "hierarchical.key.name",
  "plural_placeholders": ["placeholder names that are pluralized"],
  "all_placeholders": ["all placeholder names"],
  "confidence": 0.0-1.0,
  "notes": "Optional explanation for complex cases"
}`
    };


    const prompt: CreateChatParameters = {
        model: model,
        config: {
            responseMimeType: "application/json",
            thinkingConfig: {
                thinkingBudget: 0, // Disables thinking
            },
            systemInstruction: systemInstruction,
        },
    }

    try {
        const translationResponse = await gemini.chats.create(prompt).sendMessage({ message: JSON.stringify(task) });

        if (translationResponse.candidates && translationResponse.candidates[0].content && translationResponse.candidates[0].content.parts) {

            const parsedData: { [key: string]: string } = JSON.parse(translationResponse.candidates[0].content.parts[0].text ?? "");
            // const translatedData: { [key: string]: string } = {};

            // input.languages.forEach(element => {
            //     // console.log('translation', parsedData['translations'][`${element}`])
            //     translatedData[`${element}`] = parsedData[`${element}`];
            // });
            // console.log("parsedData => ", parsedData);

            // await supabase.from("translation_logs").insert({
            //     "input": JSON.stringify({ ...prompt, task }),
            //     "output": JSON.stringify(translationResponse),
            //     "key_id": input?.id,
            //     "language_count": input.languages.length,
            // });
            console.log('logged', parsedData);

            return parsedData;
        } else {
            throw "ICU creation Failed";
        }
    } catch (e) {
        console.log("error", e)
        // supabase.from("translation_logs").insert({
        //     "input": JSON.stringify(prompt),
        //     "output": JSON.stringify(e),
        //     "key_id": input?.id,
        //     "language_count": input.languages.length,
        // });

        throw e;
    }
}

export const geminiTranslation = { translate, generateICUFromExtractedString }