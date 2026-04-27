"use client";

import { useGlobalState } from "@/lib/stages";
import { cn } from "@/lib/utils/cn";

const stages = [
  { id: "contactInfo", label: "Información", description: "Datos de contacto" },
  { id: "needsAssessment", label: "Evaluación", description: "Nivel de inglés" },
  { id: "courseSelection", label: "Cursos", description: "Selección de curso" },
  { id: "courseCustomization", label: "Personalización", description: "Configurar curso" },
  { id: "paymentDetails", label: "Pago", description: "Detalles de pago" },
  { id: "enrollmentConfirmation", label: "Matrícula", description: "Confirmar inscripción" },
];

export function StateVisualizer() {
  const { stage } = useGlobalState();

  const currentStageIndex = stages.findIndex(s => s.id === stage);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-8">Proceso de Matrícula INGLESPOL</h2>
      
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-8 left-0 w-full h-0.5 bg-gray-200">
          <div
            className="h-full bg-blue-500 transition-all duration-500"
            style={{ width: `${(currentStageIndex / (stages.length - 1)) * 100}%` }}
          />
        </div>

        {/* Stage Nodes */}
        <div className="relative flex justify-between">
          {stages.map((stageItem, index) => {
            const isActive = stageItem.id === stage;
            const isCompleted = index < currentStageIndex;
            const isPending = index > currentStageIndex;

            return (
              <div key={stageItem.id} className="flex flex-col items-center">
                {/* Node Circle */}
                <div
                  className={cn(
                    "w-16 h-16 rounded-full border-4 flex items-center justify-center text-sm font-bold transition-all duration-300",
                    isActive && "border-blue-500 bg-blue-500 text-white shadow-lg scale-110",
                    isCompleted && "border-green-500 bg-green-500 text-white",
                    isPending && "border-gray-300 bg-white text-gray-400"
                  )}
                >
                  {index + 1}
                </div>

                {/* Stage Info */}
                <div className="mt-4 text-center max-w-32">
                  <h3
                    className={cn(
                      "text-sm font-semibold mb-1",
                      isActive && "text-blue-600",
                      isCompleted && "text-green-600",
                      isPending && "text-gray-400"
                    )}
                  >
                    {stageItem.label}
                  </h3>
                  <p
                    className={cn(
                      "text-xs",
                      isActive && "text-blue-500",
                      isCompleted && "text-green-500",
                      isPending && "text-gray-400"
                    )}
                  >
                    {stageItem.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Current Stage Details */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          Current Stage: <span className="font-semibold text-blue-600">{stages[currentStageIndex]?.label}</span>
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Step {currentStageIndex + 1} of {stages.length}
        </p>
      </div>
    </div>
  );
}