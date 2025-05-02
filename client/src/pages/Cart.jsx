import React, { useState, useEffect } from 'react';
import './Cart.css';

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const removeItem = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedCart = [...cart];
    updatedCart[index].quantity = newQuantity;
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const totalPrice = cart.reduce((acc, item) => acc + (item.price * 80 * (item.quantity || 1)), 0);

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>🛒 Your Shopping Cart</h1>
        <p className="cart-subtitle">{cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart</p>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <svg viewBox="0 0 24 24">
            <path d="M22 13h-8v-2h8v2zm0-6h-8v2h8V7zm-8 10h8v-2h-8v2zm-2-8v6c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V9c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2zm-1.5 6l-2.25-3-1.75 2.26-1.25-1.51L3.5 15h7z"/>
          </svg>
          <h3>Your cart is empty</h3>
          <p>Looks like you haven't added anything to your cart yet</p>
          <a href="/dashboard" className="continue-shopping-btn">Continue Shopping</a>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="order-summary-container">
            <div className="summary-card">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal ({cart.length} {cart.length === 1 ? 'item' : 'items'})</span>
                <span>₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span className="free-shipping">FREE</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span className="total-price">₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>
              <button className="checkout-btn">Proceed to Checkout</button>
              <a href="/dashboard" className="continue-shopping-link">Continue Shopping</a>
            </div>
          </div>

          <div className="cart-items-container">
            {cart.map((item, index) => (
              <div className="cart-item" key={index}>
                <div className="item-image">
                  <img src={item.thumbnail} alt={item.title} />
                </div>
                <div className="item-details">
                  <h3 className="item-title">{item.title}</h3>
                  <p className="item-brand">Brand: {item.brand}</p>
                  <p className="item-desc">{item.description.substring(0, 100)}...</p>
                  
                  <div className="item-controls">
                    <div className="quantity-control">
                      <button 
                        onClick={() => updateQuantity(index, (item.quantity || 1) - 1)}
                        disabled={(item.quantity || 1) <= 1}
                      >
                        −
                      </button>
                      <span>{item.quantity || 1}</span>
                      <button onClick={() => updateQuantity(index, (item.quantity || 1) + 1)}>
                        +
                      </button>
                    </div>
                    <div className="item-price">₹{(item.price * 80 * (item.quantity || 1)).toLocaleString('en-IN')}</div>
                  </div>
                </div>
                <button 
                  className="remove-item-btn"
                  onClick={() => removeItem(index)}
                >
                  <svg viewBox="0 0 24 24">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;