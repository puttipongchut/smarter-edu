import React from "react";

const StudentInfo = () => {
  const student = {
    id: "67xxxxx",
    fullName: "John Doe",
    degreeLevel: "Bachelor",
    faculty: "Faculty of OP",
    program: "MUGE100",
    attendedDate: "2024",
    classYear: "1",
    status: "Studying",
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md mx-auto text-center">
      <h2 className="text-xl font-semibold mb-4">Student Information</h2>
      <div className="grid grid-cols-2 gap-4">
        <p className="font-semibold text-right">Student ID:</p>
        <p className="text-gray-900 text-left">{student.id}</p>

        <p className="font-semibold text-right">Full Name:</p>
        <p className="text-gray-900 text-left">{student.fullName}</p>

        <p className="font-semibold text-right">Degree Level:</p>
        <p className="text-gray-900 text-left">{student.degreeLevel}</p>

        <p className="font-semibold text-right">Faculty:</p>
        <p className="text-gray-900 text-left">{student.faculty}</p>

        <p className="font-semibold text-right">Program:</p>
        <p className="text-gray-900 text-left">{student.program}</p>

        <p className="font-semibold text-right">Attended Date:</p>
        <p className="text-gray-900 text-left">{student.attendedDate}</p>

        <p className="font-semibold text-right">Class Year:</p>
        <p className="text-gray-900 text-left">{student.classYear}</p>

        <p className="font-semibold text-right">Status:</p>
        <p className="text-green-600 font-bold text-left">{student.status}</p>
      </div>
    </div>
  );
};

export default StudentInfo;
