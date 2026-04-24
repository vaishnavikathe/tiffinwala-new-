import React from 'react'

import Footer from "../../components/layout/Footer";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">

      {/* Content */}
      <div className="flex-grow">
        <div className="section">
          <div className="container-custom max-w-4xl text-center">

            <h1 className="heading">
              Contact Us
            </h1>

            <p className="subheading">
              We'd love to hear from you
            </p>

            {/* Info */}
            <div className="mt-10 space-y-6 text-center text-gray-700 leading-relaxed text-left">
                
              <p>
                Have questions, feedback, or need support? Our team is here to help you.
              </p>

              <p>
                Whether you're a user looking for meal plans or a vendor wanting to join,
                feel free to reach out anytime.
              </p>

            </div>

            {/* Contact Cards */}
            <div className="mt-12 grid md:grid-cols-3 gap-6">

              <div className="card text-center">
                <h3 className="font-semibold text-lg">📧 Email</h3>
                <p className="text-gray-600 mt-2 text-sm">
                  support@tiffinwala.com
                </p>
              </div>

              <div className="card text-center">
                <h3 className="font-semibold text-lg">📞 Phone</h3>
                <p className="text-gray-600 mt-2 text-sm">
                  +91 95183 27730
                </p>
              </div>

              <div className="card text-center">
                <h3 className="font-semibold text-lg">📍 Address</h3>
                <p className="text-gray-600 mt-2 text-sm">
                  Nashik, Maharashtra, India
                </p>
              </div>

            </div>

            {/* Contact Form */}
            <div className="mt-12 form-card text-left">

              <h3 className="font-semibold text-lg mb-4">
                Get in Touch
              </h3>

              <form className="space-y-4">

                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-3 border rounded"
                />

                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-3 border rounded"
                />

                <textarea
                  rows="4"
                  placeholder="Your Message"
                  className="w-full p-3 border rounded"
                />

                <button className="btn-primary w-full">
                  Send a Message
                </button>

              </form>
            </div>

          </div>
        </div>
      </div>

      

    </div>
  );
};

export default Contact;