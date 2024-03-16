import { Inter } from "next/font/google";
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
const inter = Inter({ subsets: ["latin"] });
import { Center, Textarea } from '@chakra-ui/react'
import { MutableRefObject, useRef } from "react";


export default function Home() {


    const clickEvent = () => {
    }

    return (
        <>
            {/* <div ref={bg1Ref} className="bg-lightGray rounded-b-[5rem] w-full h-full "></div> */}
            <main className="flex flex-col h-[100vh] justify-between transition-colors">
                {/* background */}
                <>
                    <div className="bg-myRed1 w-full h-full absolute -z-10"></div>
                    <div className="bg-lightGray rounded-t-[5rem] w-full h-2/3 absolute -z-10 bottom-0"></div>
                </>

                

                {/* Textarea */}
                <div className="bg-myRed1 rounded-xl mx-[12%] sm:mx-auto mb-12 pt-4 max-w-[28rem]">
                    <textarea placeholder="Your answer" rows={1} className="w-full outline-none text-center text-white max-w-full pb-4 px-4 border-b border-b-1 border-b-white bg-myRed1 rounded-xl placeholder-lightGray" />
                </div>
            </main>
        </>
    );
}
