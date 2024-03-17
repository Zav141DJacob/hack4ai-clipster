'use client'
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Center } from "@chakra-ui/react";
import { FC, MutableRefObject } from "react";

type Props = {
  myRef?: MutableRefObject<HTMLDivElement | null>
  swap?: boolean
}

const Nav = ({ myRef, swap }: Props) => {
  return (
    // {/* nav */}
    <div ref={myRef} className={`w-full text-center py-4 ${swap ? "text-myRed2" : "text-white"} text-2xl font-regularBold  flex justify-around`}>
      <Center >
        <ArrowBackIcon />
      </Center>
      Clipster 📎
      <Center >
        <ArrowForwardIcon />
      </Center>
    </div>
  )
}

export default Nav;
