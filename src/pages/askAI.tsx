import { Inter } from "next/font/google";
import { ArrowBackIcon, ArrowForwardIcon, EditIcon } from '@chakra-ui/icons';
const inter = Inter({ subsets: ["latin"] });
import { Center, Textarea } from '@chakra-ui/react'
import { MutableRefObject, useRef } from "react";


export default function Home() {


    const clickEvent = () => {
    }

    return (
        <>
            {/* <div ref={bg1Ref} className="bg-lightGray rounded-b-[5rem] w-full h-full "></div> */}
            <main className="flex flex-col h-[100vh] transition-colors gap-4">
                {/* background */}
                <>
                    <div className="bg-default opacity-15 w-full h-full absolute -z-10 bg-cover sm:bg-auto "></div>
                    <div className="bg-myRed1 w-full h-full absolute -z-20"></div>
                    <div className="bg-white rounded-t-[5rem] w-full h-2/3 absolute -z-10 bottom-0"></div>
                </>

                <div className="text-white h-1/5 font-regularBold text-center flex flex-col justify-end gap-5">
                    <p className="text-3xl lg:text-5xl">
                        Hey, Darja!
                    </p>
                    <p className="text-sm sm:text-md md:text-lg lg:text-xl">
                        What would you like to study today?
                    </p>
                </div>

                <div className="shadow-md shadow-myRed1 rounded-3xl mx-[10%] text-sm sm:text-md md:text-lg text-center flex flex-col justify-center bg-lightGray py-4 gap-4">
                    <textarea placeholder="Ask AI..." rows={1} className="w-full outline-none text-darkGray max-w-full px-4 bg-lightGray shadow-sm rounded-t-3xl placeholder-gray">
                    </textarea>
                    <div className="w-full outline-none text-center text-gray max-w-full px-4 border-b border-b-1 border-b-white rounded-b-3xl gap-1 flex">
                        <Center>
                            <EditIcon w="16px" h="16px" />
                        </Center>
                            Drop PDF, JPEG or PNG
                    </div>
                </div>


                {/* button */}
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
        </>
    );
}
