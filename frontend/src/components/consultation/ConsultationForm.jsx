import React, { useState } from "react";
import AppointmentCalendar from "./AppointmentCalendar";
import { useCreateAppointmentMutation } from "../features/AppointmentApi";
import { toast } from "react-toastify";

export default function ConsultationForm() {
  const [createAppointment, { isLoading }] = useCreateAppointmentMutation();

  const [formData, setFormData] = useState({
    guardianFirst: "",
    guardianLast: "",
    birthDate: "",
    address: "",
    email: "",
    phone: "",
    date: "",
    authorizations: [],
  });

  const options = [
    "Routine medical care & treatment",
    "Surgery",
    "Emergency medical care & treatment",
    "Hospitalization",
    "Blood transfusions",
    "Dental care & treatment",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (option) => {
    setFormData((prev) => ({
      ...prev,
      authorizations: prev.authorizations.includes(option)
        ? prev.authorizations.filter((item) => item !== option)
        : [...prev.authorizations, option],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "guardianFirst",
      "guardianLast",
      "birthDate",
      "address",
      "email",
      "phone",
      "date",
    ];
    const allFieldsFilled = requiredFields.every(
      (key) => formData[key].trim() !== ""
    );
    const hasAuthorizations = formData.authorizations.length > 0;

    if (!allFieldsFilled || !hasAuthorizations) {
      toast.warn(
        "Please fill all fields and select at least one authorization."
      );
      return;
    }

    try {
      const res = await createAppointment(formData).unwrap();
      setFormData({
        guardianFirst: "",
        guardianLast: "",
        birthDate: "",
        address: "",
        email: "",
        phone: "",
        date: "",
        authorizations: [],
      });
      if (res.success) {
        toast.success(res.message);
      }
    } catch (error) {
      console.error("Failed to submit appointment:", error);
      toast.error(error?.data?.message || "Something went wrong.");
    }
  };

  const calculateAge = (birthDate) => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  };

  return (
    <div className="min-h-fit bg-gray-100 lg:p-6 md:p-4 p-1">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-2/3 bg-white shadow rounded p-6 space-y-8">
          <form onSubmit={handleSubmit}>
            {/* Guardian Name */}
            <div>
              <label className="block font-bold mb-1 text-[#00B8A9]">
                Patient's Name:
              </label>
              <div className="flex gap-4">
                <input
                  name="guardianFirst"
                  placeholder="First"
                  value={formData.guardianFirst}
                  onChange={handleChange}
                  className="w-full border border-[#00B8A9] rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#009688]"
                />
                <input
                  name="guardianLast"
                  placeholder="Last"
                  value={formData.guardianLast}
                  onChange={handleChange}
                  className="w-full border border-[#00B8A9] rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#009688]"
                />
              </div>
            </div>

            {/* Birth Date and Age */}
            <div>
              <label className="block font-bold mb-1 text-[#00B8A9]">
                Birth Date:
              </label>
              <input
                name="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={handleChange}
                className="w-full border border-[#00B8A9] rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#009688]"
              />
            </div>
            <div>
              <label className="block font-bold mb-1 text-[#00B8A9]">
                Age:
              </label>
              <input
                type="text"
                readOnly
                value={
                  formData.birthDate ? calculateAge(formData.birthDate) : ""
                }
                className="w-full border border-[#00B8A9] rounded px-3 py-2 bg-gray-100 focus:outline-none"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block font-bold mb-1 text-[#00B8A9]">
                Address:
              </label>
              <input
                name="address"
                placeholder="Street, City, State"
                value={formData.address}
                onChange={handleChange}
                className="w-full border border-[#00B8A9] rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#009688]"
              />
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold mb-1 text-[#00B8A9]">
                  Email Address:
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-[#00B8A9] rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#009688]"
                />
              </div>
              <div>
                <label className="block font-bold mb-1 text-[#00B8A9]">
                  Phone Number:
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-[#00B8A9] rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#009688]"
                />
              </div>
            </div>

            {/* Authorization Checkboxes */}
            <div>
              <label className="block font-bold mb-2 text-[#00B8A9]">
                Authorization applies to:
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {options.map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-2 border border-[#00B8A9] rounded px-3 py-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.authorizations.includes(option)}
                      onChange={() => handleCheckbox(option)}
                    />
                    <span className="text-sm">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Appointment Date */}
            <div>
              <label className="block font-bold mb-1 text-[#00B8A9]">
                Appointment Date:
              </label>
              <input
                name="date"
                type="text"
                disabled
                value={formData.date}
                onChange={handleChange}
                className="w-full border border-[#00B8A9] rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#009688]"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="hover:bg-[#009688] bg-[#00B8A9] text-white font-semibold px-6 py-2 rounded cursor-pointer mt-5 transition-all duration-600 ease-in-out disabled:opacity-50"
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>

        <div className="h-fit w-full lg:w-1/3">
          <div className="">
            <AppointmentCalendar
              selectedDate={formData.date}
              onDateSelect={(selectedDate) =>
                setFormData((prev) => ({ ...prev, date: selectedDate }))
              }
            />
          </div>
          <div className="text-center mt-10 text-red-700 font-semibold">
            <p className="text-sm sm:text-base">
              <strong>Note:</strong> Clinic hours are from{" "}
              <span className="font-bold">8:00 AM to 8:00 PM</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
