'use client'
import { Inter } from "next/font/google";
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
const inter = Inter({ subsets: ["latin"] });
import { Center, Textarea } from '@chakra-ui/react'
import { MutableRefObject, useRef } from "react";
import Card from "@/components/Card";


export default function Home() {

  let bg1Ref: MutableRefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);
  let bg2Ref: MutableRefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);
  let navRef: MutableRefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);

  

  return (
    <>
      {/* <div ref={bg1Ref} className="bg-lightGray rounded-b-[5rem] w-full h-full "></div> */}
      <main ref={bg1Ref} className="flex flex-col h-[100vh] justify-between bg-lightGray transition-colors overflow-x-hidden">
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
        <Card bg1Ref={bg1Ref} bg2Ref={bg2Ref} navRef={navRef} />
        {/* Textarea */}
        <div className="bg-myRed1 rounded-xl mx-[10%] mb-12 pt-4">
          <textarea placeholder="Your answer" rows={1} className=" outline-none text-center text-white max-w-full pb-4 px-4 border-b border-b-1 border-b-white bg-myRed1 rounded-xl placeholder-lightGray" />
        </div>
      </main>
    </>
  );
}
