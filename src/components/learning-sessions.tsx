import { LearningSession, examTypeLabels } from "@/lib/types";

interface LearningSessionsProps {
  sessions: LearningSession[];
}

export function LearningSessions({ sessions }: LearningSessionsProps) {
  const getStatusBadge = (status: LearningSession["status"]) => {
    const styles = {
      onboarding: "bg-blue-100 text-blue-800",
      assessment: "bg-yellow-100 text-yellow-800",
      active: "bg-green-100 text-green-800",
      completed: "bg-gray-100 text-gray-800"
    };

    const labels = {
      onboarding: "Nuevo",
      assessment: "Evaluando",
      active: "Activo",
      completed: "Completado"
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const getAccuracy = (session: LearningSession) => {
    const { correctAnswers, totalQuestions } = session.progress;
    return totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
  };

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">Sesiones de Aprendizaje INGLESPOL</h2>
        <p className="text-blue-100">Academia líder en preparación de inglés para oposiciones</p>
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">{sessions.length}</div>
            <div className="text-xs text-blue-200">Estudiantes</div>
          </div>
          <div>
            <div className="text-2xl font-bold">18.12</div>
            <div className="text-xs text-blue-200">Nota media</div>
          </div>
          <div>
            <div className="text-2xl font-bold">100%</div>
            <div className="text-xs text-blue-200">Éxito</div>
          </div>
        </div>
      </div>

      {sessions.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <div className="text-4xl mb-4">📚</div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No hay sesiones activas</h3>
          <p className="text-gray-500">Las sesiones de aprendizaje aparecerán aquí cuando los estudiantes se registren.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {sessions.map((session) => (
            <div key={session.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{session.studentInfo.name}</h3>
                  <p className="text-gray-600 text-sm">{session.studentInfo.email}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm text-gray-500">
                      {examTypeLabels[session.studentInfo.examType]}
                    </span>
                    {session.studentInfo.currentLevel && (
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                        Nivel {session.studentInfo.currentLevel}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  {getStatusBadge(session.status)}
                  <div className="text-sm text-gray-500 mt-1">
                    {new Date(session.createdAt).toLocaleDateString('es-ES')}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-green-600">{session.progress.correctAnswers}</div>
                  <div className="text-xs text-gray-500">Correctas</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-600">{getAccuracy(session)}%</div>
                  <div className="text-xs text-gray-500">Precisión</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-purple-600">{session.progress.currentStreak}</div>
                  <div className="text-xs text-gray-500">Racha</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-orange-600">{session.progress.points}</div>
                  <div className="text-xs text-gray-500">Puntos</div>
                </div>
              </div>

              {session.studyPlan && (
                <div className="bg-gray-50 p-3 rounded border">
                  <div className="text-xs text-gray-600 grid grid-cols-2 gap-2">
                    <div>Plan: <span className="font-medium">{session.studyPlan.coursePackage.type}</span></div>
                    <div>Duración: <span className="font-medium">{session.studyPlan.coursePackage.duration} semanas</span></div>
                    <div>Preguntas/día: <span className="font-medium">{session.studyPlan.practiceQuestionsPerDay}</span></div>
                    {session.studyPlan.classSchedule && (
                      <div>Clases: <span className="font-medium">{session.studyPlan.classSchedule}</span></div>
                    )}
                  </div>
                </div>
              )}

              {session.progress.achievements.length > 0 && (
                <div className="mt-3">
                  <div className="flex flex-wrap gap-1">
                    {session.progress.achievements.slice(0, 3).map((achievement, index) => (
                      <span key={index} className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                        🏆 {achievement}
                      </span>
                    ))}
                    {session.progress.achievements.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{session.progress.achievements.length - 3} más
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}