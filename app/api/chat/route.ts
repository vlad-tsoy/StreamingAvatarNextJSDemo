import { openai } from "@ai-sdk/openai";
import { azure } from "@ai-sdk/azure";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const azureSearchEndpoint = process.env["AZURE_SEARCH_ENDPOINT"] || "<search endpoint>";
  const azureSearchIndexName = process.env["AZURE_SEARCH_INDEX"] || "<search index>";
  const azureSearchAdminKey = process.env["AZURE_SEARCH_ADMIN_KEY"] || "<search admin key>";

  const model = azure("gpt-4o", {
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

  const result = await streamText({
    model: azure("gpt-4o"{}),
    messages,
    
  });

  console.log("Result: ", result.toAIStreamResponse());

  return result.toAIStreamResponse();
}

/*import { AzureOpenAI } from "openai";
import "@azure/openai/types";
require('dotenv').config();



export async function POST(req: Request) {

    const { messages } = await req.json();

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
        messages: messages,
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

    console.log("Result: ", result.toReadableStream);

    for (const choice of result.choices) {
        console.log(choice.message);
    }

    return result.toReadableStream;
}*/