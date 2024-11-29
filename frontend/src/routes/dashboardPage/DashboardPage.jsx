import React, { useState, useEffect } from 'react';
import './dashboardPage.css';

const DashboardPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false); // To track if we're showing the "..." typing animation

  // Fake API call to backend
  const fetchBotResponse = async (question) => {
    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();
      return data.answer;
    } catch (error) {
      console.error('Error fetching response:', error);
      return 'Sorry, there was an error processing your request.';
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prevMessages) => [...prevMessages, { type: 'user', text: input }]);

    // Show the "..." loading animation
    setLoading(true);

    // Get response from backend
    const apiResponse = await fetchBotResponse(input);

    // After receiving the response, add the bot message
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: 'bot', text: '...' }, // Temporary "..." message
    ]);

    // Delay before showing the full response
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages.slice(0, prevMessages.length - 1), // Remove "..."
        { type: 'bot', text: apiResponse }, // Add the full bot response
      ]);
      setLoading(false); // Stop the "..." animation
    }, 1500); // Delay for 1.5 seconds before displaying the actual response

    setInput('');
  };

  return (
    <div className="dashboardPage">
      <div className="texts">
        <div className="logo">
          <img src="/logo.png" alt="logo" />
          <h1>KNOWLEDGE AI</h1>
        </div>
        <div className="chatContainer">
          <div className="conversation">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={msg.type === 'user' ? 'userMessage' : 'botMessage'}
              >
                <span>{msg.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Ask a question"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">
            <img src="/arrow.png" alt="submit" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default DashboardPage;
