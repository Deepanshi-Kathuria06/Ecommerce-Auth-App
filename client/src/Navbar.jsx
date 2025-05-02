import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCount = cart.length;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm px-4">
      <div className="container-fluid">
        {/* Brand on the left */}
        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/dashboard">
          🛍️ <span className="ms-2" style={{ color: '#9b59b6' }}>MyEcom</span>
        </Link>

        {/* Hamburger button for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar links */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav gap-3 align-items-center">
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center" to="/dashboard">
                📦 <span className="ms-1">Products</span>
              </Link>
            </li>
            <li className="nav-item position-relative">
              <Link className="nav-link d-flex align-items-center" to="/cart">
                🛒 <span className="ms-1">Cart</span>
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center" to="/login">
                👤 <span className="ms-1">Account</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
