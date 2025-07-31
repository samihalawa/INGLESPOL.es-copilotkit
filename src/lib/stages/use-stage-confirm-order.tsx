import { OrderConfirmation } from "@/components/generative-ui/order-confirmation";
import { useGlobalState } from "@/lib/stages";
import { useCopilotAction, useCopilotAdditionalInstructions } from "@copilotkit/react-core";

/**
  useStageConfirmOrder is a hook that will add this stage to the state machine. It is responsible for:
  - Showing order confirmation to the user.
  - Creating a new order in the global state.
  - Resetting the state machine to start a new order.
*/
export function useStageConfirmOrder() {
  const { selectedCar, contactInfo, cardInfo, financingInfo, setOrders, stage, setStage, setSelectedCar, setContactInfo, setCardInfo, setFinancingInfo } = useGlobalState();

  // Conditionally add additional instructions for the agent's prompt.
  useCopilotAdditionalInstructions(
    {
      instructions: "CURRENT STATE: You are confirming the order with the user.",
      available: stage === "confirmOrder" ? "enabled" : "disabled",
    },
    [stage],
  );

  // Render the OrderConfirmation component and wait for the user's response.
  useCopilotAction(
    {
      name: "confirmOrder",
      description: "Confirm the order with the user",
      available: stage === "confirmOrder" ? "enabled" : "disabled",
      renderAndWaitForResponse: ({ status, respond }) => {
        return (
          <OrderConfirmation
            status={status}
            car={selectedCar}
            contactInfo={contactInfo}
            cardInfo={cardInfo}
            financingInfo={financingInfo}
            onConfirm={() => {
              if (selectedCar && contactInfo) {
                // Create a new order
                const newOrder = {
                  id: `order-${Date.now()}`,
                  car: selectedCar,
                  contactInfo: contactInfo,
                  cardInfo: cardInfo || undefined,
                  financingInfo: financingInfo || undefined,
                  totalPrice: selectedCar.price,
                  status: "confirmed" as const,
                  createdAt: new Date(),
                };

                // Add the order to the global state
                setOrders(prev => [...prev, newOrder]);

                // Reset the state for a new order
                setSelectedCar(null);
                setContactInfo(null);
                setCardInfo(null);
                setFinancingInfo(null);

                respond?.("Order has been confirmed and placed successfully!");

                // Start over with a new order
                setStage("getContactInfo");
              }
            }}
          />
        );
      },
    },
    [stage, selectedCar, contactInfo, cardInfo, financingInfo]
  );
}