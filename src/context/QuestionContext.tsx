import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Question } from "@/types/Question";
import axios from "axios";

export interface QuestionContext {
  questions: Question[];
  setQuestions: Dispatch<SetStateAction<Question[]>>;
  fetchQuestions: (text: string) => Promise<void>;
}

const defaultState: QuestionContext = {
  questions: [],
  setQuestions: () => {},
  fetchQuestions: async () => {},
};

export const QuestionsContext = createContext<QuestionContext>(defaultState);

type QuestionProvidedProps = {
  children: React.ReactNode;
};

export const useQuestions = () => {
  return useContext(QuestionsContext);
};

const QuestionsProvider = ({ children }: QuestionProvidedProps) => {
  const [questions, setQuestions] = useState<Question[]>([]);

  const fetchQuestions = async (text: string) => {
    try {
      const response = await axios.post("/api/questions", { text });
      setQuestions(response.data.questions);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  return (
    <QuestionsContext.Provider
      value={{ questions, setQuestions, fetchQuestions }}
    >
      {children}
    </QuestionsContext.Provider>
  );
};

export default QuestionsProvider;
