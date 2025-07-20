import { TranslationInput } from "../../utils/types/translationInput.ts";


export const systemMessage = "You are an expert translator specializing in ICU (International Components for Unicode) message format strings. Translate the given ICU message from the base language to all specified target languages while preserving the exact ICU syntax and structure.\nCritical Requirements:\n\nMaintain ALL ICU syntax exactly: {variable, plural, ...} structure\nKeep ALL variable names unchanged (e.g., {carCounts}, {roadName})\nAdapt plural categories according to each target language's rules:\n\nEnglish: =0, one, other\nSpanish: =0, one, other\nArabic: =0, one, two, few, many, other\nRussian: one, few, many, other\nPolish: one, few, many, other\n\n\nTranslate ONLY the text content between the braces\nEnsure grammatically correct translations that sound natural\nPreserve number placeholders like {carCounts} within the translated text\nOutput ONLY valid JSON with no additional text or explanation.";

export const transaltionExample = {
    "example": {
        input: {
            value: "There {carCounts, plural, =0{are no cars} one{is 1 car} other{are {carCounts} cars}} on the road {roadName}.",
            plurals: ["carCounts"],
            baseLanguage: "en",
            languages: ["en", "es", "ar"],
        },
        output: {
            "en": "There {carCounts, plural, =0{are no cars} one{is 1 car} other{are {carCounts} cars}} on the road {roadName}.",
            "es": "Hay {carCounts, plural, =0{ningún coche} one{1 coche} other{{carCounts} coches}} en la carretera {roadName}.",
            "ar": "هناك {carCounts, plural, =0{لا توجد سيارات} one{سيارة واحدة} two{سيارتان} few{{carCounts} سيارات} many{{carCounts} سيارة} other{{carCounts} سيارة}} على الطريق {roadName}."
        },
    }
};

export function generateTask(input: TranslationInput) {
    return {
        task: "Translate the ICU message for the given languages from the base language value. Don't translate glossary. Handle all plural categories correctly. Correct if there is any typo in the ICU message. Example output: {\n\"en-US\": \"[original English ICU string]\",\n \"es-ES\": \"[Spanish translation with ICU format]\",\n \"fr\": \"[French translation with ICU format]\",\n }",
        key: input.name,
        value: input.value,
        plurals: input.plurals,
        baseLanguage: input.base_language,
        languages: input.languages,
        glossary: input.glossary,
    };
}

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

