const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON bodies

let counter = 0; // Initialize counter

// 1. How can I request access to the HR portal?
// 2. What is HBL's policy on personal use of company-issued laptops?
// 3. How do I submit an expense report for a business trip?

const fakeApiCall = (question) => {
  const responses = [
    "To request access to the internal HR portal, please submit a request through the HBL Employee Access Management System. You’ll need to specify your employee ID and the reason for access. Once submitted, your manager will review the request and approve it if appropriate. If you face any issues, contact the IT support team via the internal helpdesk for further assistance.",
    "According to HBL’s internal IT policy, company-issued laptops are primarily for work-related tasks. Personal use should be minimal and not interfere with professional responsibilities. For any personal usage, ensure that no sensitive or proprietary bank data is accessed, stored, or shared. If you need to install personal software, please submit a request to IT for approval to ensure compliance with security protocols.",
    "To submit an expense report for a business trip, log into the HBL Expense Management Portal and upload all receipts in the required format. Make sure to categorize each expense accurately, providing clear descriptions and cost breakdowns. Once submitted, your direct supervisor will review and approve it before it’s sent to the finance team for final processing. If you encounter any issues, contact the Finance Helpdesk."
  ];

  // Return the current response based on the counter and increment the counter
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(responses[counter]);
      counter = (counter + 1) % 3; // Cycle counter between 0, 1, and 2
    }, 1000); // Simulate delay of 1 second
  });
};


// Routes

// Route for the root path
app.get('/', (req, res) => {
  res.json({ message: 'Hello, Rag!' });
});


app.post('/api/chat', async (req, res) => {
  const { question } = req.body; // Get question from the request body

  if (!question) {
    return res.status(400).json({ error: 'Questions are required' });
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