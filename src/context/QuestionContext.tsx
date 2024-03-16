import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Question } from "@/types/Question";
import axios from "axios";
import { useRouter } from "next/router";

export interface QuestionContext {
  questions: Question[];
  setQuestions: Dispatch<SetStateAction<Question[]>>;
  fetchQuestions: (text: string) => Promise<void>;
  fetchQuestionsFile: (file: File) => Promise<void>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultState: QuestionContext = {
  questions: [],
  setQuestions: () => {},
  fetchQuestions: async () => {},
  fetchQuestionsFile: async () => {},
  loading: false,
  setLoading: () => false,
  loggedIn: false,
  setLoggedIn: () => false,
};

export const QuestionsContext = createContext<QuestionContext>(defaultState);

type QuestionProvidedProps = {
  children: React.ReactNode;
};

export const useQuestions = () => {
  return useContext(QuestionsContext);
};

const QuestionsProvider = ({ children }: QuestionProvidedProps) => {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const loggedInState = localStorage.getItem("loggedIn");
      return loggedInState ? JSON.parse(loggedInState) : false;
    }
    return false;
  });

  const fetchQuestions = async (text: string) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/text", { text });

      const questionsWithUUID = response.data.questions.map(
        (question: Question) => ({
          ...question,
          correct: false,
        })
      );

      setQuestions(questionsWithUUID);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setLoading(false);
    }
  };

  const fetchQuestionsFile = async (file: File) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post("/api/file", formData);
      if (response.data.questions) {
        setQuestions(response.data.questions);
      } else {
        console.error("Error fetching questions:", response.data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
  }, [loggedIn]);

  useEffect(() => {
    if (!loggedIn) {
      router.push("/intro");
    }

    if (questions.length >= 1) {
      router.push("/Questions");
    } else if (router.pathname === "summary") {
      router.push("/summary");
    } else {
      router.push("/");
    }
  }, [questions, loggedIn]);

  return (
    <QuestionsContext.Provider
      value={{
        questions,
        setQuestions,
        fetchQuestions,
        fetchQuestionsFile,
        loading,
        setLoading,
        loggedIn,
        setLoggedIn,
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
};

export default QuestionsProvider;
