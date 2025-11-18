import { useState } from 'react';
import axios from 'axios';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    // Validation front simple
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    try {
      const res = await axios.post('http://localhost:3000/auth/login', { email, password });
      onLogin(res.data.token);
    } catch  {
      setError('Invalid credentials');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
        <h2>Login</h2>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
}

export default Login;