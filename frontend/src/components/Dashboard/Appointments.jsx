import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  useGetAllAppointmentsQuery,
  useUpdateAppointmentMutation,
} from "../features/appointmentApi";

const Appointments = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: appointments = [],
    isLoading,
    isError,
  } = useGetAllAppointmentsQuery();
  const [updateAppointment] = useUpdateAppointmentMutation();

  console.log(appointments);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await updateAppointment({
        id,
        updatedData: { status: newStatus },
      }).unwrap();
    } catch (error) {
      console.error("Failed to update appointment status:", error);
    }
  };

  const filteredAppointments = appointments.filter((appt) =>
    appt?.guardianFirst?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading appointments...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-center text-red-500">
        Failed to load appointments.
      </div>
    );
  }

  return (
    <motion.div
      className="bg-white rounded-xl shadow-xl p-6 mt-6 w-[75vw]"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="text-[18px] md:text-2xl font-bold mb-6 text-[#00B8A9] tracking-wide">
        Appointments Management
      </h3>

      <div className="mb-6">
        <input
          type="text"
          placeholder="🔍 Search by patient name..."
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
              <th className="p-3">Birth Date</th>
              <th className="p-3">Date</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appt) => (
                <tr key={appt._id} className="hover:bg-gray-50">
                  <td className="p-3 text-nowrap">{appt._id}</td>
                  <td className="p-3 text-nowrap">{appt.guardianFirst}</td>
                  <td className="p-3 text-nowrap">{appt.email}</td>
                  <td className="p-3 text-nowrap">
                    {appt.birthDate.split("T")[0]}
                  </td>
                  <td className="p-3 text-nowrap">{appt.date.split("T")[0]}</td>
                  <td className="p-3 text-nowrap">{appt.phone}</td>
                  <td className="p-3 font-semibold text-nowrap">
                    {appt.status}
                  </td>
                  <td className="p-3 flex gap-2 justify-center">
                    {appt.status === "Scheduled" && (
                      <>
                        <button
                          className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded-full"
                          onClick={() =>
                            handleStatusUpdate(appt._id, "Completed")
                          }
                        >
                          Mark Completed
                        </button>
                        <button
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-full"
                          onClick={() =>
                            handleStatusUpdate(appt._id, "Cancelled")
                          }
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="text-center py-6 text-gray-400 italic"
                >
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default Appointments;
