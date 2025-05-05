import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

const CallToActionSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [focused, setFocused] = useState({
    name: false,
    email: false,
    phone: false,
    message: false,
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false,
    message: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (value.trim() !== "") {
      setErrors(prev => ({
        ...prev,
        [name]: false
      }));
    }
  };

  const handleFocus = (field) => {
    setFocused((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  const handleBlur = (field) => {
    setFocused((prev) => ({
      ...prev,
      [field]: formData[field].trim() !== "",
    }));
    
    // Validate on blur
    if (formData[field].trim() === "") {
      setErrors(prev => ({
        ...prev,
        [field]: true
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: formData.name.trim() === "",
      email: formData.email.trim() === "",
      phone: formData.phone.trim() === "",
      message: formData.message.trim() === "",
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields before submission
    if (validateForm()) {
      // Handle form submission logic here
      console.log("Form submitted:", formData);
    }
  };

  return (
    <section className="py-20">
      <div className="max-w-full mx-auto px-6 bg-gray-200">
        {/* Integrated Card */}
        <div className="flex flex-col lg:flex-row gap-8 p-10">
          {/* Left Column: Map */}
          <div className="flex-1 flex flex-col">
            <div className="mb-8 text-center">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Find Us</h2>
              <div className="flex items-center justify-center gap-2">
                <span className="w-8 h-0.5 bg-blue-600"></span>
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <span className="w-8 h-0.5 bg-blue-600"></span>
              </div>
            </div>
            <div className="relative w-full pb-[100%] overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7526979999997!2d32.5678!3d0.5678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMzQnMDQuMSJOIDMywrAzNCcwNC4xIkU!5e0!3m2!1sen!2sug!4v1234567890"
                className="absolute top-0 left-0 w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="flex-1 flex flex-col">
            <div className="mb-8 text-center">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h2>
              <div className="flex items-center justify-center gap-2">
                <span className="w-8 h-0.5 bg-blue-600"></span>
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <span className="w-8 h-0.5 bg-blue-600"></span>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="w-full">
              <div className="relative mb-6">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus("name")}
                  onBlur={() => handleBlur("name")}
                  className={`w-full px-2 py-3 bg-transparent border-b border-black outline-none transition-colors ${
                    focused.name || formData.name ? "border-blue-600" : ""
                  } ${errors.name ? "border-red-500" : ""}`}
                />
                <label
                  className={`absolute left-2 ${
                    focused.name || formData.name
                      ? "top-0 left-0 text-sm text-blue-600"
                      : "top-1/2 -translate-y-1/2"
                  } pointer-events-none transition-all duration-300 ${
                    errors.name ? "text-red-500" : "text-gray-900"
                  }`}
                >
                  Name
                </label>
                {errors.name && (
                  <span className="absolute left-0 bottom-[-20px] text-red-500 text-sm">
                    Name is required
                  </span>
                )}
              </div>

              <div className="relative mb-6">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus("email")}
                  onBlur={() => handleBlur("email")}
                  className={`w-full px-2 py-3 bg-transparent border-b border-black outline-none transition-colors ${
                    focused.email || formData.email ? "border-blue-600" : ""
                  } ${errors.email ? "border-red-500" : ""}`}
                />
                <label
                  className={`absolute left-2 ${
                    focused.email || formData.email
                      ? "top-0 left-0 text-sm text-blue-600"
                      : "top-1/2 -translate-y-1/2"
                  } pointer-events-none transition-all duration-300 ${
                    errors.email ? "text-red-500" : "text-gray-900"
                  }`}
                >
                  Email
                </label>
                {errors.email && (
                  <span className="absolute left-0 bottom-[-20px] text-red-500 text-sm">
                    Email is required
                  </span>
                )}
              </div>

              <div className="relative mb-6">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => handleFocus("phone")}
                  onBlur={() => handleBlur("phone")}
                  className={`w-full px-2 py-3 bg-transparent border-b border-black outline-none transition-colors ${
                    focused.phone || formData.phone ? "border-blue-600" : ""
                  } ${errors.phone ? "border-red-500" : ""}`}
                />
                <label
                  className={`absolute left-2 ${
                    focused.phone || formData.phone
                      ? "top-0 left-0 text-sm text-blue-600"
                      : "top-1/2 -translate-y-1/2"
                  } pointer-events-none transition-all duration-300 ${
                    errors.phone ? "text-red-500" : "text-gray-900"
                  }`}
                >
                  Phone
                </label>
                {errors.phone && (
                  <span className="absolute left-0 bottom-[-20px] text-red-500 text-sm">
                    Phone is required
                  </span>
                )}
              </div>

              <div className="relative mb-6">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => handleFocus("message")}
                  onBlur={() => handleBlur("message")}
                  className={`w-full px-2 py-3 bg-transparent border-b border-black outline-none transition-colors resize-none min-h-[120px] ${
                    focused.message || formData.message ? "border-blue-600" : ""
                  } ${errors.message ? "border-red-500" : ""}`}
                />
                <label
                  className={`absolute left-2 ${
                    focused.message || formData.message
                      ? "top-0 left-0 text-sm text-blue-600"
                      : "top-4"
                  } pointer-events-none transition-all duration-300 ${
                    errors.message ? "text-red-500" : "text-gray-900"
                  }`}
                >
                  Message
                </label>
                {errors.message && (
                  <span className="absolute left-0 bottom-[-20px] text-red-500 text-sm">
                    Message is required
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-blue-600 text-white rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 active:scale-95 transition-all"
              >
                <FaPaperPlane className="text-lg" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;