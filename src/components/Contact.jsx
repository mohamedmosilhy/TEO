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
          className="space-y-8"
        >
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block mb-2 text-gray-400">Full Name</label>
              <input
                type="text"
                name="entry.123456789" // replace with your Google Form field ID
                className="w-full bg-transparent border-b border-gray-600 focus:outline-none focus:border-main p-2"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-400">E-mail</label>
              <input
                type="email"
                name="entry.987654321" // replace with your Google Form field ID
                className="w-full bg-transparent border-b border-gray-600 focus:outline-none focus:border-main p-2"
                required
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block mb-2 text-gray-400">Message</label>
            <textarea
              name="entry.1122334455" // replace with your Google Form field ID
              rows="5"
              className="w-full bg-transparent border-b border-gray-600 focus:outline-none focus:border-main p-2"
              required
            ></textarea>
          </div>

          {/* Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-8 py-3 border border-main text-main hover:bg-main hover:text-black transition rounded"
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
