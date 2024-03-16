import { EditIcon } from "@chakra-ui/icons";
import { Center } from "@chakra-ui/react";
import { CiPaperplane } from "react-icons/ci";
import { useContext, useState } from "react";
import { QuestionsContext } from "@/context/QuestionContext";
import { TailSpin } from "react-loader-spinner";
import React from "react";
import AskAiCard from "@/components/AskAiCard";

export default function AskAi() {
  const [text, setText] = useState("");
  const { fetchQuestions, loading } = useContext(QuestionsContext);

  return (
    <React.Fragment>
      <main className="flex flex-col h-[100vh] transition-colors gap-4">
        <React.Fragment>
          <div className="bg-default opacity-15 w-full h-full absolute -z-10 bg-cover sm:bg-auto "></div>
          <div className="bg-myRed1 w-full h-full absolute -z-20"></div>
          <div className="bg-white rounded-t-[5rem] w-full h-2/3 absolute -z-10 bottom-0"></div>
        </React.Fragment>

        <div className="text-white h-1/5 font-regularBold text-center flex flex-col justify-end gap-5 px-5 md:mt-0 mt-20">
          <p className="text-3xl lg:text-5xl">Hey, Darja!</p>
          <p className="text-sm sm:text-md md:text-lg lg:text-xl">
            What would you like to study today?
          </p>
        </div>

        <div className="shadow-md shadow-myRed1 rounded-3xl text-sm sm:text-md md:text-lg text-center bg-lightGray py-4 mx-3 md:mx-20 md:mt-0">
          <div className="flex px-4">
            <textarea
              onChange={(e) => setText(e.target.value)}
              placeholder="Ask AI..."
              rows={6}
              className="w-full outline-none text-darkGray max-w-full bg-lightGray  placeholder-gray resize-none border-b-2 border-border"
            />
            {loading ? (
              <TailSpin
                visible={true}
                height="20"
                width="20"
                color="#EF233C"
                radius="1"
              />
            ) : (
              <CiPaperplane
                className="cursor-pointer"
                onClick={() => fetchQuestions(text)}
                size={20}
              />
            )}
          </div>
          <div className="w-full outline-none text-center text-gray max-w-full px-4 border-b border-b-1 border-b-white rounded-b-3xl gap-1 flex mt-5">
            <Center>
              <EditIcon w="16px" h="16px" />
            </Center>
            Drop PDF, JPEG or PNG
          </div>
        </div>
        <div className="py-5 md:px-40 px-3">
          <div className="grid grid-cols-2 gap-4">
            <AskAiCard
              title="Memorise"
              description="Get back on track and go over your flashcards. "
              image="/memorize.png"
            />
            <AskAiCard
              title="Import / Export"
              description="Share existing cards with your classmates"
              image="/import.png"
            />
          </div>
        </div>
      </main>
    </React.Fragment>
  );
}
