"use client";

import { Order } from "@/lib/types";
import { cn } from "@/lib/utils/cn";

interface OrderCardsProps {
  orders: Order[];
  className?: string;
}

export function OrderCards({ orders, className }: OrderCardsProps) {
  if (orders.length === 0) {
    return (
      <div className={cn("text-center py-8 text-gray-500", className)}>
        No orders yet. Start by creating your first order!
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {orders.map((order) => (
        <div
          key={order.id}
          className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg">
              {order.car.year} {order.car.make} {order.car.model}
            </h3>
            <span
              className={cn(
                "px-2 py-1 rounded-full text-xs font-medium",
                order.status === "confirmed"
                  ? "bg-green-100 text-green-800"
                  : order.status === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-blue-100 text-blue-800"
              )}
            >
              {order.status}
            </span>
          </div>
          
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>Customer:</strong> {order.contactInfo.name}</p>
            <p><strong>Email:</strong> {order.contactInfo.email}</p>
            <p><strong>Phone:</strong> {order.contactInfo.phone}</p>
            <p><strong>Total Price:</strong> ${order.totalPrice.toLocaleString()}</p>
            
            {order.financingInfo && (
              <div className="mt-2 pt-2 border-t">
                <p><strong>Financing:</strong> ${order.financingInfo.monthlyPayment}/month</p>
                <p><strong>Down Payment:</strong> ${order.financingInfo.downPayment.toLocaleString()}</p>
                <p><strong>Loan Term:</strong> {order.financingInfo.loanTerm} months</p>
              </div>
            )}
            
            <p className="text-xs text-gray-400 mt-2">
              Created: {order.createdAt.toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}