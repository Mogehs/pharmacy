import React from "react";

const Appointments = () => {
  // Example dummy data — replace with actual API data
  const appointments = [
    {
      _id: "1",
      patientName: "John Doe",
      doctorName: "Dr. Smith",
      date: "2025-05-14",
      time: "10:30 AM",
      status: "Scheduled",
    },
    {
      _id: "2",
      patientName: "Jane Roe",
      doctorName: "Dr. Khan",
      date: "2025-05-16",
      time: "2:00 PM",
      status: "Completed",
    },
    {
      _id: "3",
      patientName: "Emily White",
      doctorName: "Dr. Patel",
      date: "2025-05-17",
      time: "11:00 AM",
      status: "Cancelled",
    },
  ];

  const statusColors = {
    Scheduled: "bg-blue-100 text-blue-800",
    Completed: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-fit">
      <h2 className="text-3xl font-bold mb-6 text-green-700 text-center">
        Your Appointments
      </h2>
      <div className="overflow-x-auto rounded-lg shadow bg-white">
        <table className="min-w-full border border-gray-200 text-sm sm:text-base">
          <thead>
            <tr className="bg-green-600 text-white text-center">
              <th className="p-3">Patient Name</th>
              <th className="p-3">Doctor</th>
              <th className="p-3">Date</th>
              <th className="p-3">Time</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr
                key={appt._id}
                className="border-t border-gray-200 text-center hover:bg-green-50 transition"
              >
                <td className="p-3 font-medium text-gray-700">
                  {appt.patientName}
                </td>
                <td className="p-3 text-gray-600">{appt.doctorName}</td>
                <td className="p-3 text-gray-600">{appt.date}</td>
                <td className="p-3 text-gray-600">{appt.time}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      statusColors[appt.status] || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {appt.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointments;
