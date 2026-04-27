"use client";

import { LearningSessions } from "@/components/learning-sessions";
import { StateVisualizer } from "@/components/state-visualizer";
import { Tabs } from "@/components/tabs";
import { useGlobalState } from "@/lib/stages";
import { useState } from "react";

export default function Home() {
  const { sessions } = useGlobalState();
  const [activeTab, setActiveTab] = useState<string>("sessions");

  const tabs = [
    {
      id: "sessions",
      label: "Sesiones de Aprendizaje",
      content: <LearningSessions sessions={sessions} />,
    },
    {
      id: "visualizer",
      label: "Visualizador de Estados",
      content: <StateVisualizer />,
    },
  ];

  return <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />;
}