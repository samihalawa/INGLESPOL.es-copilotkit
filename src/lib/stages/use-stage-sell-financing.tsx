import { FinancingOptions } from "@/components/generative-ui/financing-options";
import { useGlobalState } from "@/lib/stages";
import { useCopilotAction, useCopilotAdditionalInstructions } from "@copilotkit/react-core";

/**
  useStageSellFinancing is a hook that will add this stage to the state machine. It is responsible for:
  - Presenting financing options to the user.
  - Moving to getFinancingInfo if user chooses financing, or getPaymentInfo if paying cash.
*/
export function useStageSellFinancing() {
  const { stage, setStage } = useGlobalState();

  // Conditionally add additional instructions for the agent's prompt.
  useCopilotAdditionalInstructions(
    {
      instructions: "CURRENT STATE: You are presenting financing options to the user.",
      available: stage === "sellFinancing" ? "enabled" : "disabled",
    },
    [stage],
  );

  // Render the FinancingOptions component and wait for the user's response.
  useCopilotAction(
    {
      name: "sellFinancing",
      description: "Present financing options to the user",
      available: stage === "sellFinancing" ? "enabled" : "disabled",
      renderAndWaitForResponse: ({ status, respond }) => {
        return (
          <FinancingOptions
            status={status}
            onFinancing={() => {
              respond?.("User chose financing option.");
              setStage("getFinancingInfo");
            }}
            onCash={() => {
              respond?.("User chose to pay cash.");
              setStage("getPaymentInfo");
            }}
          />
        );
      },
    },
    [stage]
  );
}