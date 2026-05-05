import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../App.css';

const fruits = [
  { id: 1, name: 'Apple', price: 1.2, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF4W5EKllFJpqSRUlJvSuRJodXMv1lZCmTfA&s' },
  { id: 2, name: 'Banana', price: 0.5, image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400&q=80' },
  { id: 3, name: 'Strawberry', price: 2.0, image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&q=80' },
  { id: 4, name: 'Orange', price: 0.8, image: 'https://th.bing.com/th/id/OIP.VbKz6SeSX9CQifygrVttcwHaE7?w=253&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3' },
  { id: 5, name: 'Pineapple', price: 3.0, image: 'https://th.bing.com/th/id/OIP.sPKg7dX5qRnaDmWRPl68cwHaLH?w=129&h=194&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3' },
  { id: 6, name: 'Grapes', price: 2.5, image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=400&q=80' },
  { id: 7, name: 'Watermelon', price: 4.5, image: 'https://th.bing.com/th/id/OIP.l7RzqKX47u_FmWbRmRlb4AHaHa?w=199&h=199&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3' },
  { id: 8, name: 'Kiwi', price: 1.1, image: 'https://th.bing.com/th/id/OIP.B7Jbs0BG_XaxieN4c9OEJAHaEs?w=264&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3' },
  { id: 9, name: 'Peach', price: 1.3, image: 'https://images.unsplash.com/photo-1528821128474-27f963b062bf?w=400&q=80' }
];

const vegetables = [
  { id: 11, name: 'Carrot', price: 0.6, image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&q=80' },
  { id: 12, name: 'Broccoli', price: 1.3, image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400&q=80' },
  { id: 13, name: 'Tomato', price: 0.9, image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400&q=80' },
  { id: 14, name: 'Spinach', price: 1.1, image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&q=80' },
  { id: 15, name: 'Bell Pepper', price: 1.25, image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&q=80' },
  { id: 16, name: 'Cucumber', price: 0.75, image: 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=400&q=80' },
  { id: 17, name: 'Onion', price: 0.4, image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&q=80' },
  { id: 18, name: 'Potato', price: 0.5, image: 'https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?w=400&q=80' },
  { id: 19, name: 'Garlic', price: 0.3, image: 'https://images.unsplash.com/photo-1615477550927-6ecb95f79ba1?w=400&q=80' },
  { id: 20, name: 'Lettuce', price: 1.0, image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400&q=80' }
];

const Home = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState('');

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const addToCart = (product, type) => {
    setCart((items) => {
      const existing = items.find((item) => item.id === product.id && item.type === type);

      if (existing) {
        return items.map((item) =>
          item.id === product.id && item.type === type
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...items, { ...product, type, quantity: 1 }];
    });
  };

  const removeFromCart = (id, type) => {
    setCart((items) => items.filter((item) => item.id !== id || item.type !== type));
  };

  const goToCheckout = () => {
    if (cart.length === 0) {
      setPaymentStatus('Add items to cart first.');
      return;
    }

    navigate('/checkout', { state: { cart } });
  };

  const renderProducts = (products, type) =>
    products.map((product) => (
      <article className="classic-product-card" key={`${type}-${product.id}`}>
        <img className="classic-product-image" src={product.image} alt={product.name} />
        <div className="classic-product-info">
          <h3 className="classic-product-name">{product.name}</h3>
          <p className="classic-product-price">Price: ${product.price.toFixed(2)}</p>
          <button
            className="classic-add-to-cart"
            type="button"
            onClick={() => addToCart(product, type)}
          >
            Add to Cart
          </button>
        </div>
      </article>
    ));

  return (
    <div className="classic-home">
      <div className="classic-nav1">
        <img src="/royal_green_logo.png" alt="Royal Green logo" />
        <a href="#home">HOME</a>
        <a href="#fruits">ABOUT</a>
        <a href="#contact">CONTACT</a>
        <a href="#service">SERVICE</a>
        <button type="button" onClick={logout}>LOGOUT</button>
      </div>

      <header className="classic-header" id="home">
        <h1>Royal Green</h1>
        <nav>
          <a href="#fruits">Fruits</a>
          <a href="#vegetables">Vegetables</a>
        </nav>
      </header>

      <main className="classic-container">
        <section>
          <h2 className="classic-section-title" id="fruits">Fresh Fruits</h2>
          <div className="classic-products">{renderProducts(fruits, 'fruit')}</div>
        </section>

        <section>
          <h2 className="classic-section-title" id="vegetables">Fresh Vegetables</h2>
          <div className="classic-products">{renderProducts(vegetables, 'veg')}</div>
        </section>
      </main>

      <aside className="classic-cart">
        <h2>Shopping Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div className="classic-cart-item" key={`${item.type}-${item.id}`}>
                <span>{item.name} ({item.type}) x{item.quantity}</span>
                <button type="button" onClick={() => removeFromCart(item.id, item.type)}>
                  Remove
                </button>
              </div>
            ))}
            <div className="classic-summary">
              <h3>Summary</h3>
              <div>
                <span>Items</span>
                <span>{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
              </div>
              <div>
                <span>Subtotal</span>
                <span>Rs. {total.toFixed(2)}</span>
              </div>
              <div>
                <span>Delivery</span>
                <span>Free</span>
              </div>
              <strong className="classic-cart-total">Total: Rs. {total.toFixed(2)}</strong>
            </div>
            <div className="classic-payment-actions">
              <button type="button" onClick={goToCheckout}>
                Checkout
              </button>
            </div>
          </>
        )}
        {paymentStatus && <p className="classic-payment-status">{paymentStatus}</p>}
      </aside>

      <footer className="classic-footer">
        &copy; 2024 Royal Green. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
