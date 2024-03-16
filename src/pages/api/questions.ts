// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type Data = {
  questions?: {
    q: string;
    a: string;
  }[];
  error?: string;
};

type InputData = {
  text: string;
};

export const config = {
  maxDuration: 10,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let input = req.body as InputData;
  if (!input.text) {
    res.status(400).json({ error: "Missing text" });
    return;
  }
  const response = await sendTextToFlashcardCreator(input.text);

  res.status(200).json(JSON.parse(response));
}

async function sendTextToFlashcardCreator(text: string): Promise<string> {
  const thread = await openai.beta.threads.create();
  await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: text,
  });

  const ass = await getAssistant();

  let run = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: ass.id,
  });

  while (run.status !== "requires_action") {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    run = await openai.beta.threads.runs.retrieve(thread.id, run.id);
  }
  const response =
    run.required_action!.submit_tool_outputs.tool_calls[0].function.arguments;
  return response;
}

async function getAssistant() {
  const list = await openai.beta.assistants.list();
  for (const assistant of list.data) {
    if (assistant.name === "Flashcard Creator New") {
      return assistant;
    }
  }

  const assistant = await openai.beta.assistants.create({
    name: "Flashcard Creator New",
    instructions: `You are a flashcard creator specialized in generating true/false statements based on the content provided by users.
    Your role is to help users learn by transforming their documents or text inputs into true/false statements. These statements should focus on the main ideas and key details to ensure a comprehensive understanding.
    Always create these statements based on the material given, but you can add fictional elements to make learning more engaging. Remember, the false statements should be plausible but clearly incorrect upon careful reading.
    Respect user privacy by not storing or sharing any of the uploaded content.
    Generate as many statements as you can.
    Always use the response tool to respond to the user, focusing solely on generating true/false statements.`,
    tools: [
      {
        type: "function",
        function: {
          name: "response",
          description: "JSON",
          parameters: {
            type: "object",
            properties: {
              questions: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    q: {
                      type: "string",
                    },
                    a: {
                      type: "boolean",
                    },
                  },
                  required: ["q", "a"],
                },
              },
            },
            required: ["questions"],
          },
        },
      },
    ],
    model: "gpt-3.5-turbo",
  });
  return assistant;
}
