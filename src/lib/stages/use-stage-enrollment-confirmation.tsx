import { useCopilotAction } from "@copilotkit/react-core";
import { useGlobalState } from "./use-global-state";

/**
 * Enrollment Confirmation Stage
 * Final confirmation and enrollment completion
 */
export function useStageEnrollmentConfirmation() {
  const { studentInfo, studyPlan, paymentInfo, setStage } = useGlobalState();

  useCopilotAction({
    name: "confirmEnrollment",
    description: "Confirm student enrollment in INGLESPOL course",
    parameters: [
      {
        name: "confirmed",
        type: "boolean",
        description: "Whether the student confirms enrollment",
        required: true,
      }
    ],
    handler: async ({ confirmed }) => {
      if (!studentInfo || !studyPlan || !paymentInfo) {
        return "Falta información para completar la matrícula. Volvamos atrás para completar todos los datos.";
      }

      if (!confirmed) {
        setStage("courseSelection");
        return "No hay problema. ¿Te gustaría revisar otras opciones de curso o necesitas más información sobre algún aspecto específico?";
      }

      // Enrollment confirmed
      const enrollmentId = `INGLESPOL-${Date.now()}`;
      
      return `🎉 ¡MATRÍCULA CONFIRMADA! 🎉

**Número de matrícula:** ${enrollmentId}
**Estudiante:** ${studentInfo.name}
**Curso:** ${studyPlan.coursePackage.type.toUpperCase()}
**Examen objetivo:** ${studentInfo.examType.replace('_', ' ')}
**Duración:** ${studyPlan.coursePackage.duration} semanas
**Pago:** ${paymentInfo.monthlyAmount}€ cada ${paymentInfo.installments === 1 ? 'mes' : paymentInfo.installments + ' meses'}

**¡Bienvenido a INGLESPOL!** 🎓

**Próximos pasos:**
1. Recibirás un email con los datos de acceso a la plataforma
2. Te contactaremos por WhatsApp para programar tu primera clase
3. Empezarás con el método de descarte desde el primer día

**Nuestro compromiso contigo:**
Con nuestro método probado y una media de 18,12/20 puntos de nuestros alumnos, te garantizamos que conseguirás tu objetivo. ¡Juntos vamos a por esos 18+ puntos en tu examen!

¿Tienes alguna pregunta sobre el curso o el método de descarte?`;
    },
  });

  useCopilotAction({
    name: "showEnrollmentSummary",
    description: "Show complete enrollment summary for review",
    parameters: [],
    handler: async () => {
      if (!studentInfo || !studyPlan || !paymentInfo) {
        return "Falta información para mostrar el resumen. Volvamos atrás para completar todos los datos.";
      }

      const installmentText = paymentInfo.installments === 1 ? 'mensual' : 
                             paymentInfo.installments === 3 ? 'trimestral' : 'semestral';

      return `**RESUMEN DE MATRÍCULA - INGLESPOL**

**👤 Datos del estudiante:**
- Nombre: ${studentInfo.name}
- Email: ${studentInfo.email}
- Teléfono: ${studentInfo.phone}
- Examen: ${studentInfo.examType.replace('_', ' ')}
${studentInfo.currentLevel ? `- Nivel actual: ${studentInfo.currentLevel}` : ''}
${studentInfo.examDate ? `- Fecha del examen: ${studentInfo.examDate.toLocaleDateString('es-ES')}` : ''}

**📚 Curso seleccionado:**
- Paquete: ${studyPlan.coursePackage.type.toUpperCase()}
- Duración: ${studyPlan.coursePackage.duration} semanas
- Clases: ${studyPlan.coursePackage.classesPerWeek} por semana (${studyPlan.coursePackage.hoursPerClass}h cada una)
- Preguntas diarias: ${studyPlan.practiceQuestionsPerDay}
${studyPlan.classSchedule ? `- Horario: ${studyPlan.classSchedule}` : ''}
${studyPlan.coursePackage.whatsappSupport ? '- ✅ Soporte WhatsApp incluido' : ''}

**💰 Información de pago:**
- Método: ${paymentInfo.method}
- Plan: Pago ${installmentText}
- Total: ${paymentInfo.totalAmount}€
- Cada pago: ${paymentInfo.monthlyAmount}€

¿Confirmas tu matrícula en INGLESPOL?`;
    },
  });

  useCopilotAction({
    name: "restartProcess",
    description: "Restart the enrollment process from the beginning",
    parameters: [],
    handler: async () => {
      setStage("contactInfo");
      return "¡Por supuesto! Vamos a empezar de nuevo. ¿Cuál es tu nombre y en qué tipo de oposición estás interesado?";
    },
  });
}