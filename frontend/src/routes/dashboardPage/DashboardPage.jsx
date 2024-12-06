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
    return text.replace(/\n/g, '<br />').replace(/\"/g, '&quot;');
  };

  // API call to backend
  const fetchBotResponse = async (question) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

     const data = await response.json();
   
      return data;
    } catch (error) {
      console.error('Error fetching response:', error);
      return 'Sorry, there was an error processing your request.';
    }
   

  };

  // Typewriter effect function
  const typewriterEffect = (text, delay = 10) => {
    return new Promise((resolve) => {
      let i = 0;
      const interval = setInterval(() => {
        setMessages((prevMessages) => [
          ...prevMessages.slice(0, prevMessages.length - 1),
          { type: 'bot', text: text.slice(0, i + 1) },
        ]);
        i++;
        if (i === text.length) {
          clearInterval(interval);
          resolve();
        }
      }, delay);
    });
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

    // Display temporary "..." loading message
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: 'bot', text: '...' },
    ]);

    // Use typewriter effect for bot response
    await typewriterEffect(apiResponse);

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
        { type: 'bot', text: '...' },
      ]);
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages.slice(0, prevMessages.length - 1),
          { type: 'bot', text: apiResponse },
        ]);
      }, 1000);
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
              dangerouslySetInnerHTML={{ __html: formatText(msg.text) }}
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