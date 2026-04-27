import { createContext, useContext, ReactNode, useState } from "react";
import { StudentInfo, StudyPlan, Progress, LearningSession, defaultSessions, Question, PaymentInfo } from "@/lib/types";
import { useCopilotReadable } from "@copilotkit/react-core";

export type Stage =
  | "contactInfo"
  | "needsAssessment"
  | "courseSelection"
  | "courseCustomization"
  | "paymentDetails"
  | "enrollmentConfirmation";

interface GlobalState {
  stage: Stage;
  setStage: React.Dispatch<React.SetStateAction<Stage>>;
  studentInfo: StudentInfo | null;
  setStudentInfo: React.Dispatch<React.SetStateAction<StudentInfo | null>>;
  studyPlan: StudyPlan | null;
  setStudyPlan: React.Dispatch<React.SetStateAction<StudyPlan | null>>;
  paymentInfo: PaymentInfo | null;
  setPaymentInfo: React.Dispatch<React.SetStateAction<PaymentInfo | null>>;
  progress: Progress | null;
  setProgress: React.Dispatch<React.SetStateAction<Progress | null>>;
  sessions: LearningSession[];
  setSessions: React.Dispatch<React.SetStateAction<LearningSession[]>>;
  currentQuestion: Question | null;
  setCurrentQuestion: React.Dispatch<React.SetStateAction<Question | null>>;
}

export const GlobalStateContext = createContext<GlobalState | null>(null);

/**
  useGlobalState is a hook that will return the global state of the application. It must
  be used within a GlobalStateProvider. It keeps track of the:
  - Current stage of the learning workflow.
  - Student information and preferences.
  - Study plan configuration.
  - Learning progress and achievements.
  - Learning sessions history.
  - Current practice question.
*/
export function useGlobalState() {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
}

/**
  GlobalStateProvider is a provider that will wrap the entire application and provide
  the global state to all components. It uses React Context to provide the state to
  all components.
*/
export function GlobalStateProvider({ children }: { children: ReactNode }) {
  const [stage, setStage] = useState<Stage>("contactInfo");
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(null);
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
  const [progress, setProgress] = useState<Progress | null>(null);
  const [sessions, setSessions] = useState<LearningSession[]>(defaultSessions);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

  // Make the global state readable to CopilotKit
  useCopilotReadable({
    description: "Current stage of the INGLESPOL course selling process",
    value: stage,
  });

  useCopilotReadable({
    description: "Student contact information and exam preferences",
    value: studentInfo,
  });

  useCopilotReadable({
    description: "Selected course package and study plan",
    value: studyPlan,
  });

  useCopilotReadable({
    description: "Payment information and method selected",
    value: paymentInfo,
  });

  useCopilotReadable({
    description: "Student's learning progress and achievements",
    value: progress,
  });

  useCopilotReadable({
    description: "Learning sessions history",
    value: sessions,
  });

  useCopilotReadable({
    description: "Current practice question being answered",
    value: currentQuestion,
  });

  const value = {
    stage,
    setStage,
    studentInfo,
    setStudentInfo,
    studyPlan,
    setStudyPlan,
    paymentInfo,
    setPaymentInfo,
    progress,
    setProgress,
    sessions,
    setSessions,
    currentQuestion,
    setCurrentQuestion,
  };

  return (
    <GlobalStateContext.Provider value={value}>
      {children}
    </GlobalStateContext.Provider>
  );
}