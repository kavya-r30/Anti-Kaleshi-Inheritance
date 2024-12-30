import React from 'react';

function SupportFeedback() {
  return (
    <div className="support-feedback">
      <h2>Support & Feedback</h2>
      <p>If you need support or have any feedback, here's how you can get in touch:</p>
      
      <h3>1. Contact Support</h3>
      <p>Our support team is available to help you with any issues or questions you may have.</p>
      <ul>
        <li>Email us at <a href="mailto:support@example.com">support@example.com</a></li>
        <li>Call us at +1-800-123-4567</li>
        <li>Visit our <a href="https://example.com/support" target="_blank" rel="noopener noreferrer">Support Center</a> for more resources and FAQs.</li>
      </ul>
      
      <h3>2. Provide Feedback</h3>
      <p>Your feedback is invaluable in helping us improve our platform. Please share your thoughts:</p>
      <form>
        <label for="feedback">Your Feedback:</label><br />
        <textarea id="feedback" name="feedback" rows="4" cols="50" placeholder="Share your feedback here..."></textarea><br />
        <button type="submit">Submit Feedback</button>
      </form>
      
      <h3>3. Suggestions for New Features</h3>
      <p>If you have suggestions for new features or improvements, let us know:</p>
      <ul>
        <li>Submit a feature request via our <a href="https://example.com/feedback" target="_blank" rel="noopener noreferrer">Feature Request Form</a>.</li>
        <li>Join our community forum to discuss new ideas and upcoming features.</li>
      </ul>
    </div>
  );
}

export default SupportFeedback;
