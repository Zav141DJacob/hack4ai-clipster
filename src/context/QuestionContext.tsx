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
import { v4 as uuidv4 } from "uuid";

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
  const [questions, setQuestions] = useState<Question[]>([
    {
      q: "War has been a prevalent aspect of human history, shaping civilizations and societies over time.",
      a: true,
      uuid: "7bf04891-6a3f-4569-b560-f1d987522e8f",
      correct: false,
    },
    {
      q: "The essence of war has evolved significantly from ancient battles to modern warfare, but the fundamental nature of violence remains constant.",
      a: true,
      uuid: "af65753b-c4d9-4f76-b750-238cd68d6f11",
      correct: false,
    },
    {
      q: "Wars have been waged for limited reasons, such as territorial expansion, but not for diverse motives like resources, religious beliefs, and ideological supremacy.",
      a: false,
      uuid: "0bd1f472-df3d-4c67-a273-1bacaed6678c",
      correct: false,
    },
    {
      q: "The legacy of war is only evident in the victories of conquerors and not in the suffering of the conquered.",
      a: false,
      uuid: "535d622f-52f1-46c2-b088-2d6419ef6d0f",
      correct: false,
    },
    {
      q: "Soldiers often display acts of heroism and courage in war, contrasting with the absence of any unspeakable atrocities.",
      a: false,
      uuid: "80a46ea5-b3ac-4ba6-9186-740922badf3f",
      correct: false,
    },
    {
      q: "The aftermath of war is typically characterized by reconstruction efforts to restore cities, landscapes, and communities that have been devastated.",
      a: true,
      uuid: "1a16da62-e79a-4e5a-aace-38669485625a",
      correct: false,
    },
    {
      q: "Wars have had no significant impact on spurring technological advancements or medical breakthroughs.",
      a: false,
      uuid: "8745e4de-e1b3-412e-853d-892437da1863",
      correct: false,
    },
    {
      q: "War has primarily led to maintaining political stability and existing borders, with minimal social change.",
      a: false,
      uuid: "172d2029-86d8-47a6-a4cd-e20e12c8ea90",
      correct: false,
    },
    {
      q: "War's influence is limited to armed conflict and does not extend to influencing politics, economics, and culture within society.",
      a: false,
      uuid: "c7f2e21e-ffbd-44b5-b848-edb693742704",
      correct: false,
    },
  ]);
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
