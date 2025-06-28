import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { WebClient } from "npm:@slack/web-api";
import { Block, ChatPostMessageResponse, KnownBlock } from "npm:@slack/web-api";

const slackClient = new WebClient(Deno.env.get("SLACK_BOT_TOKEN")!);

serve(async (req) => {
    try {
        const requestpayload = await req.json();
        console.log("payload", requestpayload);

        await sendMessage("support", requestpayload["content"]);

        return new Response("Message Sent!", {
            headers: { "Content-Type": "application/json" },
        });
    } catch (e) {
        console.log("Error:", e);

        return new Response("Failed to Send!", {
            headers: { "Content-Type": "application/json" },
        });
    }
});

// Basic message sending
async function sendMessage(
    channel: string,
    text: string,
    blocks?: (KnownBlock | Block)[],
): Promise<ChatPostMessageResponse | null> {
    try {
        const response = await slackClient.chat.postMessage({
            channel,
            text,
            blocks,
        });
        return response;
    } catch (error) {
        console.error("Error sending message:", error);
        throw error;
    }
}
