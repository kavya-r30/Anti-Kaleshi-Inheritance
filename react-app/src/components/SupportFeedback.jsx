import React from 'react';

function SupportFeedback() {
  return (
    <div className="p-6 bg-purple-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Support & Feedback</h2>
      <p className="mb-4">If you need support or have any feedback, here's how you can get in touch:</p>

      <h3 className="text-xl font-bold mb-2">1. Contact Support</h3>
      <p className="mb-4">Our support team is available to help you with any issues or questions you may have.</p>
      <ul className="list-disc list-inside mb-4">
        <li>Email us at <a href="mailto:support@example.com" className="text-purple-600 hover:text-purple-800">support@example.com</a></li>
        <li>Call us at +1-800-123-4567</li>
        <li>Visit our <a href="https://example.com/support" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800">Support Center</a> for more resources and FAQs.</li>
      </ul>

      <h3 className="text-xl font-bold mb-2">2. Provide Feedback</h3>
      <p className="mb-4">Your feedback is invaluable in helping us improve our platform. Please share your thoughts:</p>
      <form>
        <label htmlFor="feedback" className="block mb-2">Your Feedback:</label>
        <textarea
          id="feedback"
          name="feedback"
          rows="4"
          className="w-full p-2 border rounded mb-4"
          placeholder="Share your feedback here..."
        ></textarea>
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Submit Feedback
        </button>
      </form>

      <h3 className="text-xl font-bold mb-2">3. Suggestions for New Features</h3>
      <p className="mb-4">If you have suggestions for new features or improvements, let us know:</p>
      <ul className="list-disc list-inside mb-4">
        <li>Submit a feature request via our <a href="https://example.com/feedback" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800">Feature Request Form</a>.</li>
        <li>Join our community forum to discuss new ideas and upcoming features.</li>
      </ul>
    </div>
  );
}

export default SupportFeedback;