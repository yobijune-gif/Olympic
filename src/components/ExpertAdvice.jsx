import React, { useState } from 'react';

const content = {
    ko: {
        title: "올림픽 정신으로 멘탈 관리하기",
        articles: [
            {
                id: 1,
                title: "긴장감을 에너지로 바꾸는 법",
                summary: "출발선에 섰을 때의 심장이 터질 듯한 긴장감. 국가대표 선수들은 이 순간을 어떻게 극복할까요? 불안을 설렘으로 재정의하는 인지 재구성 기법을 소개합니다.",
                fullText: "올림픽 결승전, 전 세계가 지켜보는 가운데 출발선에 선 선수의 마음은 어떨까요? 적당한 긴장은 집중력을 높여주지만, 과도한 불안은 퍼포먼스를 망칠 수 있습니다. '나는 지금 불안해'라고 생각하는 대신 '나는 지금 흥분돼, 준비됐어'라고 스스로에게 말해보세요. 신체적 반응은 비슷하지만, 뇌가 이를 해석하는 방식이 달라지면 결과도 달라집니다. 여러분의 일상 속 도전에서도 이 '설렘의 주문'을 걸어보세요."
            },
            {
                id: 2,
                title: "실수해도 괜찮아: 회복 탄력성",
                summary: "피겨 스케이팅 선수가 점프 후 넘어졌을 때, 가장 중요한 건 '얼마나 빨리 일어나는가'입니다. 실패에 매몰되지 않고 다음 동작으로 이어가는 회복 탄력성을 배워봅니다.",
                fullText: "완벽한 연기를 펼치던 선수가 엉덩방아를 찧습니다. 관중들은 탄식하지만, 선수는 즉시 일어나 다음 스텝을 밟습니다. 이미 벌어진 실수는 되돌릴 수 없지만, 남은 연기는 아직 선수의 몫이기 때문입니다. 우리도 살면서 수많은 엉덩방아를 찧습니다. 중요한 건 넘어진 사실이 아니라, '그다음 무엇을 했는가'입니다. 툭 털고 일어나세요. 당신의 연기는 아직 끝나지 않았습니다."
            },
            {
                id: 3,
                title: "진정한 승리는 나 자신을 이기는 것",
                summary: "메달 색깔보다 값진 것은 어제의 나보다 성장했다는 성취감입니다. 타인과의 비교를 멈추고 온전히 나에게 집중할 때 찾아오는 내면의 평화에 대해 이야기합니다.",
                fullText: "올림픽에는 3개의 메달뿐이지만, 참가한 모든 선수에게는 각자의 드라마가 있습니다. 개인 최고 기록(Personal Best)을 경신했을 때 환호하는 선수의 모습은 때로 금메달리스트보다 더 감동적입니다. 경쟁 사회에서 비교는 필연적이지만, 건강한 멘탈을 위해서는 비교의 대상을 '타인'에서 '과거의 나'로 옮겨야 합니다. 오늘, 당신은 어제보다 조금 더 나아졌나요? 그렇다면 당신은 이미 금메달리스트입니다."
            }
        ]
    },
    en: {
        title: "Mastering Your Mind with Olympic Spirit",
        articles: [
            {
                id: 1,
                title: "Turning Anxiety into Energy",
                summary: "That heart-pounding moment at the starting line. How do elite athletes handle it? Learn cognitive reframing techniques to transform anxiety into excitement.",
                fullText: "Imagine standing at the starting line of an Olympic final. Moderate tension boosts focus, but excessive anxiety kills performance. Instead of thinking 'I'm nervous,' try telling yourself 'I'm excited, I'm ready.' The physical sensations are identical, but how your brain interprets them changes everything. Apply this 'excitement spell' to your daily challenges."
            },
            {
                id: 2,
                title: "It's Okay to Fall: Resilience",
                summary: "When a figure skater falls, what matters most is how quickly they get back up. Learn resilience: not dwelling on failure, but moving instantly to the next move.",
                fullText: "A skater falls mid-performance. The crowd gasps, but the athlete instantly rises and continues. The mistake is past; the rest of the routine is still theirs to own. We all take falls in life. What matters isn't the fall, but what you do next. Brush it off and stand up. Your performance isn't over yet."
            },
            {
                id: 3,
                title: "Victory is Overcoming Yourself",
                summary: "More valuable than any medal is the sense of beating your yesterday. Stop comparing yourself to others and find inner peace by focusing solely on your growth.",
                fullText: "There are only three medals, but every Olympian has their own story. Watching an athlete celebrate a Personal Best can be more moving than seeing a gold medalist. In a competitive society, comparison is inevitable. But for mental health, shift your comparison from 'others' to 'your past self.' Are you better than you were yesterday? Then you are already a champion."
            }
        ]
    },
    zh: {
        title: "用奥林匹克精神管理心态",
        articles: [
            {
                id: 1,
                title: "将焦虑转化为能量",
                summary: "站在起跑线上的心跳时刻。顶尖运动员如何应对？学习认知重构技巧，将焦虑转化为兴奋。",
                fullText: "想象一下站在奥运决赛的起跑线上。适度的紧张能提高注意力，但过度的焦虑会破坏表现。试着对自己说“我很兴奋，我准备好了”，而不是“我很紧张”。身体的反应是一样的，但大脑的解读方式决定了一切。在日常挑战中运用这个“兴奋咒语”吧。"
            },
            {
                id: 2,
                title: "跌倒也没关系：韧性",
                summary: "当花样滑冰运动员摔倒时，最重要的是多快能站起来。学习韧性：不沉溺于失败，而是立即进入下一个动作。",
                fullText: "滑冰选手在表演中摔倒了。观众惊呼，但选手立刻站起来继续。错误已成过去，剩下的表演仍由他们掌控。我们在生活中也会跌倒。重要的不是跌倒，而是接下来你做什么。拍拍尘土站起来。你的表演还没有结束。"
            },
            {
                id: 3,
                title: "真正的胜利是战胜自己",
                summary: "比奖牌更珍贵的是超越昨天的成就感。停止与他人比较，专注于自身的成长，寻找内心的平静。",
                fullText: "只有三枚奖牌，但每位奥林匹克选手都有自己的故事。看到运动员为刷新个人最好成绩（PB）而欢呼，有时比看到金牌得主更令人感动。在竞争激烈的社会中，通过将比较对象从“他人”转移到“过去的自己”来保持心理健康。如果你比昨天更好了，那你已经是冠军了。"
            }
        ]
    },
    ja: {
        title: "オリンピック精神でメンタルケア",
        articles: [
            {
                id: 1,
                title: "緊張感をエネルギーに変える方法",
                summary: "スタートラインに立った時の心臓が張り裂けそうな緊張感。トップアスリートはどう克服するのか？不安を「ワクワク」に変える認知再構成法を紹介します。",
                fullText: "オリンピックの決勝戦、スタートラインに立つ選手の気持ちを想像してみてください。適度な緊張は集中力を高めますが、過度な不安はパフォーマンスを低下させます。「不安だ」と考える代わりに、「興奮している、準備はできた」と自分に言い聞かせてみてください。身体的な反応は同じでも、脳の解釈が変われば結果も変わります。"
            },
            {
                id: 2,
                title: "失敗しても大丈夫：レジリエンス",
                summary: "フィギュアスケーターが転倒した時、最も重要なのは「どれだけ早く立ち上がるか」です。失敗にとらわれず、次の動作へと繋げる回復力を学びます。",
                fullText: "完璧な演技をしていた選手が転倒します。観衆は息をのみますが、選手はすぐに立ち上がり、次のステップを踏みます。起きてしまったミスは戻せませんが、残りの演技はまだ選手自身のものです。人生でも私たちは何度も転びます。重要なのは転んだ事実ではなく、「その次に何をしたか」です。立ち上がってください。あなたの演技はまだ終わっていません。"
            },
            {
                id: 3,
                title: "真の勝利とは自分自身に勝つこと",
                summary: "メダルの色よりも価値があるのは、昨日の自分より成長したという達成感です。他人との比較をやめ、自分自身に集中することで得られる内面の平和について話します。",
                fullText: "メダルは3つしかありませんが、参加した全ての選手にドラマがあります。自己ベスト（Personal Best）を更新して歓呼する選手の姿は、時に金メダリスト以上に感動的です。競争社会において比較は避けられませんが、健康なメンタルのためには比較の対象を「他人」から「過去の自分」に移すべきです。今日、あなたは昨日より少し成長しましたか？ならば、あなたはもう金メダリストです。"
            }
        ]
    },
    es: {
        title: "Gestionando tu mente con el Espíritu Olímpico",
        articles: [
            {
                id: 1,
                title: "Transformando la ansiedad en energía",
                summary: "Ese momento de corazón acelerado en la línea de salida. ¿Cómo lo manejan los atletas de élite? Aprende técnicas para redefinir la ansiedad como emoción.",
                fullText: "Imagina estar en la línea de salida de una final olímpica. La tensión moderada mejora la concentración, pero la ansiedad excesiva arruina el rendimiento. En lugar de pensar 'estoy nervioso', di 'estoy emocionado, estoy listo'. La sensación física es idéntica, pero la interpretación de tu cerebro lo cambia todo."
            },
            {
                id: 2,
                title: "Está bien caerse: Resiliencia",
                summary: "Cuando un patinador artístico se cae, lo que importa es qué tan rápido se levanta. Aprende resiliencia: no te detengas en el fallo, sigue al siguiente movimiento.",
                fullText: "Un patinador cae a mitad de la rutina. El público jadea, pero el atleta se levanta al instante y continúa. El error es pasado; el resto de la rutina sigue siendo suya. Todos caemos en la vida. Lo que importa no es la caída, sino lo que haces después. Levántate. Tu actuación aún no ha terminado."
            },
            {
                id: 3,
                title: "La verdadera victoria es superarte a ti mismo",
                summary: "Más valioso que cualquier medalla es la sensación de haber superado a tu yo de ayer. Deja de compararte con otros y encuentra la paz interior enfocándote en tu crecimiento.",
                fullText: "Solo hay tres medallas, pero cada atleta olímpico tiene su historia. Ver a un atleta celebrar una Marca Personal puede ser más conmovedor que ver a un medallista de oro. Para la salud mental, cambia tu comparación de 'los demás' a 'tu yo del pasado'. ¿Eres mejor que ayer? Entonces ya eres un campeón."
            }
        ]
    },
    fr: {
        title: "Gérer votre mental avec l'Esprit Olympique",
        articles: [
            {
                id: 1,
                title: "Transformer l'anxiété en énergie",
                summary: "Ce moment où le cœur bat la chamade sur la ligne de départ. Comment les athlètes d'élite gèrent-ils cela ? Apprenez à redéfinir l'anxiété comme de l'excitation.",
                fullText: "Imaginez-vous sur la ligne de départ d'une finale olympique. Une tension modérée améliore la concentration, mais une anxiété excessive nuit à la performance. Au lieu de penser 'je suis nerveux', dites-vous 'je suis excité, je suis prêt'. La sensation physique est identique, mais l'interprétation de votre cerveau change tout."
            },
            {
                id: 2,
                title: "Tomber n'est pas grave : Résilience",
                summary: "Quand un patineur artistique tombe, le plus important est la vitesse à laquelle il se relève. Apprenez la résilience : ne pas s'attarder sur l'échec, mais passer au mouvement suivant.",
                fullText: "Un patineur tombe en pleine performance. La foule retient son souffle, mais l'athlète se relève instantanément et continue. L'erreur est passée ; le reste de la routine lui appartient encore. Nous tombons tous dans la vie. Ce qui compte n'est pas la chute, mais ce que vous faites ensuite. Relevez-vous. Votre performance n'est pas encore terminée."
            },
            {
                id: 3,
                title: "La vraie victoire est de se vaincre soi-même",
                summary: "Plus précieux que n'importe quelle médaille est le sentiment d'avoir dépassé son soi d'hier. Arrêtez de vous comparer aux autres et trouvez la paix intérieure en vous concentrant sur votre croissance.",
                fullText: "Il n'y a que trois médailles, mais chaque athlète olympique a sa propre histoire. Voir un athlète célébrer un Record Personnel peut être plus émouvant que de voir un médaillé d'or. Pour la santé mentale, déplacez votre comparaison des 'autres' vers 'votre passé'. Êtes-vous meilleur qu'hier ? Alors vous êtes déjà un champion."
            }
        ]
    }
};

const ExpertAdvice = ({ lang }) => {
    const currentContent = content[lang] || content.en;
    const [expandedId, setExpandedId] = useState(null);

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <section style={{
            marginTop: '4rem',
            padding: '2rem',
            backgroundColor: '#fff',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            width: '100%',
            maxWidth: '800px'
        }}>
            <h2 style={{
                textAlign: 'center',
                color: 'var(--primary-color)',
                marginBottom: '2rem',
                fontSize: '1.8rem'
            }}>
                {currentContent.title}
            </h2>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
                {currentContent.articles.map((article) => (
                    <div key={article.id} style={{
                        border: '1px solid #eee',
                        borderRadius: '12px',
                        padding: '1.5rem',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        backgroundColor: expandedId === article.id ? '#f8f9fa' : 'white'
                    }}
                        onClick={() => toggleExpand(article.id)}
                    >
                        <h3 style={{
                            marginTop: 0,
                            color: '#333',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            {article.title}
                            <span style={{ fontSize: '0.8rem', color: '#888' }}>
                                {expandedId === article.id ? '▲' : '▼'}
                            </span>
                        </h3>

                        <p style={{
                            color: '#666',
                            lineHeight: '1.6',
                            display: expandedId === article.id ? 'none' : 'block'
                        }}>
                            {article.summary}
                        </p>

                        {expandedId === article.id && (
                            <div style={{ marginTop: '1rem', borderTop: '1px solid #ddd', paddingTop: '1rem' }}>
                                <p style={{ lineHeight: '1.8', color: '#444' }}>
                                    {article.fullText}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ExpertAdvice;
