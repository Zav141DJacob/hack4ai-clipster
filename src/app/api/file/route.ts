import { NextRequest, NextResponse } from "next/server";
import fs from "fs";

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

export const maxDuration = 10;

export async function POST(req: Request, res: NextResponse) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const res = await sendFileToFlashcardCreator(file);
    return NextResponse.json(res);
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e });
  }
}

async function sendFileToFlashcardCreator(file: File): Promise<Data> {
  const ass = await getAssistant();

  const fileObject = await openai.files.create({
    file: file,
    purpose: "assistants",
  });

  const thread = await openai.beta.threads.create();
  await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: "see attached file",
    file_ids: [fileObject.id],
  });

  let run = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: ass.id,
  });

  while (run.status !== "requires_action" && run.status !== "completed") {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    run = await openai.beta.threads.runs.retrieve(thread.id, run.id);
  }
  if (run.status === "completed") {
    const msgs = await openai.beta.threads.messages.list(thread.id);
    const lastMsg = msgs.data
      .filter(
        (message) => message.run_id === run.id && message.role === "assistant"
      )
      .pop();

    return {
      error:
        "didn't get JSON from openai: " +
        (lastMsg!.content[0] as any).text.value,
    };
  }
  const response =
    run.required_action!.submit_tool_outputs.tool_calls[0].function.arguments;

  await openai.files.del(fileObject.id);

  return JSON.parse(response);
}

async function getAssistant() {
  const list = await openai.beta.assistants.list();
  for (const assistant of list.data) {
    if (assistant.name === "Flashcard Creator File") {
      return assistant;
    }
  }

  const assistant = await openai.beta.assistants.create({
    name: "Flashcard Creator File",
    instructions: `You are a flashcard creator specialized in generating true/false statements based on the content provided by users.
      Your role is to help users learn by transforming their documents or text inputs into true/false statements. These statements should focus on the main ideas and key details to ensure a comprehensive understanding.
      Always create these statements based on the material given, but you can add fictional elements to make learning more engaging. Remember, the false statements should be plausible but clearly incorrect upon careful reading.
      Respect user privacy by not storing or sharing any of the uploaded content.
      Generate as many statements as you can.
      Always use the response tool to respond to the user, focusing solely on generating true/false statements.`,
    tools: [
      { type: "retrieval" },
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
    model: "gpt-4-1106-preview",
  });
  return assistant;
}
