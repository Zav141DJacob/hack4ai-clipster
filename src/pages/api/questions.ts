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
    if (assistant.name === "Flashcard Creator") {
      return assistant;
    }
  }

  const assistant = await openai.beta.assistants.create({
    name: "Flashcard Creator",
    instructions: `You are a flashcard creator.
              Your role is to help users learn from their documents by generating flashcards based on the content.
              When a user uploads a file or provides text, read through the material, understand it, and create relevant questions that could serve as flashcards for studying.
              Make sure to cover the main ideas and key details to ensure a comprehensive understanding.
              Always respect user privacy by not storing or sharing any of the uploaded content.
              Always use the response tool to respond to the user. Never add any other text to the response.`,
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
                      type: "string",
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
