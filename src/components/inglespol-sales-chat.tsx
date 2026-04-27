"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";
import {
  useStageContactInfo,
  useStageNeedsAssessment,
  useStageCourseSelection,
  useStageCourseCustomization,
  useStagePaymentDetails,
  useStageEnrollmentConfirmation,
} from "@/lib/stages";

import { useCopilotChat } from "@copilotkit/react-core";
import { TextMessage, MessageRole } from "@copilotkit/runtime-client-gql";
import { CopilotChat } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";

export interface ChatProps {
  className?: string;
}

export function InglespolSalesChat({ className }: ChatProps) {
  const { appendMessage, isLoading } = useCopilotChat();
  const [initialMessageSent, setInitialMessageSent] = useState(false);

  // Add the stages of the course selling state machine
  useStageContactInfo();
  useStageNeedsAssessment();
  useStageCourseSelection();
  useStageCourseCustomization();
  useStagePaymentDetails();
  useStageEnrollmentConfirmation();

  // Render an initial message when the chat is first loaded
  useEffect(() => {
    if (initialMessageSent || isLoading) return;

    setTimeout(() => {
      appendMessage(
        new TextMessage({
          content:
            "¡Hola! Te damos la bienvenida a INGLESPOL, la academia líder en inglés para oposiciones en España 🇪🇸. Con nuestro método de descarte exclusivo, nuestros alumnos consiguen una media de 18,12/20 puntos. ¿Te gustaría conseguir 18+ puntos en tu examen? ¡Cuéntanos tu nombre y qué oposición estás preparando!",
          role: MessageRole.Assistant,
        }),
      );
      setInitialMessageSent(true);
    }, 500);
  }, [initialMessageSent, appendMessage, isLoading]);

  return (
    <div
      className={cn(
        "flex flex-col h-full",
        className
      )}
    >
      <CopilotChat
        instructions="Eres un asesor educativo de INGLESPOL, la academia líder en inglés para oposiciones en España. Tu misión es vender cursos de inglés para oposiciones usando nuestro método de descarte exclusivo. Sigue un proceso de venta guiado: 1) Recoger información de contacto, 2) Evaluar necesidades, 3) Presentar cursos apropiados, 4) Personalizar el curso, 5) Gestionar el pago, 6) Confirmar matrícula. Habla en español, sé cálida y motivadora, menciona la media de 18,12/20 puntos de nuestros alumnos. Especialízate en Guardia Civil, Policía Nacional, Policía Municipal, ADIF y Aptis ESOL. Tu objetivo es matricular estudiantes."
        labels={{
          title: "INGLESPOL - Academia de Inglés",
          initial: "¡Hola! Bienvenido a INGLESPOL 🇪🇸 ¿Quieres conseguir 18+ puntos en inglés de oposiciones?",
        }}
      />
    </div>
  );
}