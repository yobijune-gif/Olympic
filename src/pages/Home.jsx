import React, { useState } from 'react';
import InputSection from '../components/InputSection';
import ResultCard from '../components/ResultCard';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { analyzePersonality } from '../services/gemini';

const Home = () => {
    const [step, setStep] = useState('input'); // input, loading, result
    const [result, setResult] = useState(null);
    const [lang, setLang] = useState('en');

    const handleAnalyze = async (text) => {
        setStep('loading');
        try {
            // Simulate API call with language
            const data = await analyzePersonality(text, lang);
            setResult(data);
            setStep('result');
        } catch (error) {
            console.error("Error analyzing:", error);
            setStep('input');
            alert("Something went wrong. Please try again.");
        }
    };

    const handleReset = () => {
        setStep('input');
        setResult(null);
    };

    return (
        <div className="home-container">
            <LanguageSwitcher currentLang={lang} onLanguageChange={setLang} />

            <header style={{ textAlign: 'center', padding: '2rem 0' }}>
                <h1 style={{ color: 'var(--primary-color)', fontSize: '2rem' }}>2026 Olympic Spirit Matcher</h1>
            </header>

            <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                {step === 'input' && (
                    <InputSection onAnalyze={handleAnalyze} isLoading={false} lang={lang} />
                )}

                {step === 'loading' && (
                    <div className="loading-state" style={{ textAlign: 'center', marginTop: '3rem' }}>
                        <div className="spinner" style={{
                            width: '50px',
                            height: '50px',
                            border: '5px solid #f3f3f3',
                            borderTop: '5px solid var(--accent-color)',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite',
                            margin: '0 auto 1rem'
                        }}></div>
                        <p>Consulting the Olympic Spirits...</p>
                        <style>{`
              @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            `}</style>
                    </div>
                )}

                {step === 'result' && (
                    <ResultCard result={result} onReset={handleReset} />
                )}
            </main>
        </div>
    );
};

export default Home;
