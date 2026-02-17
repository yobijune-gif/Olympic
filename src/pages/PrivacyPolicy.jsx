import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
            <h2>Privacy Policy</h2>
            <p>Last updated: February 17, 2026</p>

            <h3>1. Introduction</h3>
            <p>Welcome to Olympic Spirit Matcher. We value your privacy and are committed to protecting your personal information.</p>

            <h3>2. Data Collection</h3>
            <p>We do not collect any personal data. Your input is processed locally or sent anonymously to our analysis service (Gemini API) solely for generating your result.</p>

            <h3>3. Use of Information</h3>
            <p>The information you provide is used only to match you with an Olympic athlete.</p>

            <Link to="/" style={{ display: 'inline-block', marginTop: '2rem', color: 'var(--primary-color)' }}>&larr; Back to Home</Link>
        </div>
    );
};

export default PrivacyPolicy;
