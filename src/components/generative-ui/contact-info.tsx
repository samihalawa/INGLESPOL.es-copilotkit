"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";

interface ContactInfoProps {
  status: string;
  onSubmit: (name: string, email: string, phone: string) => void;
  className?: string;
}

export function ContactInfo({ status, onSubmit, className }: ContactInfoProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && phone) {
      onSubmit(name, email, phone);
    }
  };

  return (
    <div className={cn("max-w-md mx-auto p-6 bg-white rounded-lg shadow-md", className)}>
      <h2 className="text-xl font-bold mb-4 text-center">Contact Information</h2>
      <p className="text-sm text-gray-600 mb-6 text-center">
        Please provide your contact details to get started.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your phone number"
            required
          />
        </div>

        <button
          type="submit"
          disabled={!name || !email || !phone || status === "loading"}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {status === "loading" ? "Processing..." : "Continue"}
        </button>
      </form>
    </div>
  );
}