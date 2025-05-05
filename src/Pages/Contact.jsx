import React from "react";
import Navbar1 from "../Components/Navbar1";
import Footer from "../Components/Footer";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar1 />
      <main className="section">
        <div className="container">
          <h1 className="section-title">Contact Us</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card">
              <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
              <p className="mb-6">
                We'd love to hear from you. Please fill out the form below and
                we'll get back to you as soon as possible.
              </p>
              {/* Add your contact form here */}
            </div>
            <div className="card">
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <p>
                  <strong>Address:</strong> Seeta High School, Mukono District
                </p>
                <p>
                  <strong>Phone:</strong> +256 123 456 789
                </p>
                <p>
                  <strong>Email:</strong> info@seetahighschool.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
