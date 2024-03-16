"use client";
import { useContext, useState } from "react";
import { MutableRefObject, useRef } from "react";
import Card from "@/components/Card";
import { QuestionsContext } from "@/context/QuestionContext";
import { Question } from "@/types/Question";
import React from "react";
import { LuArrowLeftRight } from "react-icons/lu";
import Nav from "@/components/Nav";

export default function Questions() {
  const { questions } = useContext(QuestionsContext);
  const [correctAnswer, setCorrectAnswer] = useState({
    answerSelected: false,
    correctAnswer: false,
    text: "left or right?",
    icon: <LuArrowLeftRight />,
  });

  let textareaRef: MutableRefObject<HTMLTextAreaElement | null> =
    useRef<HTMLTextAreaElement>(null);
  let bg1Ref: MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null);
  let bg2Ref: MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null);
  let navRef: MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null);

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
      <main className="flex flex-col h-[100vh] justify-between overflow-x-hidden z-10">
        <React.Fragment>
          <div
            ref={bg1Ref}
            className="bg-lightGray w-full h-full absolute -z-40 transition-colors"
          ></div>
          <div
            ref={bg2Ref}
            className="bg-myRed1 rounded-b-[5rem] w-full h-1/3 absolute -z-30 transition-colors"
          ></div>
        </React.Fragment>
        <Nav myRef={navRef} />

        <div className="h-full flex justify-center md:pt-24 pt-40">
          {questions &&
            questions.map((question: Question, index) => (
              <Card
                textareaRef={textareaRef}
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

        {/* <div className="bg-myRed1 rounded-3xl mx-[12%] sm:mx-auto mb-12 pt-4 max-w-[28rem] border border-white">
          <textarea
            ref={textareaRef}
            onChange={(e) => setText(e.target.value)}
            placeholder="Your answer"
            rows={1}
            className="w-full outline-none text-center text-white max-w-full pb-4 px-4 border-b border-b-1 border-b-white bg-myRed1 rounded-xl placeholder-lightGray"
          >

          </textarea>
          <button
            className="absolute right-0 "
            onClick={() => onSubmit(text)}>submit</button>
        </div> */}
      </main>
    </React.Fragment>
  );
}
