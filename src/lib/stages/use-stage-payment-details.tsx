import { useCopilotAction } from "@copilotkit/react-core";
import { useGlobalState } from "./use-global-state";
import { PaymentInfo } from "@/lib/types";

/**
 * Payment Details Stage
 * Collect payment information and method
 */
export function useStagePaymentDetails() {
  const { studentInfo, studyPlan, setPaymentInfo, setStage } = useGlobalState();

  useCopilotAction({
    name: "selectPaymentMethod",
    description: "Select payment method and installment plan",
    parameters: [
      {
        name: "paymentMethod",
        type: "string",
        description: "Payment method: card, paypal, or transfer",
        required: true,
      },
      {
        name: "installments",
        type: "number",
        description: "Number of installments: 1 (mensual), 3 (trimestral), 6 (semestral)",
        required: true,
      }
    ],
    handler: async ({ paymentMethod, installments }) => {
      if (!studentInfo || !studyPlan) {
        return "Primero necesito que completes la selección del curso.";
      }

      const basePrice = studyPlan.coursePackage.price;
      const courseDuration = studyPlan.coursePackage.duration;
      const totalWeeks = courseDuration;
      const totalMonths = Math.ceil(totalWeeks / 4);
      
      // Apply discounts for longer payment periods
      let discount = 0;
      if (installments === 3) discount = 0.1; // 10% discount for quarterly
      if (installments === 6) discount = 0.15; // 15% discount for biannual

      const totalAmount = Math.round(basePrice * totalMonths * (1 - discount));
      const monthlyAmount = Math.round(totalAmount / installments);

      const paymentInfo: PaymentInfo = {
        method: paymentMethod as "card" | "paypal" | "transfer",
        installments,
        totalAmount,
        monthlyAmount,
      };

      setPaymentInfo(paymentInfo);
      setStage("enrollmentConfirmation");

      const discountText = discount > 0 
        ? ` (${Math.round(discount * 100)}% descuento aplicado)`
        : '';
      
      const installmentText = installments === 1 
        ? 'mensual' 
        : installments === 3 
        ? 'trimestral' 
        : 'semestral';

      return `¡Perfecto! Has seleccionado pago ${installmentText} con ${paymentMethod}${discountText}.\n\n**Resumen del pago:**\n- Total del curso: ${totalAmount}€\n- Pago ${installmentText}: ${monthlyAmount}€ cada ${installments === 1 ? 'mes' : installments + ' meses'}\n\n¿Confirmamos tu matrícula en INGLESPOL?`;
    },
  });

  useCopilotAction({
    name: "showPaymentOptions",
    description: "Show available payment methods and discounts",
    parameters: [],
    handler: async () => {
      if (!studentInfo || !studyPlan) {
        return "Primero necesito que completes la selección del curso.";
      }

      const basePrice = studyPlan.coursePackage.price;
      const totalMonths = Math.ceil(studyPlan.coursePackage.duration / 4);
      const baseTotalPrice = basePrice * totalMonths;

      return `**Opciones de pago para tu curso ${studyPlan.coursePackage.type}:**

**Mensual:** ${basePrice}€/mes × ${totalMonths} meses = ${baseTotalPrice}€ total

**Trimestral:** ${Math.round(baseTotalPrice * 0.9)}€ total (10% descuento)
- Pago cada 3 meses: ${Math.round(baseTotalPrice * 0.9 / Math.ceil(totalMonths/3))}€

**Semestral:** ${Math.round(baseTotalPrice * 0.85)}€ total (15% descuento)  
- Pago cada 6 meses: ${Math.round(baseTotalPrice * 0.85 / Math.ceil(totalMonths/6))}€

**Métodos de pago disponibles:**
- 💳 Tarjeta de crédito/débito
- 💰 PayPal
- 🏦 Transferencia bancaria

¿Cuál prefieres?`;
    },
  });
}