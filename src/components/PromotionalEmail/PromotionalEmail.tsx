import axios from "axios";
import { useState } from "react";
import "./PromotionalEmail.css";

const PromotionalEmail = () => {
  const [subject, setSubject] = useState<string>("");
  const [recipients, setRecipients] = useState<string>("");
  const [emailBody, setEmailBody] = useState<string>("");

  const handleSubjectChange = (event: any) => {
    setSubject(event.target.value);
  };

  const handleRecipientsChange = (event: any) => {
    setRecipients(event.target.value);
  };

  const handleBodyChange = (event: any) => {
    setEmailBody(event.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/email/send`);
    // call the Nodemailer function with the user input
  };
  return (
    <div className="email-composer">
      <h2>Promotional EMail</h2>
      <div className="form-group">
        <label htmlFor="subjectInput">Subject:</label>
        <input
          id="subjectInput"
          type="text"
          className="input-field"
          value={subject}
          onChange={handleSubjectChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="recipientsInput">To:</label>
        <input
          id="recipientsInput"
          type="text"
          className="input-field"
          value={recipients}
          onChange={handleRecipientsChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="bodyInput">Body:</label>
        <textarea
          id="bodyInput"
          className="textarea-field"
          value={emailBody}
          onChange={handleBodyChange}
        />
      </div>
      <button className="send-button" onClick={handleSubmit}>
        Send
      </button>
    </div>
  );
};

export default PromotionalEmail;
