import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const EnglishProficiency = () => {
  const muEltScore = {
    total: 85, // Example score
    passingScore: 84,
    maxScore: 150,
    testDate: "20/07/2024",
    verifyingDate: "25/07/2024",
    listening: 42, // Example listening score
    reading: 43, // Example reading score
    maxSectionScore: 75,
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto space-y-4">
      {/* Summary Box */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full text-center">
        <h2 className="text-xl font-semibold mb-2">MU-ELT Score</h2>
        <p className="text-green-600 font-medium text-xl">{muEltScore.total} / {muEltScore.maxScore}</p>
        <div className="flex justify-center items-center space-x-2 text-green-600 font-bold text-lg mt-2">
          <FaCheckCircle />
          <span>Passed</span>
        </div>
        <p className="text-gray-600 mt-2">Test Date: {muEltScore.testDate}</p>
        <p className="text-gray-600">Verifying Date: {muEltScore.verifyingDate}</p>
      </div>

      {/* Detailed Score Breakdown */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full text-center">
        <h3 className="text-lg font-semibold mb-2">Score Details</h3>
        <div className="grid grid-cols-2 gap-4 text-gray-700 font-medium">
          <p className="font-semibold text-right">Listening:</p>
          <p className="text-left">{muEltScore.listening} / {muEltScore.maxSectionScore}</p>
          <p className="font-semibold text-right">Reading:</p>
          <p className="text-left">{muEltScore.reading} / {muEltScore.maxSectionScore}</p>
        </div>
      </div>
    </div>
  );
};

export default EnglishProficiency;
