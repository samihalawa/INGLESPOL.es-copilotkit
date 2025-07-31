export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  image: string;
  description: string;
}

export interface ContactInfo {
  name: string;
  email: string;
  phone: string;
}

export interface CardInfo {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  name: string;
}

export interface FinancingInfo {
  downPayment: number;
  loanTerm: number;
  interestRate: number;
  monthlyPayment: number;
}

export interface Order {
  id: string;
  car: Car;
  contactInfo: ContactInfo;
  cardInfo?: CardInfo;
  financingInfo?: FinancingInfo;
  totalPrice: number;
  status: "pending" | "confirmed" | "completed";
  createdAt: Date;
}

export const defaultOrders: Order[] = [
  {
    id: "1",
    car: {
      id: "car-1",
      make: "Tesla",
      model: "Model 3",
      year: 2024,
      price: 45000,
      image: "/cars/tesla-model-3.jpg",
      description: "Electric sedan with autopilot"
    },
    contactInfo: {
      name: "John Doe",
      email: "john@example.com",
      phone: "+1-555-0123"
    },
    totalPrice: 45000,
    status: "confirmed",
    createdAt: new Date("2024-01-15")
  },
  {
    id: "2",
    car: {
      id: "car-2",
      make: "BMW",
      model: "X5",
      year: 2024,
      price: 65000,
      image: "/cars/bmw-x5.jpg",
      description: "Luxury SUV with premium features"
    },
    contactInfo: {
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1-555-0456"
    },
    financingInfo: {
      downPayment: 10000,
      loanTerm: 60,
      interestRate: 4.5,
      monthlyPayment: 950
    },
    totalPrice: 65000,
    status: "pending",
    createdAt: new Date("2024-01-20")
  }
];