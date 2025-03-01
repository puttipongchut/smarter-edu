import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

const courses = [
    { id: "SCMA101", name: "FUNDAMENTAL CALCULUS", sections: [
        { secId: "1", time: "08:30-10:30", day: "Monday", room: "L1-101" },
        { secId: "2", time: "13:30-15:30", day: "Tuesday", room: "L1-101" },
        { secId: "3", time: "15:30-17:30", day: "Thursday", room: "L2-102" },
    ]},
    { id: "SCPY150", name: "FUNDAMENTAL PHYSICS 2", sections: [
        { secId: "1", time: "08:30-10:30", day: "Tuesday", room: "L1-201" },
        { secId: "2", time: "10:30-12:30", day: "Wednesday", room: "L1-201" },
        { secId: "3", time: "15:30-17:30", day: "Friday", room: "L2-202" },
    ]},
    { id: "LAEN 101", name: "ENG LANG FOR UNIVERSITY STUDENT (LEVEL 1)", sections: [
        { secId: "1", time: "08:30-10:30", day: "Tuesday", room: "LA202" },
        { secId: "2", time: "13:30-15:30", day: "Thursday", room: "LA212" },
        { secId: "3", time: "10:30-12:30", day: "Friday", room: "LA222" },
    ]},
    { id: "MUGE 100", name: "GENERAL ED FOR HUMAN DEVELOP", sections: [
        { secId: "A1", time: "08:30-10:30", day: "Tuesday", room: "LA121" },
        { secId: "A2", time: "15:30-17:30", day: "Wednesday", room: "LA131" },
    ]},
    { id: "SCCH118", name: "CHEMISTRY LABORATORY", sections: [
        { secId: "1", time: "09:30-12:30", day: "Friday", room: "SC4-300" },
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
    const [pdfURL, setPdfURL] = useState(null);

    useEffect(() => {
        const savedCourses = JSON.parse(localStorage.getItem("registeredCourses"));
        const savedConfirmed = JSON.parse(localStorage.getItem("confirmed"));
        if (savedCourses) setSelectedCourses(savedCourses);
        if (savedConfirmed) setConfirmed(savedConfirmed);
    }, []);

    useEffect(() => {
        localStorage.setItem("registeredCourses", JSON.stringify(selectedCourses));
    }, [selectedCourses]);

    useEffect(() => {
        localStorage.setItem("confirmed", JSON.stringify(confirmed));
    }, [confirmed]);

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

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.setFillColor(212, 212, 212);
        doc.rect(10, 10, 190, 10, "F");
        doc.text("Class Year 67 : Class Schedule (Spring Semester : January 6 - May 14, 2025)", 15, 17);
        
        doc.setFillColor(59, 130, 246);
        doc.rect(10, 22, 190, 10, "F");
        doc.setTextColor(255, 255, 255);
        doc.text("Group 1 (ID 67xxxxx)", 15, 29);
        
        doc.setTextColor(0, 0, 0);
        doc.autoTable({
            startY: 35,
            head: [["Course Name", "Section", "Date", "Time", "Room", "Note"]],
            body: selectedCourses.map(course => [
                `${course.id} ${course.name}`,
                course.secId,
                course.day,
                course.time,
                course.room || "N/A",
                ""
            ]),
            theme: "grid",
            headStyles: {
                fillColor: [0, 53, 173], // header row
                textColor: [255, 255, 255],
                fontStyle: "bold",
            },
            styles: {
                cellPadding: 3,
                fontSize: 10,
                overflow: "linebreak",
            },
            columnStyles: {
                0: { cellWidth: 60 },  // Course Name
                1: { cellWidth: 20 },  // Section
                2: { cellWidth: 25 },  // Date
                3: { cellWidth: 30 },  // Time
                4: { cellWidth: 30 },  // Room
                5: { cellWidth: 25 },  // Note
            },
        });
        
        const pdfBlob = doc.output("bloburl");
        setPdfURL(pdfBlob);
        return doc;
    };

    const handleDownloadPDF = () => {
        const doc = generatePDF();
        doc.save("ClassSchedule.pdf");
    };

    const handleConfirm = () => {
        setShowModal(false);
        setConfirmed(true);
        generatePDF();
    };

    return (

        <div className="flex flex-col items-center w-full max-w-md mx-auto space-y-4">
            {confirmed && (
                <div className="p-4 w-full max-w-md mx-auto bg-white shadow-lg rounded-lg">
                    <div className="p-4 border rounded-lg bg-gray-200">
                        <h3 className="font-semibold">Registered Courses</h3>
                        <ul className="mt-2">
                            {selectedCourses.map(course => (
                                <li key={course.uniqueId} className="p-1">{course.id} {course.name} (Section {course.secId}, {course.day}, {course.time}, Room: {course.room})</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
            {confirmed && (
                <div className="p-4 w-full max-w-md mx-auto bg-white shadow-lg rounded-lg">
                    <div className="p-4 border rounded-lg bg-gray-200">
                        <h2 className="text-lg font-semibold mb-2">Class Schedule</h2>
                        <button className="bg-blue-500 text-white p-2 rounded" onClick={handleDownloadPDF}>Download PDF</button>
                        {pdfURL && (
                            <iframe src={pdfURL} className="w-full h-64 mt-2 border rounded"></iframe>
                        )}
                    </div>
                </div>
            )}
            <div className="p-4 w-full max-w-md mx-auto bg-white shadow-lg rounded-lg">
                <h2 className="text-lg font-semibold mb-4">Course Registration</h2>
                <div className="space-y-2">
                    {courses.map(course => (
                        <div key={course.id} className="p-2 border rounded-lg bg-gray-100">
                            <p className="font-medium">{course.id} {course.name}</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {course.sections.map((section, index) => (
                                    <button key={index} className="bg-blue-500 text-white p-1 rounded-lg flex items-center space-x-2" onClick={() => handleAddCourse(course, section)}>
                                        SEC: {section.secId}, {section.day} {section.time} <FaPlus className="ml-1" />
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
                                <span>{course.id} {course.name} (Section {course.secId}, {course.day} {course.time})</span>
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
        </div>
    );
};

export default CourseRegistration;
