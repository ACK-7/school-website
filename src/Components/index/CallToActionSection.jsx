import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CallToActionSection = () => {
  const navigate = useNavigate();

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

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (value.trim() !== "") {
      setErrors((prev) => ({
        ...prev,
        [name]: false,
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

    if (formData[field].trim() === "") {
      setErrors((prev) => ({
        ...prev,
        [field]: true,
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
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      axios
        .post("http://localhost/contact-backend/seeta.php", formData)
        .then((response) => {
          console.log("Response from backend:", response.data);

          // Only show success modal if message contains 'successfully'
          if (
            response.data.message &&
            response.data.message.toLowerCase().includes("successfully")
          ) {
            setFormData({
              name: "",
              email: "",
              phone: "",
              message: "",
            });
            setShowForm(false);
            setShowSuccessMessage(true);

            setTimeout(() => {
              setShowSuccessMessage(false);
              setShowForm(true);
              navigate("/");
            }, 3000);
          } else {
            // Handle partial success or failure messages
            alert(response.data.message || "An unexpected error occurred.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Failed to send message. Please try again.");
        });
    }
  };

  return (
    <section className="py-20">
      <div className="max-w-full mx-auto px-6 bg-gray-200">
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
                title="Google Map"
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

            <div className="relative min-h-[400px]">
              {showForm && (
                <form onSubmit={handleSubmit} className="w-full transition-opacity duration-500">
                  {["name", "email", "phone", "message"].map((field, index) => (
                    <div key={index} className="relative mb-6">
                      {field !== "message" ? (
                        <input
                          type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                          name={field}
                          value={formData[field]}
                          onChange={handleChange}
                          onFocus={() => handleFocus(field)}
                          onBlur={() => handleBlur(field)}
                          className={`w-full px-2 py-3 bg-transparent border-b border-black outline-none transition-colors ${
                            focused[field] || formData[field] ? "border-blue-600" : ""
                          } ${errors[field] ? "border-red-500" : ""}`}
                        />
                      ) : (
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
                      )}

                      <label
                        className={`absolute left-2 ${
                          focused[field] || formData[field]
                            ? "top-0 left-0 text-sm text-blue-600"
                            : field === "message"
                            ? "top-4"
                            : "top-1/2 -translate-y-1/2"
                        } pointer-events-none transition-all duration-300 ${
                          errors[field] ? "text-red-500" : "text-gray-900"
                        }`}
                      >
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>

                      {errors[field] && (
                        <span className="absolute left-0 bottom-[-20px] text-red-500 text-sm">
                          {`${field.charAt(0).toUpperCase() + field.slice(1)} is required`}
                        </span>
                      )}
                    </div>
                  ))}

                  <button
                    type="submit"
                    className="w-full py-4 bg-blue-600 text-white rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 active:scale-95 transition-all"
                  >
                    <FaPaperPlane className="text-lg" />
                    Send Message
                  </button>
                </form>
              )}

              {showSuccessMessage && (
                <div className="absolute inset-0 flex items-center justify-center bg-white rounded-lg shadow-lg transform transition-all duration-500 ease-in-out">
                  <div className="text-center p-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h3>
                    <p className="text-gray-600">Your message has been sent successfully.</p>
                    <p className="text-gray-600">We'll get back to you soon.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
