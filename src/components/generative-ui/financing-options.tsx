"use client";

import { cn } from "@/lib/utils/cn";

interface FinancingOptionsProps {
  status: string;
  onFinancing: () => void;
  onCash: () => void;
  className?: string;
}

export function FinancingOptions({ status, onFinancing, onCash, className }: FinancingOptionsProps) {
  return (
    <div className={cn("max-w-md mx-auto p-6 bg-white rounded-lg shadow-md", className)}>
      <h2 className="text-xl font-bold mb-4 text-center">Payment Options</h2>
      <p className="text-sm text-gray-600 mb-6 text-center">
        How would you like to pay for your vehicle?
      </p>

      <div className="space-y-4">
        <button
          onClick={onFinancing}
          disabled={status === "loading"}
          className="w-full p-4 border-2 border-blue-500 rounded-lg text-left hover:bg-blue-50 transition-colors disabled:opacity-50"
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">💰</span>
            </div>
            <div>
              <h3 className="font-semibold text-blue-600">Financing</h3>
              <p className="text-sm text-gray-600">
                Get approved for a loan with competitive rates
              </p>
            </div>
          </div>
        </button>

        <button
          onClick={onCash}
          disabled={status === "loading"}
          className="w-full p-4 border-2 border-green-500 rounded-lg text-left hover:bg-green-50 transition-colors disabled:opacity-50"
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">💳</span>
            </div>
            <div>
              <h3 className="font-semibold text-green-600">Pay Cash</h3>
              <p className="text-sm text-gray-600">
                Pay the full amount upfront
              </p>
            </div>
          </div>
        </button>
      </div>

      {status === "loading" && (
        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">Processing your selection...</p>
        </div>
      )}
    </div>
  );
}