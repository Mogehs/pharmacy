import React, { useState } from "react";

export default function AdmissionForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    address: "",
    program: "",
    cnic: null,
    transcript: null,
    photo: null,
    matricDegree: null,
    interDegree: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Application submitted!");
  
    // Reset form
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      dob: "",
      address: "",
      program: "",
      cnic: null,
      transcript: null,
      photo: null,
      matricDegree: null,
      interDegree: null,
    });
  
    // Optionally, reset file input values if needed manually (uncontrolled refs could be used here too)
    document.querySelectorAll('input[type="file"]').forEach(input => (input.value = ""));
  };
  

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto bg-white shadow-lg p-8 rounded-xl space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800">University Admission Form</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="mt-1 w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="mt-1 w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
            className="mt-1 w-full border border-gray-300 rounded-md p-2 cursor-pointer"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            rows="3"
            className="mt-1 w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Program Applied For</label>
          <select
            name="program"
            value={formData.program}
            onChange={handleChange}
            required
            className="mt-1 w-full border border-gray-300 rounded-md p-2 cursor-pointer"
          >
            <option value="">Select Program</option>
            <option value="BPharm">Bachelor of Pharmacy</option>
            <option value="DPharm">Doctor of Pharmacy</option>
            <option value="MBBS">MBBS</option>
            <option value="BDS">BDS</option>
            <option value="BS Chemistry">BS Chemistry</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Upload CNIC</label>
          <input
            type="file"
            name="cnic"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={handleChange}
            required
            className="mt-1 w-full border border-gray-300 rounded-md p-1 cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Academic Transcript</label>
          <input
            type="file"
            name="transcript"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={handleChange}
            required
            className="mt-1 w-full  border border-gray-300 rounded-md p-1 cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Passport Photo</label>
          <input
            type="file"
            name="photo"
            accept=".jpg,.jpeg,.png"
            onChange={handleChange}
            required
            className="mt-1 w-full  border border-gray-300 rounded-md p-1 cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Matric Certificate</label>
          <input
            type="file"
            name="matricDegree"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleChange}
            required
            className="mt-1 w-full  border border-gray-300 rounded-md p-1 cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Inter Certificate</label>
          <input
            type="file"
            name="interDegree"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleChange}
            required
            className="mt-1 w-full  border border-gray-300 rounded-md p-1 cursor-pointer"
          />
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
      >
        Submit Application
      </button>
    </form>
  );
}