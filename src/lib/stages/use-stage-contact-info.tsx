import { useCopilotAction } from "@copilotkit/react-core";
import { useGlobalState } from "./use-global-state";
import { StudentInfo, ExamType } from "@/lib/types";

/**
 * Contact Info Collection Stage
 * Collects student contact information and exam type to begin the sales process
 */
export function useStageContactInfo() {
  const { setStudentInfo, setStage } = useGlobalState();

  useCopilotAction({
    name: "collectContactInfo",
    description: "Collect student contact information to start INGLESPOL course consultation",
    parameters: [
      {
        name: "name",
        type: "string",
        description: "Student's full name",
        required: true,
      },
      {
        name: "email",
        type: "string",
        description: "Student's email address",
        required: true,
      },
      {
        name: "phone",
        type: "string", 
        description: "Student's phone number",
        required: true,
      },
      {
        name: "examType",
        type: "string",
        description: "Type of civil service exam: guardia_civil, policia_nacional, policia_municipal, adif, or aptis_esol",
        required: true,
      },
      {
        name: "currentLevel",
        type: "string",
        description: "Current English level: A2, B1, B2, or C1 (optional)",
        required: false,
      },
      {
        name: "examDate",
        type: "string",
        description: "Planned exam date in ISO format (optional)",
        required: false,
      }
    ],
    handler: async ({ name, email, phone, examType, currentLevel, examDate }) => {
      const studentInfo: StudentInfo = {
        name,
        email,
        phone,
        examType: examType as ExamType,
        currentLevel: currentLevel as "A2" | "B1" | "B2" | "C1" | undefined,
        examDate: examDate ? new Date(examDate) : undefined,
      };

      setStudentInfo(studentInfo);
      setStage("needsAssessment");

      return `¡Perfecto, ${name}! He registrado tu información. Ahora vamos a evaluar tu nivel actual de inglés para recomendarte el mejor curso para ${examType.replace('_', ' ')}. Esto me ayudará a personalizar completamente tu experiencia con INGLESPOL.`;
    },
  });
}