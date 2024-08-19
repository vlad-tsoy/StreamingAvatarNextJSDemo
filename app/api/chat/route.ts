import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai("gpt-4-turbo"),
    messages,
  });

  return result.toAIStreamResponse();
}

/*import { AzureOpenAI } from "openai";
import "@azure/openai/types";
require('dotenv').config();



export async function main() {
    const azureSearchEndpoint = process.env["AZURE_SEARCH_ENDPOINT"] || "<search endpoint>";
    const azureSearchIndexName = process.env["AZURE_SEARCH_INDEX"] || "<search index>";
    const azureSearchAdminKey = process.env["AZURE_SEARCH_ADMIN_KEY"] || "<search admin key>";

    console.log("Azure Search Endpoint: ", azureSearchEndpoint);
    console.log("Azure Search Index: ", azureSearchIndexName);
    console.log("Azure Search Admin Key: ", azureSearchAdminKey);

    const deployment = "gpt-4o";
    const apiVersion = "2024-05-01-preview";
    const endpoint = "https://dpc-openai.openai.azure.com/";
    console.log("Creating client");
    const client = new AzureOpenAI({ endpoint: endpoint, deployment: deployment, apiVersion: apiVersion });
    console.log("Created client");
    const result = await client.chat.completions.create({
        stream: false,
        messages: [
            {
                role: "system",
                content: "You are a friendly AI assisstant, that only answers for Kubernetes based converstions",
            },
            {

                role: "user",
                content:
                    "Who are the customers of DPC?",
            },
        ],
        max_tokens: 128,
        model: "",
        data_sources: [
            {
                type: "azure_search",
                parameters: {
                    endpoint: azureSearchEndpoint,
                    index_name: azureSearchIndexName,
                    authentication: {
                        type: "api_key",
                        key: azureSearchAdminKey,
                    },
                },
            },
        ],
    });

    for (const choice of result.choices) {
        console.log(choice.message);
    }
}

main().catch((err) => {
    console.error("The sample encountered an error:", err);
});*/