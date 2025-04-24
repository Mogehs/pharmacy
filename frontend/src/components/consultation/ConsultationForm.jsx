import React, { useState } from 'react';
import AppointmentCalendar from './AppointmentCalendar';

export default function ConsultationForm() {
  const [formData, setFormData] = useState({
    guardianFirst: '',
    guardianLast: '',
    birthDate: '',
    address: '',
    email: '',
    phone: '',
    date: '',
    authorizations: [],
  });

  const options = [
    'Routine medical care & treatment',
    'Surgery',
    'Emergency medical care & treatment',
    'Hospitalization',
    'Blood transfusions',
    'Dental care & treatment',
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (option) => {
    setFormData((prev) => ({
      ...prev,
      authorizations: prev.authorizations.includes(option)
        ? prev.authorizations.filter((item) => item !== option)
        : [...prev.authorizations, option],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = ['guardianFirst', 'guardianLast', 'birthDate', 'address', 'email', 'phone', 'date'];
    const allTextFieldsFilled = requiredFields.every((key) => formData[key].trim() !== '');
    const hasAuthorizations = formData.authorizations.length > 0;

    if (!allTextFieldsFilled || !hasAuthorizations) {
      alert('Please fill all fields and select at least one authorization.');
      return;
    }

    console.log('Form submitted:', formData); // ✅ log here
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: Consultation Form */}
        <div className="w-full lg:w-2/3 bg-white shadow rounded p-6 space-y-8">
          <form onSubmit={handleSubmit}>
            <div>
              <label className="block font-bold mb-1 txt-gl">Patient's Name:</label>
              <div className="flex gap-4">
                <input
                  name="guardianFirst"
                  placeholder="First"
                  value={formData.guardianFirst}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                <input
                  name="guardianLast"
                  placeholder="Last"
                  value={formData.guardianLast}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold mb-1 txt-gl">Birth Date:</label>
              <input
                name="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-bold mb-1 txt-gl">Address:</label>
              <input
                name="address"
                placeholder="Street, City, State"
                value={formData.address}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold mb-1 txt-gl">Email Address:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-bold mb-1 txt-gl">Phone Number:</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold mb-2 txt-gl">Authorization applies to:</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {options.map((option, index) => (
                  <label
                    key={index}
                    className="flex items-center gap-2 border border-gray-300 rounded px-3 py-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.authorizations.includes(option)}
                      onChange={() => handleCheckbox(option)}
                    />
                    <span className="text-nowrap md:text-wrap text-sm">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-bold mb-1 txt-gl">Appointment Date:</label>
              <input
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <button
              type="submit"
              className="hover:bg-[#525052] bg-[#a8754d] text-white font-semibold px-6 py-2 rounded cursor-pointer mt-5"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Right: Appointment Calendar */}
        <div className="w-full lg:w-2/3 bg-white">
          <AppointmentCalendar/>
        </div>
      </div>
    </div>
  );
}
