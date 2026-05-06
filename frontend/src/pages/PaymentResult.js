import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/App.css';

const PaymentResult = ({ status }) => {
  const location = useLocation();
  const data = location.state || {};
  const success = status === 'success';

  return (
    <div className="payment-result-page">
      <section className="payment-result-panel">
        <h1>{success ? 'Payment Successful' : 'Payment Failed'}</h1>
        <p>
          {success
            ? `Your ${data.method || 'payment'} order has been placed.`
            : data.message || 'Something went wrong while processing your payment.'}
        </p>
        {success && (
          <div className="payment-result-details">
            <span>Total</span>
            <strong>Rs. {Number(data.total || 0).toFixed(2)}</strong>
            {data.paymentId && (
              <>
                <span>Payment ID</span>
                <strong>{data.paymentId}</strong>
              </>
            )}
          </div>
        )}
        <Link to="/home">Continue Shopping</Link>
      </section>
    </div>
  );
};

export default PaymentResult;
