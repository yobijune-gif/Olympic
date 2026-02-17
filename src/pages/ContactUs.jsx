import React from 'react';
import { Link } from 'react-router-dom';

const ContactUs = () => {
    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
            <h2>Contact Us</h2>
            <p>
                Have questions or feedback? We'd love to hear from you!
            </p>
            <p>
                Feel free to reach out to us at:
                <br />
                <a href="mailto:yobijune@gmail.com">yobijune@gmail.com</a>
            </p>
            <p>
                Or check out our GitHub repository:
                <br />
                <a href="https://github.com/yobijune-gif/Olympic" target="_blank" rel="noopener noreferrer">github.com/yobijune-gif/Olympic</a>
            </p>

            <Link to="/" style={{ display: 'inline-block', marginTop: '2rem', color: 'var(--primary-color)' }}>&larr; Back to Home</Link>
        </div>
    );
};

export default ContactUs;
