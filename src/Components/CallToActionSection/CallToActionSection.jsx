import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import styles from "./CallToActionSection.module.css";

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
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Integrated Card */}
        <div className={styles.integratedCard}>
          {/* Left Column: Map */}
          <div className={styles.leftColumn}>
            <div className={styles.heading}>
              <h2 className={styles.title}>Find Us</h2>
              <div className={styles.divider}>
                <span className={styles.line}></span>
                <span className={styles.dot}></span>
                <span className={styles.line}></span>
              </div>
            </div>
            <div className={styles.mapContainer}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15958.976676378918!2d32.753757834434495!3d0.3493180091978375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dc7984655d373%3A0x8b657cd3fe160fe3!2sSeeta%20High%20School%20A&#39;Level!5e0!3m2!1sen!2sug!4v1731567122017!5m2!1sen!2sug"
                className={styles.map}
                allowFullScreen=""
                loading="lazy"
                title="Location Map"
              ></iframe>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className={styles.rightColumn}>
            <div className={styles.heading}>
              <h2 className={styles.title}>Get In Touch</h2>
              <div className={styles.divider}>
                <span className={styles.line}></span>
                <span className={styles.dot}></span>
                <span className={styles.line}></span>
              </div>
            </div>
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  className={`${styles.input} ${focused.name ? styles.filled : ""} ${errors.name ? styles.error : ""}`}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus("name")}
                  onBlur={() => handleBlur("name")}
                  required
                />
                <label className={`${styles.label} ${focused.name ? styles.active : ""} ${errors.name ? styles.errorLabel : ""}`}>
                  Your Name
                </label>
                {errors.name && <span className={styles.errorMessage}>This field is required</span>}
                
              </div>

              <div className={styles.inputGroup}>
                <input
                  type="email"
                  className={`${styles.input} ${focused.email ? styles.filled : ""} ${errors.email ? styles.error : ""}`}
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus("email")}
                  onBlur={() => handleBlur("email")}
                  required
                />
                <label className={`${styles.label} ${focused.email ? styles.active : ""} ${errors.email ? styles.errorLabel : ""}`}>
                  Your Email
                </label>
                {errors.email && <span className={styles.errorMessage}>This field is required</span>}
                
              </div>

              <div className={styles.inputGroup}>
                <input
                  type="tel"
                  className={`${styles.input} ${focused.phone ? styles.filled : ""} ${errors.phone ? styles.error : ""}`}
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => handleFocus("phone")}
                  onBlur={() => handleBlur("phone")}
                  required
                />
                <label className={`${styles.label} ${focused.phone ? styles.active : ""} ${errors.phone ? styles.errorLabel : ""}`}>
                  Your Phone
                </label>
                {errors.phone && <span className={styles.errorMessage}>This field is required</span>}
                
              </div>

              <div className={styles.inputGroup}>
                <textarea
                  className={`${styles.textarea} ${focused.message ? styles.filled : ""} ${errors.message ? styles.error : ""}`}
                  rows="5"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => handleFocus("message")}
                  onBlur={() => handleBlur("message")}
                  required
                ></textarea>
                <label className={`${styles.textareaLabel} ${focused.message ? styles.active : ""} ${errors.message ? styles.errorLabel : ""}`}>
                  Your Message
                </label>
                {errors.message && <span className={styles.errorMessage}>This field is required</span>}
              </div>

              <button type="submit" className={styles.button}>
                <span>Send Message</span>
                <FaPaperPlane className={styles.icon} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;