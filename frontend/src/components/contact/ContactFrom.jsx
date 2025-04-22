import { useState } from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter} from "react-icons/fa";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { SiAmazonsimpleemailservice } from "react-icons/si";
import { RiMapPinLine } from "react-icons/ri";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const contactInfo = [
    {
      icon: <MdOutlinePhoneInTalk className="text-2xl text-[#4ABCE9]" />,
      title: "986-456-6782",
      desc: "Calls from mobile and landlines within USA are free"
    },
    {
      icon: <SiAmazonsimpleemailservice className="text-2xl text-[#4ABCE9]" />,
      title: "Email",
      desc: "propharm@email.com"
    },
    {
      icon: <RiMapPinLine className="text-2xl text-[#4ABCE9]" />,
      title: "New York",
      desc: "70 Washington Square South, NY 10012, United States"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 grid md:grid-cols-2 gap-10">

      {/* Contact Info */}
      <div>
        <h2 className="text-2xl text-[#184363] font-bold mb-4">Contact Us</h2>
        <p className="text-gray-500 mb-6">
          Multi-line telephone hotline daily<br />08:00am – 09:00pm
        </p>

        {/* Map Contact Info */}
        {contactInfo.map((item, index) => (
          <div key={index} className="mb-4">
            <div className="flex items-center space-x-2 font-semibold text-lg mb-1">
              {item.icon}
              <span className="text-[#184363] font-bold text-xl">{item.title}</span>
            </div>
            <p className="text-gray-500">{item.desc}</p>
          </div>
        ))}

        <div className="mt-4">
          <iframe
            className="w-full h-52 rounded-md shadow"
            src="https://maps.google.com/maps?q=Storey%20Ave&t=&z=13&ie=UTF8&iwloc=&output=embed"
            loading="lazy"
          />
        </div>
      </div>

      {/* Message Form */}
      <div>
        <h2 className="text-2xl text-[#184363] font-bold mb-4">Message</h2>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
          <p className="text-sm text-gray-600">
            Got any problems with purchase? Wanna ask for a piece of advice or leave a suggestion?
            Don’t hesitate and write to our Email!!
          </p>
          <div className="flex space-x-4 text-gray-600 md:ml-4">
            <div className="bg-gray-100 p-2 rounded-md hover:text-blue-600 cursor-pointer">
              <FaFacebookF />
            </div>
            <div className="bg-gray-100 p-2 rounded-md hover:text-pink-500 cursor-pointer">
              <FaInstagram />
            </div>
            <div className="bg-gray-100 p-2 rounded-md hover:text-blue-700 cursor-pointer">
              <FaLinkedinIn />
            </div>
            <div className="bg-gray-100 p-2 rounded-md hover:text-red-600 cursor-pointer">
              <FaTwitter />
            </div>
          </div>

        </div>


        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-100 focus:outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-100 focus:outline-none"
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-100 focus:outline-none"
          />
          <textarea
            name="message"
            placeholder="Your message (optional)"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 rounded bg-gray-100 focus:outline-none"
          />

          <button type="submit" className="bg-orange-400 hover:bg-orange-500 text-white font-semibold px-6 py-2 rounded cursor-pointer">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
