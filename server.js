const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON bodies

// Fake API response to simulate chatbot behavior
const fakeApiCall = (question) => {
  const responses = [
    "That's a great question! Here's what I think...",
    "Let me think about that for a moment...",
    "Could you clarify what you mean by that?",
    "Interesting! Here's what I know...",
    "I'll need to check that, but here's a guess..."
  ];
  // Simulate a random response after a slight delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(responses[Math.floor(Math.random() * responses.length)]);
    }, 1000); // Simulate delay of 1 second
  });
};

// Routes
app.post('/api/chat', async (req, res) => {
  const { question } = req.body; // Get question from the request body

  if (!question) {
    return res.status(400).json({ error: 'Question is required' });
  }

  try {
    // Simulate getting a response from an AI or chatbot service
    const answer = await fakeApiCall(question);
    return res.json({ answer }); // Send back the response
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});