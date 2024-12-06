// import React, { useState, useEffect } from 'react';
// import './dashboardPage.css';

// const DashboardPage = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [loading, setLoading] = useState(false); // To track if we're showing the "..." typing animation

//   // Fake API call to backend
//   const fetchBotResponse = async (question) => {
//      try {
//       const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/chat`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ question }),
//       });


//       const data = await response.json();
//       return data.answer;
//     } catch (error) {
//       console.error('Error fetching response:', error);
//       return 'Sorry, there was an error processing your request.';
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     setMessages((prevMessages) => [...prevMessages, { type: 'user', text: input }]);

//     // Show the "..." loading animation
//     setLoading(true);

//     // Get response from backend
//     const apiResponse = await fetchBotResponse(input);

//     // After receiving the response, add the bot message
//     setMessages((prevMessages) => [
//       ...prevMessages,
//       { type: 'bot', text: '...' }, // Temporary "..." message
//     ]);

//     // Delay before showing the full response
//     setTimeout(() => {
//       setMessages((prevMessages) => [
//         ...prevMessages.slice(0, prevMessages.length - 1), // Remove "..."
//         { type: 'bot', text: apiResponse }, // Add the full bot response
//       ]);
//       setLoading(false); // Stop the "..." animation
//     }, 100); // Delay for 1.5 seconds before displaying the actual response

//     setInput('');
//   };

//   return (
//     <div className="dashboardPage">
//       <div className="texts">
//         <div className="logo">
//           <img src="/logo.png" alt="logo" />
//           <h1>KNOWLEDGE AI</h1>
//         </div>
//         <div className="chatContainer">
//           <div className="conversation">
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={msg.type === 'user' ? 'userMessage' : 'botMessage'}
//               >
//                 <span>{msg.text}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       <div className="formContainer">
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Ask a question"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//           />
//           <button type="submit">
//             <img src="/arrow.png" alt="submit" />
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default DashboardPage;



// import React, { useState } from 'react';
// import Tesseract from 'tesseract.js';
// import './dashboardPage.css';

// const DashboardPage = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [loading, setLoading] = useState(false); // To track if we're showing the "..." typing animation
//   const [image, setImage] = useState(null); // To store uploaded image
//   const [imageText, setImageText] = useState(''); // To store text extracted from the image

//   // Fake API call to backend
//   const fetchBotResponse = async (question) => {
//     try {
//       const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/chat`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ question }),
//       });

//       const data = await response.json();
//       return data.answer;
//     } catch (error) {
//       console.error('Error fetching response:', error);
//       return 'Sorry, there was an error processing your request.';
//     }
//   };

//   // Handle form submission (with text)
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!input.trim() && !imageText) return; // Prevent submitting if input is empty and no text from image

//     setMessages((prevMessages) => [
//       ...prevMessages,
//       { type: 'user', text: input || imageText } // Use imageText if input is empty
//     ]);

//     // Show the "..." loading animation
//     setLoading(true);

//     // Send the text (either from input or image) to the backend API
//     const apiResponse = await fetchBotResponse(input || imageText);

//     // After receiving the response, add the bot message
//     setMessages((prevMessages) => [
//       ...prevMessages,
//       { type: 'bot', text: '...' }, // Temporary "..." message
//     ]);

//     // Delay before showing the full response
//     setTimeout(() => {
//       setMessages((prevMessages) => [
//         ...prevMessages.slice(0, prevMessages.length - 1), // Remove "..."
//         { type: 'bot', text: apiResponse }, // Add the full bot response
//       ]);
//       setLoading(false); // Stop the "..." animation
//     }, 100); // Delay for 1.5 seconds before displaying the actual response

//     setInput('');
//     setImage(null); // Clear image after submission
//     setImageText(''); // Clear image text after submission
//   };

//   // Handle image file selection
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//       extractTextFromImage(file); // Automatically extract text from the selected image
//     }
//   };

//   // Function to extract text from image using Tesseract.js
//   const extractTextFromImage = (file) => {
//     setLoading(true);
//     Tesseract.recognize(
//       file,
//       'eng', // You can add other languages here
//       {
//         logger: (m) => console.log(m), // Log progress
//       }
//     ).then(({ data: { text } }) => {
//       setImageText(text);
//       setLoading(false);
//     }).catch((err) => {
//       console.error('Error during OCR:', err);
//       setLoading(false);
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { type: 'bot', text: 'Sorry, we could not extract any text from the image.' },
//       ]);
//     });
//   };

//   return (
//     <div className="dashboardPage">
//       <div className="texts">
//         <div className="logo">
//           <img src="/logo.png" alt="logo" />
//           <h1>KNOWLEDGE AI</h1>
//         </div>
//         <div className="chatContainer">
//           <div className="conversation">
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={msg.type === 'user' ? 'userMessage' : 'botMessage'}
//               >
//                 {msg.type === 'user' && msg.text === 'Image Uploaded' ? (
//                   <img src={image} alt="uploaded" className="uploadedImage" />
//                 ) : (
//                   <span>{msg.text}</span>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       <div className="formContainer">
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Ask a question"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//           />
//           <button type="submit">
//             <img src="/arrow.png" alt="submit" />
//           </button>
//         </form>

//         <div className="imageUpload">
//           <input type="file" accept="image/*" onChange={handleImageChange} />
//           {image && !imageText && (
//             <div className="imagePreview">
//               <img src={URL.createObjectURL(image)} alt="preview" />
//               <p>Processing image...</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardPage;

import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import './dashboardPage.css';

const DashboardPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false); // To track if we're showing the "..." typing animation
  const [image, setImage] = useState(null); // To store uploaded image
  const [imageText, setImageText] = useState(''); // To store text extracted from the image

  // Fake API call to backend
  const fetchBotResponse = async (question) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
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

  // Handle form submission (with text)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() && !imageText) return; // Prevent submitting if input is empty and no text from image

    setMessages((prevMessages) => [
      ...prevMessages,
      { type: 'user', text: input || imageText } // Use imageText if input is empty
    ]);

    // Show the "..." loading animation
    setLoading(true);

    // Send the text (either from input or image) to the backend API
    const apiResponse = await fetchBotResponse(input || imageText);

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
    }, 100); // Delay for 1.5 seconds before displaying the actual response

    setInput(''); // Clear input after submission
    setImage(null); // Clear image after submission
    setImageText(''); // Clear image text after submission
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      extractTextFromImage(file); // Automatically extract text from the selected image
    }
  };

  // Function to extract text from image using Tesseract.js
  const extractTextFromImage = (file) => {
    setLoading(true);
    Tesseract.recognize(
      file,
      'eng', // You can add other languages here
      {
        logger: (m) => console.log(m), // Log progress
      }
    ).then(({ data: { text } }) => {
      setImageText(text); // Save extracted text in state
      setLoading(false);

      // Automatically add the extracted text as a prompt and send to backend
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'user', text: text } // Add the extracted text as a user message
      ]);

      // Send to backend after extracting text
      sendToBackend(text);
    }).catch((err) => {
      console.error('Error during OCR:', err);
      setLoading(false);
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'bot', text: 'Sorry, we could not extract any text from the image.' },
      ]);
    });
  };

  // Function to send the extracted text to the backend
  const sendToBackend = async (text) => {
    // Show the "..." loading animation
    setLoading(true);

    try {
      const apiResponse = await fetchBotResponse(text);

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
      }, 100); // Delay for 1.5 seconds before displaying the actual response

    } catch (error) {
      console.error('Error sending to backend:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'bot', text: 'Sorry, there was an error processing your request.' },
      ]);
    }
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
                {msg.type === 'user' && msg.text === 'Image Uploaded' ? (
                  <img src={image} alt="uploaded" className="uploadedImage" />
                ) : (
                  <span>{msg.text}</span>
                )}
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

        <div className="imageUpload">
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {image && !imageText && (
            <div className="imagePreview">
              <img src={URL.createObjectURL(image)} alt="preview" />
              <p>Processing image...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
