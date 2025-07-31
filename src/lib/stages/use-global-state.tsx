import { createContext, useContext, ReactNode, useState } from "react";
import { Car, ContactInfo, CardInfo, Order, defaultOrders, FinancingInfo } from "@/lib/types";
import { useCopilotReadable } from "@copilotkit/react-core";

export type Stage =
  | "buildCar"
  | "getContactInfo"
  | "sellFinancing"
  | "getFinancingInfo"
  | "getPaymentInfo"
  | "confirmOrder";

interface GlobalState {
  stage: Stage;
  setStage: React.Dispatch<React.SetStateAction<Stage>>;
  selectedCar: Car | null;
  setSelectedCar: React.Dispatch<React.SetStateAction<Car | null>>;
  contactInfo: ContactInfo | null;
  setContactInfo: React.Dispatch<React.SetStateAction<ContactInfo | null>>;
  cardInfo: CardInfo | null;
  setCardInfo: React.Dispatch<React.SetStateAction<CardInfo | null>>;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  financingInfo: FinancingInfo | null;
  setFinancingInfo: React.Dispatch<React.SetStateAction<FinancingInfo | null>>;
}

export const GlobalStateContext = createContext<GlobalState | null>(null);

/**
  useGlobalState is a hook that will return the global state of the application. It must
  be used within a GlobalStateProvider. It keeps track of the:
  - Current stage of the application.
  - Selected car.
  - Contact information of the user.
  - Card information of the user.
  - Orders of the user.
  - Financing information of the user.
*/
export function useGlobalState() {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
}

/**
  GlobalStateProvider is a provider that will wrap the entire application and provide
  the global state to all components. It uses React Context to provide the state to
  all components.
*/
export function GlobalStateProvider({ children }: { children: ReactNode }) {
  const [stage, setStage] = useState<Stage>("getContactInfo");
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [cardInfo, setCardInfo] = useState<CardInfo | null>(null);
  const [orders, setOrders] = useState<Order[]>(defaultOrders);
  const [financingInfo, setFinancingInfo] = useState<FinancingInfo | null>(null);

  // Make the global state readable to CopilotKit
  useCopilotReadable({
    description: "Current stage of the car sales process",
    value: stage,
  });

  useCopilotReadable({
    description: "Selected car information",
    value: selectedCar,
  });

  useCopilotReadable({
    description: "Customer contact information",
    value: contactInfo,
  });

  useCopilotReadable({
    description: "Customer orders",
    value: orders,
  });

  useCopilotReadable({
    description: "Financing information",
    value: financingInfo,
  });

  const value = {
    stage,
    setStage,
    selectedCar,
    setSelectedCar,
    contactInfo,
    setContactInfo,
    cardInfo,
    setCardInfo,
    orders,
    setOrders,
    financingInfo,
    setFinancingInfo,
  };

  return (
    <GlobalStateContext.Provider value={value}>
      {children}
    </GlobalStateContext.Provider>
  );
}