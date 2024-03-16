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
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultState: QuestionContext = {
  questions: [],
  setQuestions: () => {},
  fetchQuestions: async () => {},
  loading: false,
  setLoading: () => false,
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

  const fetchQuestions = async (text: string) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/questions", { text });
      setQuestions(response.data.questions);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    console.log("question change")
    // if (questions.length >= 1) {
    //   router.push("/Questions");
    // } else {
    //   router.push("/summary");
    // }
  }, [questions]);

  return (
    <QuestionsContext.Provider
      value={{ questions, setQuestions, fetchQuestions, loading, setLoading }}
    >
      {children}
    </QuestionsContext.Provider>
  );
};

export default QuestionsProvider;
