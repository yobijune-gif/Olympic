import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
            <h2>About Us</h2>
            <p>
                The <strong>Olympic Spirit Matcher</strong> is a fun project designed to help you discover which 2026 Winter Olympic athlete matches your personality.
            </p>
            <p>
                Using advanced AI technology, we analyze your input to find your perfect athletic soulmate from a diverse roster of global stars.
            </p>
            <p>
                Whether you're a speed demon, an artistic soul, or a fearless pioneer, there's always an Olympian who shares your spirit.
            </p>

            <Link to="/" style={{ display: 'inline-block', marginTop: '2rem', color: 'var(--primary-color)' }}>&larr; Back to Home</Link>
        </div>
    );
};

export default AboutUs;
