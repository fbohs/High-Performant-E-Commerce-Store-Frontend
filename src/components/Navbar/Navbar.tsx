import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <Link to="/" className="logo-link">
                        <span className="logo-text">ShopHub</span>
                    </Link>
                </div>

                <div className="navbar-location">
                    <div className="location-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                    </div>
                    <div className="location-text">
                        <span className="location-label">Deliver to</span>
                        <span className="location-city">New York</span>
                    </div>
                </div>

                <div className="navbar-search">
                    <select className="search-category">
                        <option>All</option>
                        <option>Electronics</option>
                        <option>Fashion</option>
                        <option>Home</option>
                    </select>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search ShopHub..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="search-button">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </button>
                </div>

                <div className="navbar-auth">
                    <div className="auth-text">
                        <span className="auth-greeting">Hello, Sign in</span>
                        <span className="auth-account">Account & Lists</span>
                    </div>
                </div>

                <div className="navbar-cart">
                    <div className="cart-icon-wrapper">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        <span className="cart-count">0</span>
                    </div>
                    <span className="cart-label">Cart</span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
