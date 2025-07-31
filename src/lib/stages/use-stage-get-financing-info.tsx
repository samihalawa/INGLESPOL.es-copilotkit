import { FinancingForm } from "@/components/generative-ui/financing-form";
import { useGlobalState } from "@/lib/stages";
import { useCopilotAction, useCopilotAdditionalInstructions } from "@copilotkit/react-core";

/**
  useStageGetFinancingInfo is a hook that will add this stage to the state machine. It is responsible for:
  - Getting financing details from the user.
  - Storing the financing information in the global state.
  - Moving to the next stage, getPaymentInfo.
*/
export function useStageGetFinancingInfo() {
  const { setFinancingInfo, stage, setStage } = useGlobalState();

  // Conditionally add additional instructions for the agent's prompt.
  useCopilotAdditionalInstructions(
    {
      instructions: "CURRENT STATE: You are collecting financing information from the user.",
      available: stage === "getFinancingInfo" ? "enabled" : "disabled",
    },
    [stage],
  );

  // Render the FinancingForm component and wait for the user's response.
  useCopilotAction(
    {
      name: "getFinancingInfo",
      description: "Get financing information from the user",
      available: stage === "getFinancingInfo" ? "enabled" : "disabled",
      renderAndWaitForResponse: ({ status, respond }) => {
        return (
          <FinancingForm
            status={status}
            onSubmit={(financing) => {
              // Commit the financing information to the global state.
              setFinancingInfo(financing);

              // Let the agent know that the user has submitted financing information.
              respond?.("User has submitted their financing information.");

              // Move to the next stage, getPaymentInfo.
              setStage("getPaymentInfo");
            }}
          />
        );
      },
    },
    [stage]
  );
}