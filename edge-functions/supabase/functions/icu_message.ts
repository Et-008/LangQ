import OpenAI from "npm:openai";

const openAI = new OpenAI({
    apiKey: Deno.env.get("OPENAI_API"),
});

const icu_message_schema = {
    "type": "object",
    "properties": {
        "icu_message": {
            "type": "string",
            "description":
                "The ICU MessageFormat string with proper pluralization syntax",
        },
        "variables_identified": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "name": { "type": "string" },
                    "type": {
                        "type": "string",
                        "enum": ["number", "string", "date", "time"],
                    },
                    "requires_pluralization": { "type": "boolean" },
                },
                "required": ["name", "type", "requires_pluralization"],
            },
            "description": "List of variables found in the input message",
        },
        "explanation": {
            "type": "string",
            "description":
                "Brief explanation of the ICU format transformations applied",
        },
    },
    "required": ["icu_message", "variables_identified", "explanation"],
};

async function generate_icu_message(input_message: string) {
    const response = await openAI.chat.completions.create({
        "model": "gpt-4o-mini",
        "store": false,
        "response_format": {
            "type": "json_schema",
            "json_schema": {
                "name": "generate_icu_message",
                "strict": false,
                "schema": icu_message_schema,
            },
        },
        "messages": [
            {
                "role": "system",
                "content":
                    "You are an expert in ICU MessageFormat. Your task is to convert simple templated messages into proper ICU MessageFormat strings. Always ensure proper pluralization for countable nouns and appropriate verb forms.",
            },
            {
                role: "user",
                content: JSON.stringify({
                    "Example 1": {
                        input: "You have {messageCount} messages",
                        output:
                            "You have {messageCount, plural, =0{no messages} one{1 message} other{{messageCount} messages}}",
                    }
                }),
            },
            {
                role: "user",
                content: JSON.stringify({
                    "Example 2": {
                        input: "{userCount} users are online",
                        output:
                            "{userCount, plural, =0{No users are} one{1 user is} other{{userCount} users are}} online",
                    }
                }),
            },
            {
                role: "user",
                content: `Convert this message to ICU MessageFormat: ${input_message}`,
            },
        ],
    });

    console.log('response',response)
    

    return response;
}
