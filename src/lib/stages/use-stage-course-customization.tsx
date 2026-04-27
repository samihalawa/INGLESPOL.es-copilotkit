import { useCopilotAction } from "@copilotkit/react-core";
import { useGlobalState } from "./use-global-state";

/**
 * Course Customization Stage
 * Customize schedule, preferences, and specific needs
 */
export function useStageCourseCustomization() {
  const { studentInfo, studyPlan, setStudyPlan, setStage } = useGlobalState();

  useCopilotAction({
    name: "customizeCourse",
    description: "Customize course schedule and preferences",
    parameters: [
      {
        name: "preferredDays",
        type: "string",
        description: "Preferred days for live classes (e.g., 'Martes, Jueves')",
        required: false,
      },
      {
        name: "preferredTime",
        type: "string",
        description: "Preferred time for classes (e.g., '19:00')",
        required: false,
      },
      {
        name: "questionsPerDay",
        type: "number",
        description: "Preferred number of daily practice questions",
        required: false,
      },
      {
        name: "specificNeeds",
        type: "string",
        description: "Any specific learning needs or preferences",
        required: false,
      }
    ],
    handler: async ({ preferredDays, preferredTime, questionsPerDay, specificNeeds }) => {
      if (!studentInfo || !studyPlan) {
        return "Primero necesito que selecciones un curso.";
      }

      const schedule = preferredDays && preferredTime 
        ? `${preferredDays} a las ${preferredTime}`
        : undefined;

      const updatedStudyPlan = {
        ...studyPlan,
        classSchedule: schedule,
        practiceQuestionsPerDay: questionsPerDay || studyPlan.practiceQuestionsPerDay,
      };

      setStudyPlan(updatedStudyPlan);
      setStage("paymentDetails");

      let customizations = [];
      if (schedule) customizations.push(`Clases: ${schedule}`);
      if (questionsPerDay) customizations.push(`${questionsPerDay} preguntas diarias`);
      if (specificNeeds) customizations.push(`Necesidades específicas: ${specificNeeds}`);

      const customizationText = customizations.length > 0 
        ? `\n\nPersonalizaciones aplicadas:\n- ${customizations.join('\n- ')}`
        : '';

      return `¡Perfecto! Tu curso ${studyPlan.coursePackage.type} está personalizado.${customizationText}\n\nAhora vamos con los detalles de pago. El precio es ${studyPlan.coursePackage.price}€/mes y puedes pagar mensualmente o conseguir descuentos con pago trimestral/semestral.`;
    },
  });

  useCopilotAction({
    name: "finalizeCourseSetup",
    description: "Finalize course setup with current settings",
    parameters: [],
    handler: async () => {
      if (!studentInfo || !studyPlan) {
        return "Primero necesito que selecciones un curso.";
      }

      setStage("paymentDetails");

      return `¡Excelente! Tu curso ${studyPlan.coursePackage.type} está configurado:\n\n- ${studyPlan.coursePackage.duration} semanas de duración\n- ${studyPlan.practiceQuestionsPerDay} preguntas diarias\n- ${studyPlan.coursePackage.classesPerWeek} clases semanales\n${studyPlan.classSchedule ? `- Horario: ${studyPlan.classSchedule}` : ''}\n\nPrecio: ${studyPlan.coursePackage.price}€/mes\n\n¿Cómo te gustaría proceder con el pago?`;
    },
  });
}