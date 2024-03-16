// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type Data = {
  correct: boolean;
  feedback: string;
};

type InputData = {
  question: string;
  expected: string;
  answer: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let input = req.body as InputData;
  const response = await validateQuestionAnswer(
    input.question,
    input.expected,
    input.answer
  );

  res.status(200).json(JSON.parse(response));
}

async function validateQuestionAnswer(
  question: string,
  expected: string,
  answer: string
): Promise<string> {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `Given a question, correct answer and user submitted answer, evaluate whether the user provided answer matches the expected answer.
          The order of the text in the answer does not matter, if the answer is similar to the correct answer, return correct=true and still give feedback. 
          Give the response as a json object containing two keys, correct (true or false) and feedback (string).`,
      },
      {
        role: "user",
        content: `Question: "${question}", Correct answer: "${expected}", Answer: "${answer}"`,
      },
    ],
    response_format: { type: "json_object" },
    model: "gpt-3.5-turbo",
  });
  return completion.choices[0].message.content!;
}
