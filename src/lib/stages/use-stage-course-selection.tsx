import { useCopilotAction } from "@copilotkit/react-core";
import { useGlobalState } from "./use-global-state";
import { coursePackages, CoursePackage, StudyPlan } from "@/lib/types";

/**
 * Course Selection Stage
 * Present course packages and help student choose the best option
 */
export function useStageCourseSelection() {
  const { studentInfo, setStudyPlan, setStage } = useGlobalState();

  useCopilotAction({
    name: "selectCoursePackage",
    description: "Select a course package for the student",
    parameters: [
      {
        name: "packageType",
        type: "string",
        description: "Course package type: regular, intensive, or premium",
        required: true,
      },
      {
        name: "reasonForChoice",
        type: "string",
        description: "Explanation of why this package fits the student",
        required: false,
      }
    ],
    handler: async ({ packageType, reasonForChoice }) => {
      if (!studentInfo) {
        return "Por favor, primero necesito tu información de contacto.";
      }

      const selectedPackage = coursePackages.find(p => p.type === packageType);
      if (!selectedPackage) {
        return "No he encontrado ese paquete de curso. Las opciones son: regular, intensive, o premium.";
      }

      const studyPlan: StudyPlan = {
        coursePackage: selectedPackage,
        topicsPerWeek: packageType === "regular" ? 2 : packageType === "intensive" ? 4 : 5,
        practiceQuestionsPerDay: selectedPackage.questionsPerDay,
        personalizedSupport: packageType === "premium",
      };

      setStudyPlan(studyPlan);
      setStage("courseCustomization");

      return `¡Excelente elección! Has seleccionado el curso ${packageType.toUpperCase()} por ${selectedPackage.price}€/mes. ${reasonForChoice || 'Este curso se adapta perfectamente a tus necesidades.'} Ahora vamos a personalizarlo completamente para ti. Con nuestro método de descarte y este curso, estarás listo para conseguir 18+ puntos.`;
    },
  });

  useCopilotAction({
    name: "showCourseComparison",
    description: "Show detailed comparison of available course packages",
    parameters: [],
    handler: async () => {
      if (!studentInfo) {
        return "Por favor, primero necesito tu información de contacto.";
      }

      const comparison = coursePackages.map(pkg => {
        return `\n**${pkg.type.toUpperCase()}** - ${pkg.price}€/mes:
- ${pkg.duration} semanas de duración
- ${pkg.classesPerWeek} clase${pkg.classesPerWeek > 1 ? 's' : ''} semanal${pkg.classesPerWeek > 1 ? 'es' : ''} (${pkg.hoursPerClass}h cada una)
- ${pkg.questionsPerDay} preguntas diarias
- ${pkg.features.join('\n- ')}
${pkg.whatsappSupport ? '- ✅ Soporte WhatsApp directo' : ''}`;
      }).join('\n\n');

      return `Aquí tienes todos los cursos disponibles para ${studentInfo.examType.replace('_', ' ')}:\n${comparison}\n\n¿Cuál te interesa más? Todos incluyen nuestro método de descarte exclusivo que ha ayudado a conseguir una media de 18,12/20 puntos.`;
    },
  });
}