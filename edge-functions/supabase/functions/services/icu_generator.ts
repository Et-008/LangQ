import OpenAI from "npm:openai";

const openAI = new OpenAI({
    apiKey: Deno.env.get("OPENAI_API"),
});

const model = "gpt-4.1-mini"


export async function generatePluralICU(baseValue: string, plurals: string[]): Promise<string | null> {

    const task = {
        task: "Generate ICU Message Format String. Output should be an ICU message with pure string. No stringify",
        value: baseValue,
        plurals: plurals,
    };

    const icuExample = {
        "example": {
            value: "There are {carCounts} on the road {roadName}.",
            plurals: ["carCounts"],
            output: "There {carCounts, plural, =0{are no cars} one{is 1 car} other{are {carCounts} cars}} on the road {roadName}.",
        }
    };

    const prompt: OpenAI.Chat.Completions.ChatCompletionCreateParamsNonStreaming = {
        "model": model,
        "store": false,
        "messages": [
            {
                "role": "system",
                "content": "You are an expert at creating ICU (International Components for Unicode) message format strings. Given a template message with variables, you need to create a complete ICU format string that handles plural cases elegantly, with special attention to creative and natural-sounding zero cases. Correct the value if there is any typos."
            },
            {
                role: "user",
                content: JSON.stringify(icuExample)
            },
            {
                role: "user",
                content: JSON.stringify(task)
            }
        ]
    }

    try {
        const icuResponse = await openAI.chat.completions.create(prompt);
        return icuResponse.choices[0].message.content;

    } catch (e) {
        console.log("error", e)
        return null;
    }
}