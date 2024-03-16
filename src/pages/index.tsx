"use client";
import { useContext, useEffect, useState } from "react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Center } from "@chakra-ui/react";
import { MutableRefObject, useRef } from "react";
import Card from "@/components/Card";
import { QuestionsContext } from "@/context/QuestionContext";
import { Question } from "@/types/Question";
import React from "react";
import { LuArrowLeftRight } from "react-icons/lu";

export default function Home() {
  const [text, setText] = useState<string>("");
  const { fetchQuestions } = useContext(QuestionsContext);
  const [correctAnswer, setCorrectAnswer] = useState({
    answerSelected: false,
    correctAnswer: false,
    text: "left or right?",
    icon: <LuArrowLeftRight />,
  });

  let bg1Ref: MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null);
  let bg2Ref: MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null);
  let navRef: MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null);

  const onSubmit = (text: string) => {
    fetchQuestions(text);
  };

  const questions = [
    {
      q: "War has been a constant feature throughout human history.",
      a: true,
    },
    {
      q: "The essence of war involves a harmonious resolution of conflicts.",
      a: false,
    },
    {
      q: "Wars have been fought for various reasons such as territorial expansion and ideological supremacy.",
      a: true,
    },
    {
      q: "The aftermath of war is usually characterized by immediate prosperity and development.",
      a: false,
    },
    {
      q: "War has only negative consequences without any positive outcomes such as innovation or progress.",
      a: false,
    },
  ];

  const setClass = () => {
    if (correctAnswer.answerSelected && correctAnswer.correctAnswer) {
      return "bg-success";
    }

    if (correctAnswer.answerSelected && !correctAnswer.correctAnswer) {
      return "bg-failure";
    }
    return "bg-myRed1";
  };

  return (
    <React.Fragment>
      <main
        ref={bg1Ref}
        className="flex flex-col h-[100vh] justify-between bg-lightGray transition-colors overflow-x-hidden relative"
      >
        <div
          ref={bg2Ref}
          className="bg-myRed1 rounded-b-[5rem] w-full h-1/3 absolute -z-0"
        ></div>
        {/* nav */}
        <div
          ref={navRef}
          className="w-full text-center py-4 text-white text-2xl font-regularBold  flex justify-around z-10"
        >
          <Center>
            <ArrowBackIcon />
          </Center>
          Chapter 5
          <Center>
            <ArrowForwardIcon />
          </Center>
        </div>
        <div className="h-full flex justify-center md:pt-24 pt-40">
          {questions &&
            questions.map((question: Question, index) => (
              <Card
                question={question}
                key={index}
                bg1Ref={bg1Ref}
                bg2Ref={bg2Ref}
                navRef={navRef}
                setCorrectAnswer={setCorrectAnswer}
                correctAnswer={correctAnswer}
              />
            ))}
        </div>
        <div
          className={`${setClass()} rounded-xl mx-[10%] mb-12 flex justify-center py-5`}
        >
          <p className="text-white flex items-center">
            <span className="mr-4">{correctAnswer.text}</span>
            {correctAnswer.icon}
          </p>
        </div>
      </main>
    </React.Fragment>
  );
}
