const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const axios = require('axios');

// Load environment variables from a .env file
dotenv.config();

// Initialize the app
const app = express();

// Middleware
app.use(cors({
  origin: '*',  // Allow requests from any origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],  // Allow all common HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'X-Custom-Header'],  // Allow common headers
  credentials: true,  // Allow credentials (cookies, authorization headers, etc.)
  preflightContinue: true,  // Pass the preflight response to the next handler
  optionsSuccessStatus: 204  // Status code for successful preflight requests
}));

app.use(express.json());  // Parse JSON bodies

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://quantumxfyp:dP2igGBHY8QTQwMj@cluster0.8vlen.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB Atlas!'))
  .catch((err) => console.error('Error connecting to MongoDB Atlas:', err));

// MongoDB Schema and Model for User
const userSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  password: String
});

const User = mongoose.model('User', userSchema);

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';  // Change this for production

// Middleware to check if the user is authenticated
const authenticateToken = (req, res, next) => {
  next();
};

// Route to check authentication status
app.get('/api/auth/check', (req, res) => {
  res.json({ isAuthenticated: true, user: req.user });
});

// Sign Up Route
app.post('/api/auth/signup', async (req, res) => {
  console.log(req.body);

  const { fullName, email, password } = req.body;

  // Check if the user already exists in the database
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' });
  }

  // Hash the password before saving it
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create and save the new user
  const newUser = new User({ fullName, email, password: hashedPassword });
  await newUser.save();

  // Generate a JWT token
  const token = jwt.sign({ email, fullName }, JWT_SECRET, { expiresIn: '1h' });
  
  // Return a success message with the token
  res.status(201).json({ message: 'User created successfully', user: { fullName, email }, token });
});

// Sign In Route
app.post('/api/auth/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Find the user in the database
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: 'Invalid email or password' });
  }

  // Check if the password matches
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ error: 'Invalid email or password' });
  }

  // Generate a JWT token
  const token = jwt.sign({ email: user.email, fullName: user.fullName }, JWT_SECRET, { expiresIn: '1h' });

  // Return the token
  res.json({ token });
});

counter = 0;
// Chat API (for your chatbot)
const fakeApiCall = (question) => {
  const responses = [
    "To request access to the internal HR portal, please submit a request...",
    "According to HBL’s internal IT policy, company-issued laptops...",
    "To submit an expense report for a business trip, log into the HBL Expense Management Portal..."
  ];

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(responses[counter]);
      counter = (counter + 1) % 3;
    }, 1000);
  });
};

// app.post('/api/chat', authenticateToken, async (req, res) => {
//   const { question } = req.body;

//   if (!question) {
//     return res.status(400).json({ error: 'Question is required' });
//   }

//   try {
//     const answer = await fakeApiCall(question);
//     return res.json({ answer });
//   } catch (error) {
//     return res.status(500).json({ error: 'Something went wrong' });
//   }
// });

// New endpoint for / route
app.get('/', (req, res) => {
  res.send('hello rag app');
});


// Chat API route to forward the question to the Python API
app.post('/api/chat', authenticateToken, async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'Question is required' });
  }

  try {
    // Send the question to the Python API
    const response = await axios.post('http://34.201.7.49/query/', {
      query: question,  // Send the question as 'query' in the body
    });

    // Return the response from the Python API to the frontend
    return res.json({ answer: response.data.answer });
  } catch (error) {
    console.error('Error sending request to Python API:', error);
    return res.status(500).json({ error: 'Something went wrong with the chat API' });
  }
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
