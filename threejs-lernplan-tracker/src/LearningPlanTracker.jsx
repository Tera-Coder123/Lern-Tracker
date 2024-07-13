import React, { useState, useEffect } from "react";

const LearningPlanTracker = () => {
  const [currentWeek, setCurrentWeek] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  const [studyData, setStudyData] = useState(() => {
    try {
      const savedData = localStorage.getItem("studyData");
      return savedData
        ? JSON.parse(savedData)
        : Array(5)
            .fill()
            .map(() =>
              Array(7)
                .fill()
                .map(() => ({ completed: false, hours: 0 }))
            );
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
      return Array(5)
        .fill()
        .map(() =>
          Array(7)
            .fill()
            .map(() => ({ completed: false, hours: 0 }))
        );
    }
  });
  const [newHours, setNewHours] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem("studyData", JSON.stringify(studyData));
    } catch (error) {
      console.error("Error saving data to localStorage:", error);
    }
  }, [studyData]);

  const handleCheckboxChange = (week, day) => {
    const newData = [...studyData];
    newData[week][day].completed = !newData[week][day].completed;
    setStudyData(newData);
  };

  const handleHoursChange = (week, day, hours) => {
    const newData = [...studyData];
    newData[week][day].hours = hours;
    setStudyData(newData);
  };

  const addHours = (week, day) => {
    if (newHours && !isNaN(newHours)) {
      handleHoursChange(week, day, Number(newHours));
      setNewHours("");
    }
  };

  const removeHours = (week, day) => {
    handleHoursChange(week, day, 0);
  };

  const totalHours = studyData.reduce(
    (sum, week) =>
      sum +
      week.reduce(
        (weekSum, day) => weekSum + (day.completed ? day.hours : 0),
        0
      ),
    0
  );

  const progressPercentage = (totalHours / 110) * 100;

  const weekDays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

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
                    checked={studyData[currentWeek - 1][index].completed}
                    onChange={() => {}}
                    className="w-6 h-6"
                  />
                </div>
                <span className="mt-2 text-sm font-medium">{day}</span>
                <span className="text-xs text-gray-500">
                  {studyData[currentWeek - 1][index].hours}h
                </span>
                <input
                  type="number"
                  value={newHours}
                  onChange={(e) => setNewHours(e.target.value)}
                  className="w-16 mt-1 p-1 text-sm rounded"
                  placeholder="Stunden"
                />
                <button
                  onClick={() => addHours(currentWeek - 1, index)}
                  className="mt-1 px-2 py-1 text-xs bg-green-500 text-white rounded"
                >
                  Hinzufügen
                </button>
                <button
                  onClick={() => removeHours(currentWeek - 1, index)}
                  className="mt-1 px-2 py-1 text-xs bg-red-500 text-white rounded"
                >
                  Löschen
                </button>
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
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              ></div>
            </div>
            <div className="text-right text-sm text-gray-500">
              {progressPercentage.toFixed(1)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPlanTracker;
