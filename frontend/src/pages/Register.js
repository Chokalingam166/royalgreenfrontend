import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/App.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('/api/auth/register', {
        email,
        password
      });
      login(res.data.token, { id: res.data.user?._id, email });
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      background: 'var(--cream)'
    }}>
      <div style={{ 
        width: '100%', 
        maxWidth: '380px',
        padding: '2.5rem',
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        fontFamily: "'DM Sans', sans-serif"
      }}>
        <h2 style={{ 
          fontFamily: "'Playfair Display', serif",
          fontSize: '1.9rem',
          color: 'var(--green-dark)',
          marginBottom: '0.3rem',
          textAlign: 'center'
        }}>
          Create Account
        </h2>
        <p style={{ 
          color: 'var(--text-mid)', 
          fontSize: '0.9rem', 
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          Join Royal Green today!
        </p>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '0.8rem', 
              fontWeight: 500, 
              color: 'var(--green-dark)', 
              marginBottom: '0.4rem', 
              textTransform: 'uppercase'
            }}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '1.5px solid #d4d0c8',
                borderRadius: '10px',
                fontSize: '0.95rem',
                background: 'white'
              }}
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '0.8rem', 
              fontWeight: 500, 
              color: 'var(--green-dark)', 
              marginBottom: '0.4rem', 
              textTransform: 'uppercase'
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              required
              minLength={6}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '1.5px solid #d4d0c8',
                borderRadius: '10px',
                fontSize: '0.95rem',
                background: 'white'
              }}
            />
          </div>
          {error && (
            <div style={{
              background: '#fee',
              color: '#c33',
              padding: '0.75rem',
              borderRadius: '8px',
              marginBottom: '1rem',
              border: '1px solid #fcc',
              fontSize: '0.9rem'
            }}>
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.85rem',
              background: 'linear-gradient(135deg, var(--green-mid), var(--green-light))',
              color: 'white',
              fontSize: '1rem',
              fontWeight: 500,
              border: 'none',
              borderRadius: '10px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              transition: 'all 0.3s'
            }}
          >
            {loading ? 'Creating...' : 'Create Account'}
          </button>
        </form>
        <p style={{ 
          textAlign: 'center', 
          fontSize: '0.85rem', 
          color: 'var(--text-mid)', 
          marginTop: '1.4rem' 
        }}>
          Already have an account? <Link to="/" style={{ color: 'var(--green-mid)', fontWeight: 500 }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
