import React, { useState } from "react";

const weekDays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
const studyHours = [2, 2, 2, 2, 4, 7, 7];

const LearningPlanTracker = () => {
  const [currentWeek, setCurrentWeek] = useState(1);
  const [progress, setProgress] = useState(
    Array(5)
      .fill()
      .map(() => Array(7).fill(false))
  );
  const [darkMode, setDarkMode] = useState(false);

  const handleCheckboxChange = (week, day) => {
    const newProgress = progress.map((w, i) =>
      i === week ? w.map((d, j) => (j === day ? !d : d)) : w
    );
    setProgress(newProgress);
  };

  const totalHours = progress.reduce(
    (sum, week, weekIndex) =>
      sum +
      week.reduce(
        (weekSum, day, dayIndex) => weekSum + (day ? studyHours[dayIndex] : 0),
        0
      ),
    0
  );

  const progressPercentage = (totalHours / 110) * 100;

  return (
    <div
      className={`min-h-screen p-6 space-y-6 ${
        darkMode ? "dark bg-gray-900 text-white" : "bg-gray-100"
      }`}
    >
      <div className="animated-bg"></div>
      <div className="max-w-4xl mx-auto relative">
        <div className="flex justify-between items-center mb-6">
          <h1
            className={`text-3xl font-bold ${
              darkMode ? "text-white" : "text-purple-800"
            }`}
          >
            Three.js Lernplan Tracker
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 rounded-lg bg-purple-500 text-white"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <div
          className={`p-6 rounded-lg shadow-md ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-2xl font-semibold">Wochenfortschritt</h2>
            <select
              value={currentWeek}
              onChange={(e) => setCurrentWeek(Number(e.target.value))}
              className={`p-2 rounded ${
                darkMode ? "bg-gray-700 text-white" : "bg-white"
              }`}
            >
              {[1, 2, 3, 4, 5].map((week) => (
                <option key={week} value={week}>
                  Woche {week}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-7 gap-4">
            {weekDays.map((day, index) => (
              <div key={day} className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 flex items-center justify-center cursor-pointer rounded-full transition-colors duration-200 ${
                    darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
                  }`}
                  onClick={() => handleCheckboxChange(currentWeek - 1, index)}
                >
                  <input
                    type="checkbox"
                    checked={progress[currentWeek - 1][index]}
                    onChange={() => {}}
                    className="w-6 h-6"
                  />
                </div>
                <span className="mt-2 text-sm font-medium">{day}</span>
                <span className="text-xs text-gray-500">
                  {studyHours[index]}h
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`mt-6 p-6 rounded-lg shadow-md ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2 className="text-2xl font-semibold mb-4">Gesamtfortschritt</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Gesamt absolvierte Stunden:</span>
              <span className="font-bold">{totalHours} von 110</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className="bg-purple-600 h-2.5 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="text-right text-sm text-gray-500">
              {progressPercentage.toFixed(1)}%
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={() => setCurrentWeek((prev) => Math.max(1, prev - 1))}
            className="px-4 py-2 rounded-lg bg-purple-500 text-white"
          >
            Vorherige Woche
          </button>
          <button
            onClick={() => setCurrentWeek((prev) => Math.min(5, prev + 1))}
            className="px-4 py-2 rounded-lg bg-purple-500 text-white"
          >
            Nächste Woche
          </button>
        </div>
      </div>
    </div>
  );
};

export default LearningPlanTracker;
