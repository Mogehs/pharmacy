const ViewStudentDocuments = ({ student, onClose }) => (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-xl w-[90%] md:w-[500px] max-h-[80vh] overflow-auto">
            <h2 className="text-lg font-bold mb-4">📂 Documents of {student.name}</h2>
            {student.documents.length ? (
                <ul className="list-disc ml-5 space-y-2">
                    {student.documents.map((doc, index) => (
                        <li key={index}>
                            <a
                                href={doc.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline"
                            >
                                {doc.name}
                            </a>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500 italic">No documents uploaded.</p>
            )}
            <button
                className="mt-4 px-4 py-2 bg-gray-700 text-white rounded-full"
                onClick={onClose}
            >
                Close
            </button>
        </div>
    </div>
);

export default ViewStudentDocuments;
