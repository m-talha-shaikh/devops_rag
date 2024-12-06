import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';  // Import useAuth hook
import './signUpPage.css';

import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signUp } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Add this line

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(fullName, email, password);
      navigate('/dashboard');  // Redirect to the dashboard after successful sign-up
    } catch (error) {
      setError('Error during sign up');
    }
  };

  return (
    <div className='signUpPage'>
      <div className='signUpContainer'>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default SignUpPage;
