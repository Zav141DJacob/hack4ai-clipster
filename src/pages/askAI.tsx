import { EditIcon } from "@chakra-ui/icons";
import { Center } from "@chakra-ui/react";
import { CiPaperplane } from "react-icons/ci";
import { useContext, useState } from "react";
import { QuestionsContext } from "@/context/QuestionContext";
import { TailSpin } from "react-loader-spinner";
import React from "react";

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

        <div className="text-white h-1/5 font-regularBold text-center flex flex-col justify-end gap-5">
          <p className="text-3xl lg:text-5xl">Hey, Darja!</p>
          <p className="text-sm sm:text-md md:text-lg lg:text-xl">
            What would you like to study today?
          </p>
        </div>

        <div className="shadow-md shadow-myRed1 rounded-3xl mx-[10%] text-sm sm:text-md md:text-lg text-center flex flex-col justify-center bg-lightGray py-4 gap-4">
          <div className="flex px-6 items-center">
            <textarea
              onChange={(e) => setText(e.target.value)}
              placeholder="Ask AI..."
              rows={1}
              className="w-full outline-none text-darkGray max-w-full bg-lightGray shadow-sm rounded-t-3xl placeholder-gray"
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
              <CiPaperplane onClick={() => fetchQuestions(text)} size={20} />
            )}
          </div>
          <div className="w-full outline-none text-center text-gray max-w-full px-4 border-b border-b-1 border-b-white rounded-b-3xl gap-1 flex">
            <Center>
              <EditIcon w="16px" h="16px" />
            </Center>
            Drop PDF, JPEG or PNG
          </div>
        </div>
        <div className="flex gap-2 justify-around mx-[10%]">
          <div className="shadow-md shadow-myRed1 rounded-3xl min-w-28 text-center flex flex-col justify-center bg-lightGray"></div>
          <div className="flex flex-wrap gap-2">
            <div className="shadow-md shadow-myRed1 rounded-2xl w-12 h-12 text-center flex flex-col justify-center bg-lightGray"></div>
            <div className="shadow-md shadow-myRed1 rounded-2xl w-12 h-12 text-center flex flex-col justify-center bg-lightGray"></div>
            <div className="shadow-md shadow-myRed1 rounded-2xl w-12 h-12 text-center flex flex-col justify-center bg-lightGray"></div>
            <div className="shadow-md shadow-myRed1 rounded-2xl w-12 h-12 text-center flex flex-col justify-center bg-lightGray"></div>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
}
