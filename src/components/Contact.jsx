import React from "react";

const Contact = () => {
  return (
    <section id="contact" className="bg-black text-white py-20 px-6 md:px-20">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <h2 className="text-center text-3xl md:text-4xl text-main tracking-wide mb-12">
          FEEL FREE TO CONTACT US
        </h2>

        {/* Form */}
        <form
          action="https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse"
          method="POST"
          target="_blank"
          className="space-y-8 max-w-2xl mx-auto"
        >
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block mb-2 text-gray-400">Full Name</label>
              <input
                type="text"
                name="entry.123456789"
                className="w-full bg-transparent border-b border-gray-600 focus:outline-none focus:border-main p-2 transition-colors duration-300"
                required
                aria-label="Full Name"
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-400">E-mail</label>
              <input
                type="email"
                name="entry.987654321"
                className="w-full bg-transparent border-b border-gray-600 focus:outline-none focus:border-main p-2 transition-colors duration-300"
                required
                aria-label="Email Address"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block mb-2 text-gray-400">Message</label>
            <textarea
              name="entry.1122334455"
              rows="5"
              className="w-full bg-transparent border-b border-gray-600 focus:outline-none focus:border-main p-2 transition-colors duration-300 resize-none"
              required
              aria-label="Message"
              placeholder="Tell us about your project..."
            ></textarea>
          </div>

          {/* Button */}
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
