import "@/styles/globals.css";
import type { AppProps } from "next/app";
import QuestionsProvider from "@/context/QuestionContext";

export default function App({ Component, pageProps }: AppProps) {
  return <QuestionsProvider><Component {...pageProps} /></QuestionsProvider>;
}
