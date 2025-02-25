import React, { useState, useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import TimetablePDF from "./TimeTable";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

const courses = [
    { id: 1, name: "Math 101", sections: [
        { time: "08:30-10:30", day: "Monday" },
        { time: "13:30-15:30", day: "Tuesday" },
        { time: "15:30-17:30", day: "Thursday" },
    ]},
    { id: 2, name: "Physics 102", sections: [
        { time: "08:30-10:30", day: "Tuesday" },
        { time: "13:30-15:30", day: "Wednesday" },
        { time: "15:30-17:30", day: "Friday" },
    ]},
    { id: 3, name: "LAEN 101", sections: [
        { time: "08:30-10:30", day: "Wednesday" },
        { time: "13:30-15:30", day: "Thursday" },
    ]},
    { id: 4, name: "MUGE 100", sections: [
        { time: "08:30-10:30", day: "Monday" },
        { time: "15:30-17:30", day: "Wednesday" },
    ]},
    { id: 5, name: "Computer Science 105", sections: [
        { time: "08:30-10:30", day: "Friday" },
        { time: "13:30-15:30", day: "Monday" },
    ]},
];

const hasConflict = (selectedCourses, newCourse) => {
    return selectedCourses.some(course => course.day === newCourse.day && course.time === newCourse.time);
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
        const newCourse = { ...course, ...section, uniqueId: `${course.id}-${section.day}-${section.time}` };
        if (hasConflict(selectedCourses, newCourse)) {
            alert("Schedule conflict detected!");
            return;
        }
        setSelectedCourses([...selectedCourses, newCourse]);
    };

    const handleRemoveCourse = (id) => {
        setSelectedCourses(selectedCourses.filter(course => course.uniqueId !== id));
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
                {courses.map(course => (
                    <div key={course.id} className="p-2 border rounded-lg bg-gray-100">
                        <p className="font-medium">{course.name}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {course.sections.map((section, index) => (
                                <button key={index} className="bg-blue-500 text-white p-1 rounded-lg flex items-center space-x-2" onClick={() => handleAddCourse(course, section)}>
                                    {section.day} {section.time} <FaPlus className="ml-1" />
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-4 p-2 border rounded-lg bg-gray-200">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Selected Courses</h3>
                    <button className="text-blue-500 flex items-center space-x-1" onClick={() => setEditMode(!editMode)}>
                        <FaEdit /> <span className="font-semibold">Edit</span>
                    </button>
                </div>
                <div className="mt-2 space-y-2">
                    {selectedCourses.map(course => (
                        <div key={course.uniqueId} className="p-2 border rounded-lg bg-white flex justify-between items-center">
                            <span>{course.name} ({course.day} {course.time})</span>
                            {editMode && (
                                <button className="text-red-500" onClick={() => handleRemoveCourse(course.uniqueId)}>
                                    <FaTrash />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <button className="mt-4 bg-green-500 text-white p-2 rounded-lg" onClick={() => setShowModal(true)}>
                Confirm Registration
            </button>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full">
                        <p className="text-lg font-semibold mb-4">Confirm your registration?</p>
                        <div className="flex justify-end space-x-2">
                            <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-red-500 text-white rounded-lg">Cancel</button>
                            <button onClick={handleConfirm} className="px-4 py-2 bg-green-600 text-white rounded-lg">Confirm</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CourseRegistration;
