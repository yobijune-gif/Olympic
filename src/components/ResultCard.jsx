import React from 'react';

const ResultCard = ({ result, onReset }) => {
    if (!result) return null;

    const { match_name, achievement, reason, cheer_message, link } = result;


    return (
        <div className="result-container">
            <div className="result-card">
                <div className="card-header">
                    <h3>Your Olympic Soulmate</h3>
                </div>
                <div className="card-body">
                    <div className="athlete-image-placeholder">
                        {/* Ideally replace with real image */}
                        <span>{match_name ? match_name.charAt(0) : '?'}</span>
                    </div>
                    <h2>{match_name}</h2>
                    <p className="event-tag">{achievement}</p>

                    <div className="match-reason">
                        <h4>Why You Match:</h4>
                        <p>{reason}</p>
                    </div>

                    <div className="cheer-message" style={{ marginTop: '1rem', fontStyle: 'italic', color: 'var(--accent-color)' }}>
                        "{cheer_message}"
                    </div>

                    {link && (
                        <a href={link} target="_blank" rel="noopener noreferrer" className="highlight-link" style={{ display: 'block', marginTop: '1rem', color: 'var(--primary-color)' }}>
                            Watch Highlights &rarr;
                        </a>
                    )}
                </div>
                <button onClick={onReset} className="reset-btn">Try Another</button>
            </div>

            <div className="ad-revenue-slot">
                <p>Supported by AdSense</p>
            </div>
        </div>
    );
};

export default ResultCard;
