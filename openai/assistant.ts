import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  console.error("Missing OPENAI_API_KEY environment variable");
  process.exit(1);
}

// Create an OpenAI connection
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const list = await openai.beta.assistants.list();

for (const assistant of list.data) {
  await openai.beta.assistants.del(assistant.id);
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
  model: "gpt-4-1106-preview",
});

async function textToAssistant(text: string): Promise<string> {
  const thread = await openai.beta.threads.create();
  await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: text,
  });

  let run = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: assistant.id,
  });

  while (run.status !== "requires_action") {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    run = await openai.beta.threads.runs.retrieve(thread.id, run.id);
  }
  const response =
    run.required_action!.submit_tool_outputs.tool_calls[0].function.arguments;
  console.log(response);
  return response;
}

async function fileToAssistant(file: File): Promise<string> {
  return "todo";
}

const server = Bun.serve({
  port: 4000,
  async fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === "/")
      return new Response(Bun.file("index.html"), {
        headers: {
          "Content-Type": "text/html",
        },
      });

    if (url.pathname === "/submit" && req.method === "POST") {
      const formdata = await req.formData();
      const document = formdata.get("document");
      const text = formdata.get("text");
      const type = formdata.get("type");
      if (type === "text") {
        return new Response(await textToAssistant(text));
      }
      return new Response(await fileToAssistant(document));
    }

    return new Response("Not Found", { status: 404 });
  },
});

console.log(`Listening on http://localhost:${server.port}`);
