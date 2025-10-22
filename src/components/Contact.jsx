import React, { useState } from "react";
import gsap from "gsap";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formUrl =
      "https://docs.google.com/forms/u/0/d/e/1FAIpQLSftw7P_ild-3-c19okrRbh-9QvH2qQ-cs1I6HrGg6ntaZpHvA/formResponse";

    const formDataObj = new FormData();
    formDataObj.append("entry.1517145714", formData.name);
    formDataObj.append("entry.1086677732", formData.email);
    formDataObj.append("entry.134096323", formData.message);

    try {
      await fetch(formUrl, {
        method: "POST",
        mode: "no-cors", // required for Google Forms
        body: formDataObj,
      });

      // Clear fields
      setFormData({ name: "", email: "", message: "" });

      // Show success animation
      setSubmitted(true);
      gsap.fromTo(
        ".success-msg",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );

      // Hide message after 3 seconds
      setTimeout(() => {
        gsap.to(".success-msg", {
          opacity: 0,
          y: -20,
          duration: 0.6,
          onComplete: () => setSubmitted(false),
        });
      }, 3000);
    } catch (err) {
      console.error("Error!", err.message);
    }
  };

  return (
    <section id="contact" className="bg-black text-white py-20 px-6 md:px-20">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <h2 className="text-center text-2xl md:text-3xl text-main tracking-wide mb-12">
          Get a Consultation
        </h2>

        {/* Success Message */}
        {submitted && (
          <div className="success-msg text-center text-green-400 font-semibold mb-6">
            ✅ Your message has been sent successfully!
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block mb-2 text-gray-400">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-gray-600 focus:outline-none focus:border-main p-2 transition-colors duration-300"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-400">E-mail</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-gray-600 focus:outline-none focus:border-main p-2 transition-colors duration-300"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-gray-400">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className="w-full bg-transparent border-b border-gray-600 focus:outline-none focus:border-main p-2 transition-colors duration-300 resize-none"
              required
            ></textarea>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-8 py-3 border border-main text-main hover:bg-main hover:text-black transition-all duration-300 rounded font-semibold uppercase tracking-wide hover:scale-105 transform"
            >
              SEND MESSAGE
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
