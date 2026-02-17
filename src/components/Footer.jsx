import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer style={{
            textAlign: 'center',
            padding: '2rem 1rem',
            marginTop: 'auto',
            borderTop: '1px solid #eee',
            width: '100%',
            backgroundColor: '#f9f9f9',
            color: '#666'
        }}>
            <div style={{ marginBottom: '1rem' }}>
                <Link to="/about" style={{ margin: '0 10px', textDecoration: 'none', color: '#666' }}>About Us</Link>
                |
                <Link to="/privacy" style={{ margin: '0 10px', textDecoration: 'none', color: '#666' }}>Privacy Policy</Link>
                |
                <Link to="/contact" style={{ margin: '0 10px', textDecoration: 'none', color: '#666' }}>Contact Us</Link>
            </div>
            <p>&copy; 2026 Olympic Spirit Matcher. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
