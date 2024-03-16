'use client'
import { EditIcon } from "@chakra-ui/icons";
import { Center } from "@chakra-ui/react";
import { CiPaperplane } from "react-icons/ci";
import { useContext, useState } from "react";
import { QuestionsContext } from "@/context/QuestionContext";
import { TailSpin } from "react-loader-spinner";
import React from "react";
import Nav from "@/components/Nav";
import Card from "@/components/Card";
import MyChart from "@/components/MyChart";

export default function AskAi() {
    const [text, setText] = useState("");
    const { fetchQuestions, loading } = useContext(QuestionsContext);


    const onSubmit = (s: string) => {

    }


    return (
        <React.Fragment>
            <main className="flex flex-col h-[100vh] justify-between overflow-x-hidden z-10">
                <React.Fragment>
                    <div className="bg-myRed1 w-full h-full absolute -z-40 transition-colors"
                    ></div>
                    <div className="bg-lightGray rounded-b-[5rem] w-full h-1/3 absolute -z-30 transition-colors"
                    ></div>
                </React.Fragment>
                <Nav swap/>


                <div className="h-[90%] flex flex-col sm:flex-row justify-center sm:mt-36 w-full absolute overflow-hidden">
                    <div
                        className="z-10 mx-[10%] md:mx-auto h-[60vh] md:w-[24rem] bg-white rounded-xl shadow-md shadow-myRed1 flex flex-col gap-4 pt-10 text-center"
                    >
                        <p className="text-center w-full font-regularBold text-2xl md:text-3xl underline">
                            Summary
                        </p>
                        <p className="text-center w-full font-regularBold text-xl md:text-2xl">
                            You should improve on these topics
                        </p>

                        <MyChart/>
                    </div>
                </div>

                <div className="h-[90%] flex flex-col sm:flex-row justify-center sm:mt-36 w-[75vw] absolute overflow-hidden -rotate-12">
                    <div
                        className="bg-lightGray z-10 mx-[10%] md:mx-auto h-[60vh] md:w-[24rem] rounded-xl shadow-md border-gray  shadow-myRed2 flex flex-col gap-4 pt-10 text-center"
                    >
                        <p className="text-center w-full font-regularBold text-2xl md:text-3xl underline">
                            
                        </p>
                        <p className="text-center w-full font-regularBold text-xl md:text-2xl">
                            
                        </p>
                    </div>
                </div>
                <div className="bg-myRed1 rounded-3xl mx-[12%] sm:mx-auto mb-12 pt-4 max-w-[28rem] border border-white relative text-white">
                    <textarea
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Ask AI..."
                        rows={1}
                        className="w-full outline-none text-center max-w-full pb-4 px-4 bg-myRed1 rounded-xl placeholder-lightGray"
                    >

                    </textarea>
                    {loading ? (
                        <TailSpin
                            wrapperClass="absolute right-4 top-5" 
                            visible={true}
                            height="20"
                            width="20"
                            color="#EF233C"
                            radius="1"
                        />
                    ) : (
                        <CiPaperplane className="absolute right-4 top-5" onClick={() => fetchQuestions(text)} size={20} />
                    )}
                </div>
            </main>
        </React.Fragment>
    );
}
