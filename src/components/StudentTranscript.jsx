import React from "react";

const StudentTranscript = () => {
  const activities = [
    { term: "1/2567", name: "Student Orientation", hours: 3 },
    { term: "1/2567", name: "Rak Nong", hours: 4 },
    { term: "1/2567", name: "MU Open House", hours: 10 },
  ];

  const totalHours = activities.reduce((sum, activity) => sum + activity.hours, 0);

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto space-y-4">
      {/* Total Activities Summary */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full text-center">
        <h2 className="text-xl font-semibold mb-2">Activity Transcript</h2>
        <p className="text-gray-700 font-medium">Total Activities: {activities.length}</p>
        <p className="text-gray-700 font-medium">Total Hours: {totalHours}</p>
      </div>
      
      {/* Activities Table */}
      <div className="bg-white shadow-lg rounded-lg p-4 w-full overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-center">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Term/Year</th>
              <th className="border border-gray-300 px-4 py-2">Activity</th>
              <th className="border border-gray-300 px-4 py-2">Hours</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => (
              <tr key={index} className="border border-gray-300">
                <td className="border border-gray-300 px-4 py-2">{activity.term}</td>
                <td className="border border-gray-300 px-4 py-2">{activity.name}</td>
                <td className="border border-gray-300 px-4 py-2">{activity.hours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTranscript;
