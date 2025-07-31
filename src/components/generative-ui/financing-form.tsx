"use client";

import { useState } from "react";
import { FinancingInfo } from "@/lib/types";
import { cn } from "@/lib/utils/cn";

interface FinancingFormProps {
  status: string;
  onSubmit: (financing: FinancingInfo) => void;
  className?: string;
}

export function FinancingForm({ status, onSubmit, className }: FinancingFormProps) {
  const [downPayment, setDownPayment] = useState(5000);
  const [loanTerm, setLoanTerm] = useState(60);
  const [interestRate] = useState(4.5); // Fixed for simplicity

  // Calculate monthly payment
  const principal = 50000 - downPayment; // Assuming $50k car price for calculation
  const monthlyRate = interestRate / 100 / 12;
  const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / 
                        (Math.pow(1 + monthlyRate, loanTerm) - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const financing: FinancingInfo = {
      downPayment,
      loanTerm,
      interestRate,
      monthlyPayment: Math.round(monthlyPayment)
    };
    
    onSubmit(financing);
  };

  return (
    <div className={cn("max-w-md mx-auto p-6 bg-white rounded-lg shadow-md", className)}>
      <h2 className="text-xl font-bold mb-4 text-center">Financing Details</h2>
      <p className="text-sm text-gray-600 mb-6 text-center">
        Configure your loan terms and see your monthly payment.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="downPayment" className="block text-sm font-medium text-gray-700 mb-1">
            Down Payment: ${downPayment.toLocaleString()}
          </label>
          <input
            type="range"
            id="downPayment"
            min="0"
            max="20000"
            step="1000"
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>$0</span>
            <span>$20,000</span>
          </div>
        </div>

        <div>
          <label htmlFor="loanTerm" className="block text-sm font-medium text-gray-700 mb-1">
            Loan Term: {loanTerm} months
          </label>
          <input
            type="range"
            id="loanTerm"
            min="36"
            max="84"
            step="12"
            value={loanTerm}
            onChange={(e) => setLoanTerm(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>36 months</span>
            <span>84 months</span>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Interest Rate:</span>
            <span className="font-semibold">{interestRate}%</span>
          </div>
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Monthly Payment:</span>
            <span className="text-green-600">${Math.round(monthlyPayment).toLocaleString()}</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {status === "loading" ? "Processing..." : "Continue with Financing"}
        </button>
      </form>
    </div>
  );
}