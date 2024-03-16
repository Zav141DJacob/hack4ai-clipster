import { Question } from "@/types/Question";
import React, { MutableRefObject } from "react";
import TinderCard from "react-tinder-card";

interface Props {
  bg1Ref: MutableRefObject<HTMLDivElement | null>;
  bg2Ref: MutableRefObject<HTMLDivElement | null>;
  navRef: MutableRefObject<HTMLDivElement | null>;
  question: Question;
}

const Card = ({ bg1Ref, bg2Ref, navRef, question }: Props) => {
  const clickEvent = () => {
    bg1Ref.current?.classList.toggle("bg-myRed1");
    bg1Ref.current?.classList.toggle("bg-lightGray");
    bg2Ref.current?.classList.toggle("bg-myRed1");
    bg2Ref.current?.classList.toggle("bg-lightGray");
    navRef.current?.classList.toggle("text-white");
    navRef.current?.classList.toggle("text-myRed2");
  };

  console.log(question);

  const onSwipe = (direction: string) => {
    console.log("You swiped: " + direction);
  };

  const onCardLeftScreen = (myIdentifier: string) => {
    console.log(myIdentifier + " left the screen");
  };

  return (
    <TinderCard
      className="absolute pressable hover:cursor-grab active:cursor-grabbing"
      onSwipe={onSwipe}
      onCardLeftScreen={() => onCardLeftScreen("fooBar")}
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
