import { PaymentForm } from "@/components/generative-ui/payment-form";
import { useGlobalState } from "@/lib/stages";
import { useCopilotAction, useCopilotAdditionalInstructions } from "@copilotkit/react-core";

/**
  useStageGetPaymentInfo is a hook that will add this stage to the state machine. It is responsible for:
  - Getting payment information from the user.
  - Storing the payment information in the global state.
  - Moving to the next stage, confirmOrder.
*/
export function useStageGetPaymentInfo() {
  const { setCardInfo, stage, setStage } = useGlobalState();

  // Conditionally add additional instructions for the agent's prompt.
  useCopilotAdditionalInstructions(
    {
      instructions: "CURRENT STATE: You are collecting payment information from the user.",
      available: stage === "getPaymentInfo" ? "enabled" : "disabled",
    },
    [stage],
  );

  // Render the PaymentForm component and wait for the user's response.
  useCopilotAction(
    {
      name: "getPaymentInfo",
      description: "Get payment information from the user",
      available: stage === "getPaymentInfo" ? "enabled" : "disabled",
      renderAndWaitForResponse: ({ status, respond }) => {
        return (
          <PaymentForm
            status={status}
            onSubmit={(payment) => {
              // Commit the payment information to the global state.
              setCardInfo(payment);

              // Let the agent know that the user has submitted payment information.
              respond?.("User has submitted their payment information.");

              // Move to the final stage, confirmOrder.
              setStage("confirmOrder");
            }}
          />
        );
      },
    },
    [stage]
  );
}