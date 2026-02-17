import React, { useState } from 'react';
import '../index.css';

const translations = {
    en: {
        title: "Discover Your Olympic Spirit",
        description: "Tell us about your personality or how you're feeling today.",
        placeholder: "E.g., I'm feeling competitive and full of energy, but I also value teamwork...",
        button: "Find My Match",
        analyzing: "Analyzing..."
    },
    ko: {
        title: "당신의 올림픽 정신을 찾아보세요",
        description: "오늘 당신의 기분이나 성격을 알려주세요.",
        placeholder: "예: 나는 승부욕이 강하고 에너지가 넘쳐, 하지만 팀워크도 중요하게 생각해...",
        button: "나의 선수 찾기",
        analyzing: "분석 중..."
    },
    zh: {
        title: "发现您的奥运精神",
        description: "告诉我们您的性格或今天的感觉。",
        placeholder: "例如：我充满竞争力且精力充沛，但我也重视团队合作...",
        button: "寻找我的匹配",
        analyzing: "分析中..."
    },
    ja: {
        title: "あなたのオリンピックスピリットを発見",
        description: "あなたの性格や今日の気分を教えてください。",
        placeholder: "例：私は競争心が強くエネルギーに満ちていますが、チームワークも大切にしています...",
        button: "マッチする選手を探す",
        analyzing: "分析中..."
    },
    es: {
        title: "Descubre tu espíritu olímpico",
        description: "Cuéntanos sobre tu personalidad o cómo te sientes hoy.",
        placeholder: "Ej: Me siento competitivo y lleno de energía, pero también valoro el trabajo en equipo...",
        button: "Encuentra mi pareja",
        analyzing: "Analizando..."
    },
    fr: {
        title: "Découvrez votre esprit olympique",
        description: "Parlez-nous de votre personnalité ou de ce que vous ressentez aujourd'hui.",
        placeholder: "Par ex : Je me sens compétitif et plein d'énergie, mais j'apprécie aussi le travail d'équipe...",
        button: "Trouver mon match",
        analyzing: "Analyse en cours..."
    }
};

const InputSection = ({ onAnalyze, isLoading, lang }) => {
    const [text, setText] = useState('');

    const t = translations[lang] || translations.en;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            onAnalyze(text);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <section className="input-section">
            <h2>{t.title}</h2>
            <p>{t.description}</p>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={t.placeholder}
                    disabled={isLoading}
                    rows={4}
                />
                <button type="submit" disabled={isLoading || !text.trim()} className="analyze-btn">
                    {isLoading ? t.analyzing : t.button}
                </button>
            </form>
        </section>
    );
};

export default InputSection;
