"use client";

import { useState } from "react";
import { Car } from "@/lib/types";
import { cn } from "@/lib/utils/cn";

const availableCars: Car[] = [
  {
    id: "tesla-model-3",
    make: "Tesla",
    model: "Model 3",
    year: 2024,
    price: 45000,
    image: "/cars/tesla-model-3.jpg",
    description: "Electric sedan with autopilot and premium features"
  },
  {
    id: "bmw-x5",
    make: "BMW",
    model: "X5",
    year: 2024,
    price: 65000,
    image: "/cars/bmw-x5.jpg",
    description: "Luxury SUV with advanced safety features"
  },
  {
    id: "audi-a4",
    make: "Audi",
    model: "A4",
    year: 2024,
    price: 55000,
    image: "/cars/audi-a4.jpg",
    description: "Premium sedan with quattro all-wheel drive"
  },
  {
    id: "mercedes-c-class",
    make: "Mercedes-Benz",
    model: "C-Class",
    year: 2024,
    price: 50000,
    image: "/cars/mercedes-c-class.jpg",
    description: "Elegant sedan with luxury interior"
  }
];

interface CarBuilderProps {
  status: string;
  onSubmit: (car: Car) => void;
  className?: string;
}

export function CarBuilder({ status, onSubmit, className }: CarBuilderProps) {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  const handleSubmit = () => {
    if (selectedCar) {
      onSubmit(selectedCar);
    }
  };

  return (
    <div className={cn("max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md", className)}>
      <h2 className="text-xl font-bold mb-4 text-center">Select Your Car</h2>
      <p className="text-sm text-gray-600 mb-6 text-center">
        Choose the perfect vehicle for your needs.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {availableCars.map((car) => (
          <div
            key={car.id}
            onClick={() => setSelectedCar(car)}
            className={cn(
              "border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md",
              selectedCar?.id === car.id 
                ? "border-blue-500 bg-blue-50 shadow-md" 
                : "border-gray-300 hover:border-gray-400"
            )}
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🚗</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">
                  {car.year} {car.make} {car.model}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{car.description}</p>
                <p className="text-lg font-bold text-green-600">
                  ${car.price.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedCar && (
        <div className="text-center">
          <button
            onClick={handleSubmit}
            disabled={status === "loading"}
            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {status === "loading" ? "Processing..." : "Select This Car"}
          </button>
        </div>
      )}
    </div>
  );
}