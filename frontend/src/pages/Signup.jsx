import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../api/auth';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^.{6,}$/;

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setMessage('');
    if (!emailRegex.test(email)) return setError('Invalid email address');
    if (!passwordRegex.test(password)) return setError('Password must be at least 6 characters');
    const data = await register(email, password);
    if (data.user) {
      setMessage(data.message);
      setTimeout(() => navigate('/'), 2000);
    } else {
      setError(data.message || 'Registration failed');
    }
  }

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>Sign Up</h2>
        {error && <p style={styles.error}>{error}</p>}
        {message && <p style={styles.success}>{message}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Sign Up</button>
        <p>Already have an account? <Link to="/">Login</Link></p>
      </form>
    </div>
  );
}

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' },
  form: { display: 'flex', flexDirection: 'column', gap: 12, width: 320, padding: 32, boxShadow: '0 2px 12px rgba(0,0,0,0.1)', borderRadius: 8 },
  input: { padding: '10px', fontSize: 14, borderRadius: 4, border: '1px solid #ccc' },
  button: { padding: '10px', background: '#34a853', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 15 },
  error: { color: 'red', margin: 0 },
  success: { color: 'green', margin: 0 },
};
