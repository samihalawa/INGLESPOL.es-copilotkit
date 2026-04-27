export type ExamType = 
  | "guardia_civil"
  | "policia_nacional" 
  | "policia_municipal"
  | "adif"
  | "aptis_esol";

export interface StudentInfo {
  name: string;
  email: string;
  phone: string;
  examType: ExamType;
  currentLevel?: "A2" | "B1" | "B2" | "C1";
  examDate?: Date;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  eliminationTrick: string;
  topic: string;
  difficulty: "easy" | "medium" | "hard";
  examType: ExamType[];
}

export interface CoursePackage {
  type: "regular" | "intensive" | "premium";
  duration: number; // weeks
  price: number; // euros per month
  features: string[];
  questionsPerDay: number;
  classesPerWeek: number;
  hoursPerClass: number;
  whatsappSupport: boolean;
  recordedClasses: boolean;
}

export interface StudyPlan {
  coursePackage: CoursePackage;
  topicsPerWeek: number;
  practiceQuestionsPerDay: number;
  classSchedule?: string;
  personalizedSupport: boolean;
}

export interface PaymentInfo {
  method: "card" | "paypal" | "transfer";
  installments: number;
  totalAmount: number;
  monthlyAmount: number;
}

export interface Progress {
  correctAnswers: number;
  totalQuestions: number;
  currentStreak: number;
  longestStreak: number;
  points: number;
  achievements: string[];
  topicProgress: Record<string, number>;
  lastStudied: Date;
}

export interface LearningSession {
  id: string;
  studentInfo: StudentInfo;
  studyPlan?: StudyPlan;
  progress: Progress;
  status: "onboarding" | "assessment" | "active" | "completed";
  createdAt: Date;
}

export const examTypeLabels: Record<ExamType, string> = {
  guardia_civil: "Guardia Civil",
  policia_nacional: "Policía Nacional",
  policia_municipal: "Policía Municipal",
  adif: "ADIF",
  aptis_esol: "Aptis ESOL"
};

export const coursePackages: CoursePackage[] = [
  {
    type: "regular",
    duration: 24,
    price: 39,
    features: [
      "1 clase semanal (2 horas)",
      "15-20 preguntas diarias",
      "Acceso a +7.000 preguntas",
      "Clases grabadas 24/7",
      "Método de descarte exclusivo"
    ],
    questionsPerDay: 20,
    classesPerWeek: 1,
    hoursPerClass: 2,
    whatsappSupport: false,
    recordedClasses: true
  },
  {
    type: "intensive",
    duration: 12,
    price: 59,
    features: [
      "2 clases semanales (3 horas c/u)",
      "30-40 preguntas diarias",
      "Acceso a +7.000 preguntas",
      "Clases grabadas 24/7",
      "Método de descarte exclusivo",
      "Simulacros frecuentes"
    ],
    questionsPerDay: 35,
    classesPerWeek: 2,
    hoursPerClass: 3,
    whatsappSupport: false,
    recordedClasses: true
  },
  {
    type: "premium",
    duration: 12,
    price: 89,
    features: [
      "2 clases semanales (3 horas c/u)",
      "40-50 preguntas diarias",
      "Acceso a +7.000 preguntas",
      "Clases grabadas 24/7",
      "Método de descarte exclusivo",
      "Soporte WhatsApp directo",
      "Clases particulares mensuales",
      "Material extra personalizado"
    ],
    questionsPerDay: 50,
    classesPerWeek: 2,
    hoursPerClass: 3,
    whatsappSupport: true,
    recordedClasses: true
  }
];

export const sampleQuestions: Question[] = [
  {
    id: "q1",
    text: "If I ___ more time, I would travel the world.",
    options: ["has", "had", "have", "will have"],
    correctAnswer: 1,
    explanation: "Esta es una oración condicional de segundo tipo (Second Conditional). La estructura es: If + Past Simple, ... would + infinitivo.",
    eliminationTrick: "La clave está en 'would travel' en la segunda parte. El 'would' nos indica que necesitamos Segundo Condicional, por lo que la primera parte debe ir en Past Simple.",
    topic: "Conditionals",
    difficulty: "medium",
    examType: ["guardia_civil", "policia_nacional"]
  },
  {
    id: "q2", 
    text: "She ___ to the store yesterday.",
    options: ["go", "goes", "went", "going"],
    correctAnswer: 2,
    explanation: "El indicador temporal 'yesterday' (ayer) nos dice que la acción ocurrió en el pasado, por lo que necesitamos Past Simple.",
    eliminationTrick: "Busca las palabras clave de tiempo. 'Yesterday' siempre requiere Past Simple. Elimina todas las opciones que no sean pasado simple.",
    topic: "Past Tenses",
    difficulty: "easy",
    examType: ["guardia_civil", "policia_nacional", "policia_municipal"]
  }
];

export const defaultSessions: LearningSession[] = [
  {
    id: "1",
    studentInfo: {
      name: "Carlos García",
      email: "carlos@example.com",
      phone: "+34-666-123-456",
      examType: "guardia_civil",
      currentLevel: "B1",
      examDate: new Date("2025-09-15")
    },
    studyPlan: {
      coursePackage: coursePackages[0], // regular package
      topicsPerWeek: 2,
      practiceQuestionsPerDay: 20,
      classSchedule: "Martes 19:00",
      personalizedSupport: false
    },
    progress: {
      correctAnswers: 156,
      totalQuestions: 200,
      currentStreak: 7,
      longestStreak: 12,
      points: 1250,
      achievements: ["Primera semana", "Racha de 5 días", "100 preguntas"],
      topicProgress: {
        "Conditionals": 85,
        "Past Tenses": 92,
        "Present Perfect": 67
      },
      lastStudied: new Date("2025-01-20")
    },
    status: "active",
    createdAt: new Date("2024-12-15")
  },
  {
    id: "2",
    studentInfo: {
      name: "María López",
      email: "maria@example.com", 
      phone: "+34-677-654-321",
      examType: "policia_nacional",
      currentLevel: "A2"
    },
    progress: {
      correctAnswers: 45,
      totalQuestions: 60,
      currentStreak: 3,
      longestStreak: 5,
      points: 450,
      achievements: ["Primer día", "10 preguntas correctas"],
      topicProgress: {
        "Basic Grammar": 75,
        "Vocabulary": 60
      },
      lastStudied: new Date("2025-01-19")
    },
    status: "assessment",
    createdAt: new Date("2025-01-18")
  }
];