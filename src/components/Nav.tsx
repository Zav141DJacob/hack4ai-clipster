'use client'
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Center } from "@chakra-ui/react";
import { FC, MutableRefObject } from "react";

type Props = {
  myRef?: MutableRefObject<HTMLDivElement | null>
}

const Nav = ({ myRef }: Props) => {
  return (
    // {/* nav */}
    <div ref={myRef} className="w-full text-center py-4 text-white text-2xl font-regularBold  flex justify-around">
      <Center >
        <ArrowBackIcon />
      </Center>
      Chapter 5
      <Center >
        <ArrowForwardIcon />
      </Center>
    </div>
  )
}

export default Nav;