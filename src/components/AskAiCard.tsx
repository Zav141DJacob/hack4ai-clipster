import React from "react";

interface Props {
  title: string;
  description: string;
  image?: string;
}

const AskAiCard = ({ title, description, image }: Props) => {
  return (
    <div className="shadow-md shadow-myRed1 rounded-2xl w-full flex flex-col justify-between p-5 bg-lightGray h-full  overflow-hidden">
      <span className="underline text-base mb-5">{title}</span>
      <p className="text-gray mb-5 text-sm">{description}</p>
      <div className="flex md:justify-end">
        <img className="md:w-40 w-96" src={image} />
      </div>
    </div>
  );
};

export default AskAiCard;
