import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';  // Import useAuth hook
import './signInPage.css';

import { useNavigate } from 'react-router-dom';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Add this line

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      navigate('/dashboard');  // Redirect to the dashboard after successful login
    } catch (error) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className='signInPage'>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Sign In</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};


export default SignInPage;