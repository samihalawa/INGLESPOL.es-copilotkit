"use client";

import { Car, ContactInfo, CardInfo, FinancingInfo } from "@/lib/types";
import { cn } from "@/lib/utils/cn";

interface OrderConfirmationProps {
  status: string;
  car: Car | null;
  contactInfo: ContactInfo | null;
  cardInfo: CardInfo | null;
  financingInfo: FinancingInfo | null;
  onConfirm: () => void;
  className?: string;
}

export function OrderConfirmation({ 
  status, 
  car, 
  contactInfo, 
  cardInfo, 
  financingInfo, 
  onConfirm,
  className 
}: OrderConfirmationProps) {
  if (!car || !contactInfo) {
    return (
      <div className={cn("max-w-md mx-auto p-6 bg-white rounded-lg shadow-md", className)}>
        <p className="text-center text-red-500">Missing required information</p>
      </div>
    );
  }

  const totalPrice = car.price;
  const isFinanced = !!financingInfo;

  return (
    <div className={cn("max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md", className)}>
      <h2 className="text-2xl font-bold mb-6 text-center">Order Confirmation</h2>
      <p className="text-sm text-gray-600 mb-6 text-center">
        Please review your order details before confirming.
      </p>

      <div className="space-y-6">
        {/* Vehicle Details */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold text-lg mb-2">Vehicle</h3>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🚗</span>
            </div>
            <div>
              <h4 className="font-semibold">
                {car.year} {car.make} {car.model}
              </h4>
              <p className="text-sm text-gray-600">{car.description}</p>
              <p className="text-lg font-bold text-green-600">
                ${car.price.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Customer Details */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold text-lg mb-2">Customer Information</h3>
          <div className="text-sm space-y-1">
            <p><strong>Name:</strong> {contactInfo.name}</p>
            <p><strong>Email:</strong> {contactInfo.email}</p>
            <p><strong>Phone:</strong> {contactInfo.phone}</p>
          </div>
        </div>

        {/* Payment Details */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold text-lg mb-2">Payment Information</h3>
          {isFinanced ? (
            <div className="space-y-2 text-sm">
              <p><strong>Payment Method:</strong> Financing</p>
              <p><strong>Down Payment:</strong> ${financingInfo.downPayment.toLocaleString()}</p>
              <p><strong>Loan Term:</strong> {financingInfo.loanTerm} months</p>
              <p><strong>Interest Rate:</strong> {financingInfo.interestRate}%</p>
              <p><strong>Monthly Payment:</strong> ${financingInfo.monthlyPayment.toLocaleString()}</p>
            </div>
          ) : (
            <div className="space-y-2 text-sm">
              <p><strong>Payment Method:</strong> Full Payment</p>
              {cardInfo && (
                <>
                  <p><strong>Card:</strong> **** **** **** {cardInfo.cardNumber.slice(-4)}</p>
                  <p><strong>Cardholder:</strong> {cardInfo.name}</p>
                </>
              )}
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="border rounded-lg p-4 bg-gray-50">
          <h3 className="font-semibold text-lg mb-2">Order Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Vehicle Price:</span>
              <span>${totalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax & Fees:</span>
              <span>$0</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span className="text-green-600">${totalPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <button
          onClick={onConfirm}
          disabled={status === "loading"}
          className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-lg font-semibold"
        >
          {status === "loading" ? "Processing Order..." : "Confirm Order"}
        </button>
      </div>
    </div>
  );
}