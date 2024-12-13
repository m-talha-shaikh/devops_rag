import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import './dashboardPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const DashboardPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [imageText, setImageText] = useState('');

  // Format text for HTML rendering (newlines and quotes)
  const formatText = (text) => {
    if (typeof text === 'object') {
      return JSON.stringify(text, null, 2); // Stringify object responses for display
    }
    return text.replace(/\n/g, '<br />').replace(/\"/g, '&quot;');
  };

  // API call to backend
  const fetchBotResponse = async (question) => {
    try {
      const data = `Here are some P2P-related questions based on the provided context:
  
  1. What is the main advantage of being a verified merchant on the P2P platform?
  2. How much discount can verified merchants enjoy on basic fee rates in all fiat markets?
  3. What is the benefit of having a dedicated client support as a P2Pro merchant?
  4. What is the main requirement to apply for a PRO merchant account on the P2P platform?
  5. How does the P2P platform ensure a reliable trading experience for all users?
  6. What is the main difference between a verified merchant and a regular merchant on the P2P platform?
  7. How does the P2P platform help merchants manage their business hours and ads?
  8. What is the benefit of having a "verified badge" next to a P2P nickname?
  9. How does the P2P platform support hundreds of payment methods and fiat currencies?
  10. What is the main goal of the P2P platform's customer support?
  
  Let me know if you want me to answer any of these questions or if you'd like me to generate more questions.`;
      return data;
    } catch (error) {
      console.error('Error fetching response:', error);
      return 'Sorry, there was an error processing your request.';
    }
  };
  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() && !imageText) return;

    const userMessage = input || imageText;

    // Display user message
    setMessages((prevMessages) => [...prevMessages, { type: 'user', text: userMessage }]);

    setLoading(true);
    setInput('');
    const apiResponse = await fetchBotResponse(userMessage);

    // Display bot response directly
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: 'bot', text: apiResponse },
    ]);

    setLoading(false);
    setInput('');
    setImage(null);
    setImageText('');
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      extractTextFromImage(file);
    }
  };

  // Extract text from image using Tesseract.js
  const extractTextFromImage = (file) => {
    setLoading(true);
    Tesseract.recognize(file, 'eng', {
      logger: (m) => console.log(m),
    })
      .then(({ data: { text } }) => {
        setImageText(text);
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: 'user', text: text },
        ]);
        sendToBackend(text);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error during OCR:', err);
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: 'bot', text: 'Sorry, we could not extract any text from the image.' },
        ]);
        setLoading(false);
      });
  };

  // Send extracted text to backend
  const sendToBackend = async (text) => {
    try {
      const apiResponse = await fetchBotResponse(text);
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'bot', text: apiResponse },
      ]);
    } catch (error) {
      console.error('Error sending to backend:', error);
    }
  };

  return (
    <div className="dashboardPage">
      <div className="chatContainer">
        <div className="conversation">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={msg.type === 'user' ? 'userMessage' : 'botMessage'}
              dangerouslySetInnerHTML={{ __html: formatText(msg.text || '') }} // Ensure msg.text is a valid string
            />
          ))}
        </div>
      </div>

      <div className="formContainer">
        <form onSubmit={handleSubmit} className="chatForm">
          <input
            type="text"
            placeholder="Ask a question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="chatInput"
          />
          <button type="submit" className="submitButton">
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </form>

        <div className="imageUpload">
          <label htmlFor="fileInput" className="customFileButton">
            Choose File
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="imageInput"
          />
          {image && (
            <div className="imagePreview">
              <img src={URL.createObjectURL(image)} alt="preview" className="previewImage" />
              {loading && <p>Processing image...</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
