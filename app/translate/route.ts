import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request, response: Response) {
  const supabase = await createClient();

  request?.json().then((res) => {
    console.log("res => ", res);
    getTranslatedDataFromLLM(res?.record?.value)
      .then((data) => {
        console.log("data => ", data);
        supabase
          .from("keys")
          .update({
            en: "Test",
            es: "Test",
            ar: "Test",
          })
          .eq("project_id", res?.record?.project_id)
          .eq("id", res?.record?.id);
      })
      .catch((err) => {
        console.log("err => ", err);
      });
  });

  async function getTranslatedDataFromLLM(textToTranslate: string) {
    const apiKey = process.env.LAMA_API_KEY; // Replace with your actual API key
    const url = "https://api.together.xyz/v1/chat/completions";

    const messages = [
      {
        role: "You are a localisation translation system",
        content: JSON.stringify({
          task: "localize the given values for the given languages. Give output in a json file. Just the json output, no explanation",
          value: textToTranslate,
          languages: ["en", "es", "ar"],
          example: {
            Input: {
              laptopsSold:
                "There are {count1 : plural} sold on {dateTime} which was worth {amount}$. But last week {count2:plural} were sold.",
            },
            output: {
              en: {
                laptopsSold:
                  "There are {count1} sold on {dateTime} which was worth {amount}$. But last week {count2} were sold.",
                "@laptopsSold": {
                  placeholders: {
                    count1: {
                      plural: {
                        "0": "no laptop",
                        "1": "1 laptop",
                        other: "# laptops",
                      },
                    },
                    count2: {
                      plural: {
                        "0": "no laptops",
                        "1": "1 laptop",
                        other: "# laptops",
                      },
                    },
                  },
                },
              },
              ar: {
                laptopsSold:
                  "تم بيع {count1} في {dateTime} وكان ثمنها {amount}$. ولكن الأسبوع الماضي تم بيع {count2}.",
                "@laptopsSold": {
                  description:
                    "رسالة تشير إلى عدد اللابتوبات المباعة، وتاريخ البيع، والمبلغ الإجمالي.",
                  placeholders: {
                    count1: {
                      type: "num",
                      plural: {
                        "0": "لا لابتوب",
                        "1": "لابتوب واحد",
                        "2": "لابتوبين",
                        other: "# لابتوب",
                      },
                    },
                    count2: {
                      type: "num",
                      plural: {
                        "0": "لا لابتوب",
                        "1": "لابتوب واحد",
                        "2": "لابتوبين",
                        other: "# لابتوب",
                      },
                    },
                    dateTime: { type: "DateTime" },
                    amount: { type: "String" },
                  },
                },
              },
            },
          },
        }),
      },
    ];

    const data = {
      model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
      messages: messages,
      max_tokens: null,
      temperature: 0.7,
      top_p: 0.7,
      top_k: 50,
      repetition_penalty: 1,
      stop: ["<|eot_id|>", "<|eom_id|>"],
      stream: true,
    };

    return fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => response.json());
  }

  return NextResponse.json({ status: 200 });
}
