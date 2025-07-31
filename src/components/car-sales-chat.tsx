"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";
import {
  useStageBuildCar,
  useStageGetContactInfo,
  useStageGetPaymentInfo,
  useStageConfirmOrder,
  useStageSellFinancing,
  useStageGetFinancingInfo,
} from "@/lib/stages";

import { useCopilotChat } from "@copilotkit/react-core";
import { TextMessage, MessageRole } from "@copilotkit/runtime-client-gql";
import { CopilotChat } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";

export interface ChatProps {
  className?: string;
}

export function CarSalesChat({ className }: ChatProps) {
  const { appendMessage, isLoading } = useCopilotChat();
  const [initialMessageSent, setInitialMessageSent] = useState(false);

  // Add the stages of the state machine
  useStageGetContactInfo();
  useStageBuildCar();
  useStageSellFinancing();
  useStageGetPaymentInfo();
  useStageGetFinancingInfo();
  useStageConfirmOrder();

  // Render an initial message when the chat is first loaded
  useEffect(() => {
    if (initialMessageSent || isLoading) return;

    setTimeout(() => {
      appendMessage(
        new TextMessage({
          content:
            "Hi, I'm your AI car salesman for INGLESPOL. First, let's get your contact information before we get started.",
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
        instructions="You are a helpful AI car salesman for INGLESPOL. Guide users through the car buying process step by step."
        labels={{
          title: "INGLESPOL Car Sales Assistant",
          initial: "Welcome to INGLESPOL! How can I help you find your perfect car today?",
        }}
      />
    </div>
  );
}