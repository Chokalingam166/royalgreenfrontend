import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiUrl } from '../config/api';
import '../styles/App.css';

const Login = () => {
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
      const res = await axios.post(apiUrl('/api/auth/login'), {
        email,
        password
      });
      login(res.data.token, res.data.user);
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      background: 'var(--cream)',
      fontFamily: "'DM Sans', sans-serif"
    }}>
      <section style={{
        width: '52%',
        background: 'var(--green-dark)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem',
        position: 'relative',
        color: 'white'
      }}>
        <div style={{ textAlign: 'center', zIndex: 1 }}>
          <span style={{ fontSize: '4rem', display: 'block' }}>🍃</span>
          <h1 style={{ 
            fontFamily: "'Playfair Display', serif", 
            fontSize: '2.6rem', 
            letterSpacing: '0.04em' 
          }}>
            ROYAL <span style={{ color: 'var(--gold)' }}>GREEN</span>
          </h1>
          <p style={{ marginTop: '0.5rem', fontSize: '0.95rem', opacity: 0.8, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Fresh & Organic Fruit Shop
          </p>
        </div>
        <div style={{ display: 'flex', gap: '1.4rem', marginTop: '3rem' }}>
          {['🍎 Apples', '🍇 Grapes', '🥭 Mangoes', '🍊 Citrus'].map((fruit, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '16px',
              padding: '1rem 0.9rem',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '2rem', display: 'block' }}>{fruit.split(' ')[0]}</span>
              <div style={{ fontSize: '0.7rem', marginTop: '0.25rem', opacity: 0.55, textTransform: 'uppercase' }}>{fruit.split(' ')[1]}</div>
            </div>
          ))}
        </div>
      </section>
      <section style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2.5rem'
      }}>
        <div style={{ width: '100%', maxWidth: '380px' }}>
          <h2 style={{ 
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.9rem',
            color: 'var(--green-dark)',
            marginBottom: '0.3rem'
          }}>
            Welcome Back 👋
          </h2>
          <p style={{ color: 'var(--text-mid)', fontSize: '0.9rem', marginBottom: '2rem' }}>
            Sign in to your Royal Green account
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
                  padding: '0.75rem 1rem 0.75rem 2.6rem',
                  border: '1.5px solid #d4d0c8',
                  borderRadius: '10px',
                  fontSize: '0.95rem',
                  background: '#fff',
                  transition: 'border-color 0.2s, box-shadow 0.2s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--green-light)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(76,175,80,.15)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d4d0c8';
                  e.target.style.boxShadow = 'none';
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
                placeholder="••••••••"
                required
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 2.6rem',
                  border: '1.5px solid #d4d0c8',
                  borderRadius: '10px',
                  fontSize: '0.95rem',
                  background: '#fff',
                  transition: 'border-color 0.2s, box-shadow 0.2s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--green-light)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(76,175,80,.15)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d4d0c8';
                  e.target.style.boxShadow = 'none';
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
                border: '1px solid #fcc'
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
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
          <p style={{ 
            textAlign: 'center', 
            fontSize: '0.85rem', 
            color: 'var(--text-mid)', 
            marginTop: '1.4rem' 
          }}>
            New customer? <Link to="/register" style={{ color: 'var(--green-mid)', fontWeight: 500 }}>Create an account</Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Login;
