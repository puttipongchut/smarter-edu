import React, { useState, useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import TimetablePDF from "./TimeTable";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa6";
import SuccessModal from "./SuccessModal";

const courses = [
  { id: 1, name: "Math 101", sections: ["08:30-10:30", "13:30-15:30", "15:30-17:30"] },
  { id: 2, name: "Physics 102", sections: ["08:30-10:30", "13:30-15:30", "15:30-17:30"] },
  { id: 3, name: "Chemistry 103", sections: ["08:30-10:30", "13:30-15:30", "15:30-17:30"] },
  { id: 4, name: "Biology 104", sections: ["08:30-10:30", "13:30-15:30", "15:30-17:30"] },
  { id: 5, name: "History 105", sections: ["08:30-10:30", "13:30-15:30", "15:30-17:30"] },
  { id: 6, name: "English 106", sections: ["08:30-10:30", "13:30-15:30", "15:30-17:30"] },
  { id: 7, name: "Computer Science 107", sections: ["08:30-10:30", "13:30-15:30", "15:30-17:30"] },
  { id: 8, name: "Psychology 108", sections: ["08:30-10:30", "13:30-15:30", "15:30-17:30"] },
  { id: 9, name: "Economics 109", sections: ["08:30-10:30", "13:30-15:30", "15:30-17:30"] },
  { id: 10, name: "Philosophy 110", sections: ["08:30-10:30", "13:30-15:30", "15:30-17:30"] },
];

const hasConflict = (selectedCourses, newCourse) => {
  return selectedCourses.some((course) => course.section === newCourse.section);
};

const CourseRegistration = () => {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    const savedCourses = JSON.parse(localStorage.getItem("registeredCourses"));
    if (savedCourses) setSelectedCourses(savedCourses);
  }, []);

  useEffect(() => {
    localStorage.setItem("registeredCourses", JSON.stringify(selectedCourses));
  }, [selectedCourses]);

  const handleAddCourse = (course, section) => {
    const newCourse = { ...course, section };
    if (hasConflict(selectedCourses, newCourse)) {
      alert("Schedule conflict detected!");
      return;
    }
    setSelectedCourses([...selectedCourses, newCourse]);
  };

  const handleRemoveCourse = (id) => {
    setSelectedCourses(selectedCourses.filter((course) => course.id !== id));
  };

  const handleConfirm = () => {
    setShowModal(false);
    setConfirmed(true);
  };

  return confirmed ? (
    <div className="p-4 w-full max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Class Schedule</h2>
      <PDFDownloadLink document={<TimetablePDF registeredCourses={selectedCourses} />} fileName="ClassSchedule.pdf">
        <button className="bg-blue-500 text-white p-2 rounded">Download PDF</button>
      </PDFDownloadLink>
      <TimetablePDF registeredCourses={selectedCourses} />
    </div>
  ) : (
    <div className="p-4 w-full max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Course Registration</h2>
      <div className="space-y-2">
        {courses.map((course) => (
          <div key={course.id} className="p-2 border rounded-lg bg-gray-100">
            <p className="font-medium">{course.name}</p>
            <div className="flex space-x-2 mt-4">
              {course.sections.map((section, index) => (
                <button key={index} className="bg-blue-500 text-white p-1 rounded-lg flex justify-center items-center space-x-2" onClick={() => handleAddCourse(course, section)}>
                  {section} <FaPlus className="ml-1 mr-1"/>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 p-2 border rounded-lg bg-gray-200">
        <h3 className="font-medium">Selected Courses</h3>
        <button className="text-sm text-blue-500" onClick={() => setEditMode(!editMode)}>
          <FaEdit /> Edit
        </button>
        <div className="mt-2 space-y-2">
          {selectedCourses.map((course) => (
            <div key={course.id} className="p-2 border rounded-lg bg-white flex justify-between items-center">
              <span>{course.name} ({course.section})</span>
              {editMode && (
                <button className="text-red-500" onClick={() => handleRemoveCourse(course.id)}>
                  <FaTrash />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      <button className="mt-4 bg-green-500 text-white p-2 rounded" onClick={() => setShowModal(true)}>
        Confirm Registration
      </button>
      {showModal && (
        <SuccessModal onClose={() => setShowModal(false)}>
          <p>Confirm your registration?</p>
          <button onClick={handleConfirm} className="bg-green-500 text-white p-2 rounded">Confirm</button>
        </SuccessModal>
      )}
    </div>
  );
};

export default CourseRegistration;
