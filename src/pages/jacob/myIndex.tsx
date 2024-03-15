'use client'
import { Inter } from "next/font/google";
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
const inter = Inter({ subsets: ["latin"] });
import { Center, Textarea } from '@chakra-ui/react'
import { MutableRefObject, useRef } from "react";


export default function Home() {

  let bg1Ref: MutableRefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);
  let bg2Ref: MutableRefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);
  let navRef: MutableRefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);

  const clickEvent = () => {
    bg1Ref.current?.classList.toggle('bg-myRed1')
    bg1Ref.current?.classList.toggle('bg-lightGray')
    bg2Ref.current?.classList.toggle('bg-myRed1')
    bg2Ref.current?.classList.toggle('bg-lightGray')
    navRef.current?.classList.toggle('text-white')
    navRef.current?.classList.toggle('text-myRed2')
  }

  return (
    <>
      {/* <div ref={bg1Ref} className="bg-lightGray rounded-b-[5rem] w-full h-full "></div> */}
      <main ref={bg1Ref} className="flex flex-col h-[100vh] justify-between bg-lightGray transition-colors">
        <div ref={bg2Ref} className="bg-myRed1 rounded-b-[5rem] w-full h-1/3 absolute -z-0"></div>
        {/* nav */}
        <div ref={navRef} className="w-full text-center py-4 text-white text-2xl font-regularBold  flex justify-around z-10">
          <Center >
            <ArrowBackIcon />
          </Center>
          Chapter 5
          <Center >
            <ArrowForwardIcon />
          </Center>

        </div>
        {/* card */}
        <div onClick={() => clickEvent()} className="z-10 mx-[10%] md:mx-auto h-[60vh] md:w-[24rem] bg-white rounded-xl shadow-md shadow-myRed1 flex flex-row text-center items-center">
          <p className="text-center w-full font-regularBold text-2xl md:text-4xl">
            Life, destiny
          </p>
        </div>

        {/* Textarea */}
        <div className="bg-myRed1 rounded-xl mx-[10%] mb-12 pt-4">
          <textarea placeholder="Your answer" rows={1} className=" outline-none text-center text-white max-w-full pb-4 px-4 border-b border-b-1 border-b-white bg-myRed1 rounded-xl placeholder-lightGray" />
        </div>
      </main>
    </>
  );
}
