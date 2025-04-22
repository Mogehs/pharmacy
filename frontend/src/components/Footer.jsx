import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn
  } from 'react-icons/fa';
  
  const Footer = () => {
    return (
      <footer className="bg-[#525052] text-white pt-12 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    src="./logo.jpg"
                    alt="Logo"
                    className="h-12 w-12 rounded-full object-cover"
                  />
                </div>
                <span className="ml-2 text-xl font-bold  text-[#eac577]">Pharmacy</span>
              </div>
              <p className="text-white">
                Building innovative solutions for the modern world.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-blue-600 text-[#eac577] transition" aria-label="Facebook">
                  <FaFacebookF className="h-6 w-6" />
                </a>
                <a href="#" className="hover:text-pink-500 text-[#eac577] transition" aria-label="Instagram">
                  <FaInstagram className="h-6 w-6" />
                </a>
                <a href="#" className="hover:text-blue-700  text-[#eac577] transition" aria-label="LinkedIn">
                  <FaLinkedinIn className="h-6 w-6" />
                </a>
                <a href="#" className="hover:text-red-600 text-[#eac577] transition" aria-label="Twitter">
                  <FaTwitter className="h-6 w-6" />
                </a>
              </div>
            </div>
  
            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#eac577]">Quick Links</h3>
              <ul className="space-y-2">
                {["Home", "Product", "Blogs", "About", "Contact"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-white transition">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
  
            {/* Services */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold  text-[#eac577]">Services</h3>
              <ul className="space-y-2">
                {["Medicine", "Appointment", "Courses", "Consultation", "Other/Admission"].map((service) => (
                  <li key={service}>
                    <a href="#" className="text-white transition">
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
  
            {/* Contact */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold  text-[#eac577]">Contact Us</h3>
              <address className="not-italic text-gray-500">
                <p className="text-white transition cursor-pointer">123 Business Ave</p>
                <p className="text-white transition cursor-pointer">San Francisco, CA 94107</p>
                <p className="mt-2">
                  <span className='text-[#eac577]'>Email:{' '}</span>
                  <a
                    href="mailto:info@company.com"
                    className="text-white transition"
                  >
                    info@company.com
                  </a>
                </p>
                <p>
                  <span className='text-[#eac577]'>Phone:{' '}</span>
                  <a
                    href="tel:+11234567890"
                    className="text-white transition"
                  >
                    +1 (123) 456-7890
                  </a>
                </p>
              </address>
            </div>
          </div>
  
          {/* Bottom Bar */}
          <div className="border-t border-[#a8754d] pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white text-lg mb-4 md:mb-0 cursor-pointer">
              © 2025 Pharmacy. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {["Privacy Policy", "Terms of Service"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-white text-lg transition cursor-pointer"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  