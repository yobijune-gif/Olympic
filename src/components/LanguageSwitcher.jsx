import React from 'react';

const languages = [
    { code: 'ko', label: '🇰🇷' },
    { code: 'en', label: '🇺🇸' },
    { code: 'zh', label: '🇨🇳' },
    { code: 'ja', label: '🇯🇵' },
    { code: 'es', label: '🇪🇸' },
    { code: 'fr', label: '🇫🇷' },
];

const LanguageSwitcher = ({ currentLang, onLanguageChange }) => {
    return (
        <div className="language-switcher">
            {languages.map((lang) => (
                <button
                    key={lang.code}
                    className={`lang-btn ${currentLang === lang.code ? 'active' : ''}`}
                    onClick={() => onLanguageChange(lang.code)}
                    title={lang.code.toUpperCase()}
                >
                    {lang.label}
                </button>
            ))}
        </div>
    );
};

export default LanguageSwitcher;
