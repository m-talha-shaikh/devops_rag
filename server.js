const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',  // Allow requests from this origin
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));

app.use(express.json());  // Parse JSON bodies
app.options('*', cors()); // Handle preflight requests

// Dummy in-memory storage (Use a DB in production)
const users = [
  {
    fullName: 'Admin',
    email: 'admin@yahoo.com',
    password: bcrypt.hashSync('admin123', 10) // Synchronously hash the password
  }
];
let counter = 0;

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';  // Change this for production

// Middleware to check if the user is authenticated
const authenticateToken = (req, res, next) => {
  // const token = req.headers['authorization']?.split(' ')[1]; // Extract the token from the 'Authorization' header
  // console.log(req.headers)
  // console.log(token)
  // if (!token) {
  //   return res.status(401).json({ error: 'Authentication token required' });
  // }

  // jwt.verify(token, JWT_SECRET, (err, user) => {
  //   if (err) {
  //     return res.status(403).json({ error: 'Invalid or expired token' });
  //   }
  //   req.user = user;  // Attach the user info to the request object
  //   next();
  // });
  next();
};

// Route to check authentication status
app.get('/api/auth/check', (req, res) => {
  res.json({ isAuthenticated: true, user: req.user });
});

// Sign Up Route
app.post('/api/auth/signup', async (req, res) => {

  console.log(req.body)

  const { fullName, email, password } = req.body;

  // if (!fullName || !email || !password) {
  //   return res.status(400).json({ error: 'Full name, email, and password are required' });
  // }

  // Check if the user already exists
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' });
  }

  // Hash the password before saving it
  const hashedPassword = await bcrypt.hash(password, 10);
  // Store the user data
  const newUser = { fullName, email, password: hashedPassword };
  users.push(newUser);
  // Return a success message
  const token = jwt.sign({ email, fullName }, JWT_SECRET, { expiresIn: '1h' });
  res.status(201).json({ message: 'User created successfully', user: { fullName, email }, token });
});

// Sign In Route
app.post('/api/auth/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Find user by email
  const user = users.find(user => user.email === email);
  if (!user) {
    return res.status(400).json({ error: 'Invalid email or password' });
  }

  // Check if password matches
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ error: 'Invalid email or password' });
  }

  // Generate a JWT token
  const token = jwt.sign({ email: user.email, fullName: user.fullName }, JWT_SECRET, { expiresIn: '1h' });

  // Return the token
  res.json({ token });
});

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

app.post('/api/chat', authenticateToken, async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'Question is required' });
  }

  try {
    const answer = await fakeApiCall(question);
    return res.json({ answer });
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});