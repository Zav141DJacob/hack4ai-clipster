import { useContext } from "react";
import Link from "next/link";
import { QuestionsContext } from "@/context/QuestionContext";

export default function Home() {
  const { setLoggedIn } = useContext(QuestionsContext);

  return (
    <>
      <main className="flex flex-col h-[100vh] transition-colors gap-4 justify-around">
        {/* background */}
        <>
          <div className="bg-default opacity-15 w-full h-full absolute -z-10 bg-cover sm:bg-auto "></div>
          <div className="bg-myRed1 w-full h-full absolute -z-20"></div>
        </>

        <div className="text-white mx-[9%] h-1/5 font-regularBold text-center flex flex-col justify-end gap-5">
          <p className="text-3xl lg:text-5xl ">Welcome back to Clipster!</p>
          <p className="text-sm">Your personal AI study assistant</p>
        </div>

        {/* buttons */}
        <div className="mx-[10%] gap-3 flex flex-col text-myRed1 font-regularBold text-center items-center">
          {/* button */}
          <Link
            href="/askAI"
            className="shadow-md shadow-myRed1 max-w-80 rounded-3xl py-2.5 w-full flex justify-center bg-lightGray"
          >
            Login
          </Link>

          <Link
            href="/askAI"
            className="shadow-md shadow-myRed1 max-w-80 rounded-3xl py-2.5 w-full flex justify-center bg-lightGray"
          >
            Signup
          </Link>
          <button
            onClick={() => setLoggedIn(true)}
            className="text-white pt-2.5"
          >
            or continue as <span className="underline">guest</span>
          </button>
        </div>
      </main>
    </>
  );
}
