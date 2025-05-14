import React from "react";
import { useGetMyAppointmentsQuery } from "../features/appointmentApi";

const statusColors = {
  Scheduled: "bg-blue-100 text-blue-800",
  Completed: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-800",
};

const Appointments = () => {
  const {
    data: appointments = [],
    isLoading,
    isError,
  } = useGetMyAppointmentsQuery();

  if (isLoading) {
    return (
      <div className="text-center py-16 text-lg font-semibold text-gray-600 animate-pulse">
        Loading your appointments...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-16 text-lg font-semibold text-red-600">
        Unable to load appointments. Please try again later.
      </div>
    );
  }

  const hasAppointments = appointments.length > 0;

  if (!hasAppointments) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-20 h-20 text-gray-300 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 7V3m8 4V3m-9 8h10m-13 8h16a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        <h3 className="text-2xl font-bold text-gray-700 mb-2">
          No Appointments Yet
        </h3>
        <p className="text-gray-500 max-w-sm">
          Your scheduled appointments will appear here once booked.
        </p>
      </div>
    );
  }

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
              <th className="p-3">Phone</th>
              <th className="p-3">Date</th>
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
                  {appt.guardianFirst || "N/A"}
                </td>
                <td className="p-3 text-gray-600">{appt.phone || "N/A"}</td>
                <td className="p-3 text-gray-600">
                  {appt.date ? appt.date.split("T")[0] : "N/A"}
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      statusColors[appt.status] || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {appt.status || "Pending"}
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
