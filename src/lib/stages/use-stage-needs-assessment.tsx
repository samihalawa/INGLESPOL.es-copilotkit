import { useCopilotAction } from "@copilotkit/react-core";
import { useGlobalState } from "./use-global-state";
import { sampleQuestions } from "@/lib/types";

/**
 * Needs Assessment Stage
 * Quick English level assessment to understand student needs
 */
export function useStageNeedsAssessment() {
  const { studentInfo, setStage } = useGlobalState();

  useCopilotAction({
    name: "startAssessmentTest",
    description: "Start a quick English assessment test to evaluate student level",
    parameters: [],
    handler: async () => {
      if (!studentInfo) {
        return "Por favor, primero necesito tu información de contacto.";
      }

      const relevantQuestions = sampleQuestions.filter(q => 
        q.examType.includes(studentInfo.examType)
      );

      setStage("courseSelection");
      
      return `Excelente! Basándome en tu información y el tipo de examen (${studentInfo.examType.replace('_', ' ')}), he evaluado tus necesidades. Con nuestro método de descarte exclusivo, ayudamos a opositores como tú a conseguir una media de 18,12/20 puntos. Ahora te voy a mostrar los cursos perfectos para tu situación.`;
    },
  });

  useCopilotAction({
    name: "completeQuickAssessment",
    description: "Complete a quick assessment based on student responses",
    parameters: [
      {
        name: "estimatedLevel",
        type: "string",
        description: "Estimated English level: A2, B1, B2, or C1",
        required: true,
      },
      {
        name: "correctAnswers",
        type: "number",
        description: "Number of correct answers in assessment",
        required: true,
      },
      {
        name: "totalQuestions",
        type: "number", 
        description: "Total number of questions answered",
        required: true,
      }
    ],
    handler: async ({ estimatedLevel, correctAnswers, totalQuestions }) => {
      if (!studentInfo) {
        return "Por favor, primero necesito tu información de contacto.";
      }

      const percentage = Math.round((correctAnswers / totalQuestions) * 100);
      setStage("courseSelection");

      return `¡Perfecto! Has conseguido ${correctAnswers}/${totalQuestions} preguntas correctas (${percentage}%). Tu nivel estimado es ${estimatedLevel}. Con este nivel y nuestro método de descarte, te voy a recomendar el curso ideal para conseguir más de 18 puntos en tu examen de ${studentInfo.examType.replace('_', ' ')}.`;
    },
  });
}