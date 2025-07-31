import { CarBuilder } from "@/components/generative-ui/car-builder";
import { useGlobalState } from "@/lib/stages";
import { useCopilotAction, useCopilotAdditionalInstructions } from "@copilotkit/react-core";

/**
  useStageBuildCar is a hook that will add this stage to the state machine. It is responsible for:
  - Helping the user select and customize a car.
  - Storing the selected car in the global state.
  - Moving to the next stage, sellFinancing.
*/
export function useStageBuildCar() {
  const { setSelectedCar, stage, setStage } = useGlobalState();

  // Conditionally add additional instructions for the agent's prompt.
  useCopilotAdditionalInstructions(
    {
      instructions: "CURRENT STATE: You are helping the user select and build their ideal car.",
      available: stage === "buildCar" ? "enabled" : "disabled",
    },
    [stage],
  );

  // Render the CarBuilder component and wait for the user's response.
  useCopilotAction(
    {
      name: "buildCar",
      description: "Help the user select and customize a car",
      available: stage === "buildCar" ? "enabled" : "disabled",
      renderAndWaitForResponse: ({ status, respond }) => {
        return (
          <CarBuilder
            status={status}
            onSubmit={(car) => {
              // Commit the selected car to the global state.
              setSelectedCar(car);

              // Let the agent know that the user has selected a car.
              respond?.(`User has selected a ${car.year} ${car.make} ${car.model}.`);

              // Move to the next stage, sellFinancing.
              setStage("sellFinancing");
            }}
          />
        );
      },
    },
    [stage]
  );
}