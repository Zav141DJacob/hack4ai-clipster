import { Question } from "@/types/Question";
import React, { MutableRefObject } from "react";
import TinderCard from "react-tinder-card";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaRegTimesCircle } from "react-icons/fa";

interface Props {
  bg1Ref: MutableRefObject<HTMLDivElement | null>;
  bg2Ref: MutableRefObject<HTMLDivElement | null>;
  navRef: MutableRefObject<HTMLDivElement | null>;
  question: Question;
  setCorrectAnswer: React.Dispatch<
    React.SetStateAction<{
      answerSelected: boolean;
      correctAnswer: boolean;
      text: string;
      icon: React.JSX.Element;
    }>
  >;
  correctAnswer: {
    answerSelected: boolean;
    correctAnswer: boolean;
    text: string;
    icon: React.JSX.Element;
  };
}

const Card = ({
  bg1Ref,
  bg2Ref,
  navRef,
  question,
  setCorrectAnswer,
  correctAnswer,
}: Props) => {
  const clickEvent = () => {
    bg1Ref.current?.classList.toggle("bg-myRed1");
    bg1Ref.current?.classList.toggle("bg-lightGray");
    bg2Ref.current?.classList.toggle("bg-myRed1");
    bg2Ref.current?.classList.toggle("bg-lightGray");
    navRef.current?.classList.toggle("text-white");
    navRef.current?.classList.toggle("text-myRed2");
  };

  const onSwipe = (direction: string) => {
    if (question.a === true && direction === "right") {
      setCorrectAnswer({
        ...correctAnswer,
        answerSelected: true,
        correctAnswer: true,
        text: "correct",
        icon: <FaRegCircleCheck />,
      });
    }

    if (question.a === false && direction === "left") {
      setCorrectAnswer({
        ...correctAnswer,
        answerSelected: true,
        correctAnswer: true,
        text: "correct",
        icon: <FaRegCircleCheck />,
      });
    }

    if (
      (question.a === true && direction === "left") ||
      (question.a === false && direction === "right")
    ) {
      setCorrectAnswer({
        ...correctAnswer,
        answerSelected: true,
        correctAnswer: false,
        text: "incorrect",
        icon: <FaRegTimesCircle />,
      });
    }
  };

  return (
    <TinderCard
      className="absolute pressable hover:cursor-grab active:cursor-grabbing"
      onSwipe={onSwipe}
      preventSwipe={["up", "down"]}
    >
      <div
        onClick={() => clickEvent()}
        className="z-10 mx-[10%] md:mx-auto h-[60vh] md:w-[24rem] bg-white rounded-xl shadow-md shadow-myRed1 flex flex-row text-center items-center"
      >
        <p className="text-center w-full font-regularBold text-2xl md:text-2xl">
          {question.q}
        </p>
      </div>
    </TinderCard>
  );
};

export default Card;
