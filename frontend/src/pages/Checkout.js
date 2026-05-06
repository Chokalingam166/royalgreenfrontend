import React, { useMemo, useState } from 'react';
import axios from 'axios';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { apiUrl } from '../config/api';
import '../styles/App.css';

const initialAddress = {
  name: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  pincode: ''
};

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cart = useMemo(() => location.state?.cart || [], [location.state]);
  const [address, setAddress] = useState(initialAddress);
  const [delivery, setDelivery] = useState('standard');
  const [error, setError] = useState('');

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );
  const tax = subtotal * 0.05;
  const deliveryFee = delivery === 'express' ? 49 : 0;
  const total = subtotal + tax + deliveryFee;

  if (cart.length === 0) {
    return <Navigate to="/home" replace />;
  }

  const updateAddress = (e) => {
    const { name, value } = e.target;
    setAddress((current) => ({ ...current, [name]: value }));
  };

  const validateAddress = () => {
    const missingField = Object.entries(address).find(([, value]) => !value.trim());
    if (missingField) {
      setError('Please fill all shipping and contact details.');
      return false;
    }

    setError('');
    return true;
  };

  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const placeCashOrder = () => {
    if (!validateAddress()) return;

    navigate('/payment-success', {
      state: {
        method: 'Cash on Delivery',
        total,
        address,
        delivery
      }
    });
  };

  const payWithRazorpay = async () => {
    if (!validateAddress()) return;

    const loaded = await loadRazorpayScript();
    if (!loaded) {
      navigate('/payment-failure', { state: { message: 'Unable to load Razorpay checkout.' } });
      return;
    }

    try {
      const res = await axios.post(apiUrl('/api/payments/razorpay/order'), {
        amount: total
      });

      const { key, order } = res.data;
      const paymentObject = new window.Razorpay({
        key,
        amount: order.amount,
        currency: order.currency,
        name: 'Royal Green',
        description: 'Fresh fruits and vegetables',
        order_id: order.id,
        prefill: {
          name: address.name,
          email: address.email,
          contact: address.phone
        },
        handler: (response) => {
          navigate('/payment-success', {
            state: {
              method: 'Razorpay',
              total,
              address,
              delivery,
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id
            }
          });
        },
        modal: {
          ondismiss: () => setError('Payment was cancelled.')
        },
        theme: {
          color: '#4caf50'
        }
      });

      paymentObject.open();
    } catch (err) {
      navigate('/payment-failure', {
        state: { message: err.response?.data?.msg || 'Unable to start Razorpay payment.' }
      });
    }
  };

  return (
    <div className="checkout-page">
      <header className="checkout-header">
        <Link to="/home">Back to Home</Link>
        <h1>Checkout</h1>
      </header>

      <main className="checkout-layout">
        <section className="checkout-panel">
          <h2>Shipping Address</h2>
          <div className="checkout-form-grid">
            <input name="name" value={address.name} onChange={updateAddress} placeholder="Full name" />
            <input name="phone" value={address.phone} onChange={updateAddress} placeholder="Phone number" />
            <input name="email" value={address.email} onChange={updateAddress} placeholder="Email address" />
            <input name="city" value={address.city} onChange={updateAddress} placeholder="City" />
            <input name="pincode" value={address.pincode} onChange={updateAddress} placeholder="Pincode" />
            <textarea name="address" value={address.address} onChange={updateAddress} placeholder="Full address" />
          </div>

          <h2>Delivery Options</h2>
          <div className="delivery-options">
            <label>
              <input
                type="radio"
                name="delivery"
                value="standard"
                checked={delivery === 'standard'}
                onChange={() => setDelivery('standard')}
              />
              Standard Delivery - Free
            </label>
            <label>
              <input
                type="radio"
                name="delivery"
                value="express"
                checked={delivery === 'express'}
                onChange={() => setDelivery('express')}
              />
              Express Delivery - Rs. 49.00
            </label>
          </div>
        </section>

        <aside className="checkout-panel checkout-summary-panel">
          <h2>Order Summary</h2>
          {cart.map((item) => (
            <div className="checkout-item" key={`${item.type}-${item.id}`}>
              <span>{item.name} x{item.quantity}</span>
              <strong>Rs. {(item.price * item.quantity).toFixed(2)}</strong>
            </div>
          ))}
          <div className="checkout-total-row">
            <span>Subtotal</span>
            <strong>Rs. {subtotal.toFixed(2)}</strong>
          </div>
          <div className="checkout-total-row">
            <span>Tax</span>
            <strong>Rs. {tax.toFixed(2)}</strong>
          </div>
          <div className="checkout-total-row">
            <span>Delivery fee</span>
            <strong>{deliveryFee === 0 ? 'Free' : `Rs. ${deliveryFee.toFixed(2)}`}</strong>
          </div>
          <div className="checkout-grand-total">
            <span>Total</span>
            <strong>Rs. {total.toFixed(2)}</strong>
          </div>

          {error && <p className="checkout-error">{error}</p>}
          <div className="checkout-actions">
            <button type="button" onClick={placeCashOrder}>Cash on Delivery</button>
            <button type="button" onClick={payWithRazorpay}>Pay with Razorpay</button>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default Checkout;
