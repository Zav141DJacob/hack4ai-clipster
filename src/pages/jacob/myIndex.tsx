'use client'
import { Inter } from "next/font/google";
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
const inter = Inter({ subsets: ["latin"] });
import { Center, Textarea } from '@chakra-ui/react'
import { MutableRefObject, useRef } from "react";
import Nav from "@/components/Nav";
import Card from "@/components/Card";


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
      <main className="flex flex-col h-[100vh] justify-between">
        {/* background */}
        <>
          <div ref={bg1Ref} className="bg-lightGray w-full h-full absolute -z-50 transition-colors"></div>
          <div ref={bg2Ref} className="bg-myRed1 rounded-b-[5rem] w-full h-1/3 absolute -z-50 transition-colors"></div>
        </>
        <Nav myRef={navRef}/>

        <Card onClick={clickEvent}/>


        {/* Textarea */}
        <div className="bg-myRed1 rounded-xl mx-[12%] sm:mx-auto mb-12 pt-4 max-w-[28rem]">
          <textarea placeholder="Your answer" rows={1} className="w-full outline-none text-center text-white max-w-full pb-4 px-4 border-b border-b-1 border-b-white bg-myRed1 rounded-xl placeholder-lightGray" />
        </div>
      </main>
    </>
  );
}
