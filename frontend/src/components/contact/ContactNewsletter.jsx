import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

const ContactNewsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Page reload hone se rokta hai
    console.log("Subscribed email:", email);
  };

  return (
    <section
      className="bg-cover bg-center py-20 px-4"
      style={{ backgroundImage: "url('/about/row.jpg')" }}
    >
      <div className="max-w-3xl mx-auto text-center">
        {/* Main Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4 txt-gl">
          Join our newsletter
        </h2>

        {/* Subheading */}
        <p className="text-md mb-8 text-gray-500">
          Join over half a million vitamin lovers and get our latest deals,
          articles, and resources!
        </p>

        {/* Input with Button */}
        <form
          onSubmit={handleSubmit}
          className="flex bg-white rounded-full overflow-hidden max-w-md mx-auto"
        >
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-2 text-gray-500 outline-none"
            required
          />
          <button
            type="submit"
            className="hover:bg-[#525052] bg-[#a8754d] text-white px-4 md:px-6 flex items-center gap-2 transition cursor-pointer"
          >
            <FaPaperPlane />
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactNewsletter;
