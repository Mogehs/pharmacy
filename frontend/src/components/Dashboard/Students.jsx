import React, { useState } from "react";
import { motion } from "framer-motion";
import DeleteStudentConfirmation from "./DeleteStudentConfirmation";
import ViewStudentDocuments from "./ViewStudentDocuments";

const sampleStudents = [
    {
        id: "S001",
        name: "Ravi Sharma",
        email: "ravi@example.com",
        course: "Pharmacy",
        documents: [
            { name: "Aadhar Card", url: "/uploads/ravi_aadhar.pdf" },
            { name: "Marksheet", url: "/uploads/ravi_marksheet.pdf" },
        ],
    },
    {
        id: "S002",
        name: "Neha Singh",
        email: "neha@example.com",
        course: "B.Sc Nursing",
        documents: [],
    },
];

const Students = () => {
    const [students, setStudents] = useState(sampleStudents);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [viewingDocs, setViewingDocs] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const handleDeleteStudent = (id) => {
        setStudents((prev) => prev.filter((student) => student.id !== id));
        setIsDeleting(false);
    };

    const filteredStudents = students.filter((student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <motion.div
            className="bg-white rounded-xl shadow-xl p-6 mt-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >

            <h3 className="text-[18px] md:text-2xl font-bold mb-6 text-[#00B8A9] tracking-wide">
                🎓 Students Management
            </h3>

            <div className="mb-6">
                <input
                    type="text"
                    placeholder="🔍 Search by student name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                />
            </div>

            <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100 uppercase text-gray-700">
                        <tr>
                            <th className="p-3">ID</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Course</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.length > 0 ? (
                            filteredStudents.map((student) => (
                                <tr key={student.id} className="hover:bg-gray-50">
                                    <td className="p-3 text-nowrap">{student.id}</td>
                                    <td className="p-3 text-nowrap">{student.name}</td>
                                    <td className="p-3 text-nowrap">{student.email}</td>
                                    <td className="p-3 text-nowrap">{student.course}</td>
                                    <td className="p-3 flex gap-2 justify-center">
                                        <button
                                            className="bg-[#00B8A9] hover:bg-[#009688] text-white px-3 py-1 rounded-full text-nowrap"
                                            onClick={() => {
                                                setSelectedStudent(student);
                                                setViewingDocs(true);
                                            }}
                                        >
                                            View Docs
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-3 py-1 rounded-full"
                                            onClick={() => {
                                                setSelectedStudent(student);
                                                setIsDeleting(true);
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )
                            : (
                                <tr>
                                    <td colSpan="6" className="text-center py-6 text-gray-400 italic">
                                        No record found.
                                    </td>
                                </tr>
                            )}
                    </tbody>
                </table>
            </div >

            {isDeleting && selectedStudent && (
                <DeleteStudentConfirmation
                    student={selectedStudent}
                    onClose={() => setIsDeleting(false)}
                    onDelete={() => handleDeleteStudent(selectedStudent.id)}
                />
            )}

            {
                viewingDocs && selectedStudent && (
                    <ViewStudentDocuments
                        student={selectedStudent}
                        onClose={() => setViewingDocs(false)}
                    />
                )
            }
        </motion.div >
    );
};

export default Students;
