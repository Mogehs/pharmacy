import React, { useState } from 'react';

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

    if (allTextFieldsFilled && hasAuthorizations) {
      console.log('Form Data:', formData);
    } else {
      alert('Please fill in all fields and select at least one authorization.');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-6">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 space-y-6 bg-white shadow rounded">
        {/* Guardian Name */}
        <div>
          <label className="block font-semibold mb-1">Patient's Name:</label>
          <div className="flex gap-4">
            <input
              name="guardianFirst"
              placeholder="First"
              value={formData.guardianFirst}
              onChange={handleChange}
              className="w-full border border-pink-300 rounded px-3 py-2"
            />
            <input
              name="guardianLast"
              placeholder="Last"
              value={formData.guardianLast}
              onChange={handleChange}
              className="w-full border border-pink-300 rounded px-3 py-2"
            />
          </div>
        </div>

        {/* Birth Date */}
        <div>
          <label className="block font-semibold mb-1">Birth Date:</label>
          <input
            name="birthDate"
            type="date"
            value={formData.birthDate}
            onChange={handleChange}
            className="w-full border border-pink-300 rounded px-3 py-2"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block font-semibold mb-1">Address:</label>
          <input
            name="address"
            placeholder="Street, City, State"
            value={formData.address}
            onChange={handleChange}
            className="w-full border border-pink-300 rounded px-3 py-2"
          />
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Email Address:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-pink-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Phone Number:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-pink-300 rounded px-3 py-2"
            />
          </div>
        </div>

       

        {/* Date Signed */}
        <div>
          <label className="block font-semibold mb-1">Date Signed:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border border-pink-300 rounded px-3 py-2"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
