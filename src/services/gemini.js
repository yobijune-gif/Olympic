import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the API client
// Ideally, use import.meta.env.VITE_GEMINI_API_KEY
// For now, we'll check if it exists, otherwise fallback to mock/error
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const analyzePersonality = async (text, language = 'ko') => {
    if (!API_KEY) {
        console.warn("No API Key found. Returning mock data.");
        return mockAnalyze(text, language);
    }

    try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
[Role]
You are an expert on the 2026 Milan-Cortina Winter Olympics and a psychological analyst. Your role is to match the user's personality with an athlete currently excelling in the Olympics.

[Knowledge Base - Real-time Data as of Feb 17, 2026]
- South Korea: Hwang Dae-heon (Speed Skating 1500m Silver), Choi Min-jeong (Cruising), Team Kim (Curling, heated battle).
- Global Issues: Norway 1st overall (over 10 Gold medals), Italy (Host) strong in Figure Skating/Sledding.
- Key Athletes: Mikaela Shiffrin (Skiing), Riku Miura / Ryuichi Kihara (Figure Skating).

[User Input]
"${text}"

[Output Format - STRICTLY JSON]
{
  "match_name": "Athlete Name (Country)",
  "achievement": "Current Medal or Career High",
  "reason": "2 lines on why they match the user",
  "cheer_message": "Olympic-level cheering for the user",
  "link": "Official Highlight URL or result page"
}

[Rule]
1. If the user asks in Korean, answer in Korean. If in English, answer in English. (Current requested language code: ${language})
2. Analysis must be very positive and dynamic.
3. Return ONLY the JSON string, no markdown formatting.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const textResponse = response.text();

        // Clean up potential markdown code blocks if Gemini mimics them
        const jsonString = textResponse.replace(/```json|```/g, "").trim();
        return JSON.parse(jsonString);

    } catch (error) {
        console.error("Gemini API Error:", error);
        throw error;
    }
};

const mockAnalyze = (text, language) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const athlete = getRandomAthlete(language);
            resolve(athlete);
        }, 1500);
    });
};

const getRandomAthlete = (langCode) => {
    // Fallback to English if language not supported in data
    const lang = ['ko', 'en', 'zh', 'ja', 'es', 'fr'].includes(langCode) ? langCode : 'en';

    const athletes = [
        {
            name: { ko: "황대헌 (대한민국)", en: "Hwang Dae-heon (South Korea)", zh: "黄大宪 (韩国)", ja: "ファン・デホン (韓国)", es: "Hwang Dae-heon (Corea del Sur)", fr: "Hwang Dae-heon (Corée du Sud)" },
            achievement: { ko: "쇼트트랙 1500m 은메달", en: "Short Track 1500m Silver Medal", zh: "短道速滑 1500米 银牌", ja: "ショートトラック 1500m 銀メダル", es: "Medalla de plata en 1500m de pista corta", fr: "Médaille d'argent 1500m piste courte" },
            reason: { ko: "당신의 뜨거운 열정과 경쟁심이 빙판 위의 폭발적인 에너지를 가진 황대헌 선수와 꼭 닮았습니다!", en: "Your explosive energy and competitive drive perfectly match Hwang Dae-heon on the ice!", zh: "您的爆发力和竞争动力与冰上的黄大宪完美匹配！", ja: "あなたの爆発的なエネルギーと競争心は、氷上のファン・デホン選手とぴったりです！", es: "¡Tu energía explosiva y tu espíritu competitivo coinciden perfectamente con Hwang Dae-heon en el hielo!", fr: "Votre énergie explosive et votre esprit de compétition correspondent parfaitement à Hwang Dae-heon sur la glace !" },
            cheer_message: { ko: "당신의 인생도 금빛 질주를 응원합니다! 끝까지 포기하지 마세요!", en: "We cheer for your golden sprint in life!", zh: "我们为您人生中的金色冲刺加油！", ja: "人生のゴールデンスプリントを応援します！", es: "¡Te animamos en tu carrera dorada de la vida!", fr: "Nous encourageons votre sprint doré dans la vie !" },
            link: "https://olympics.com/en/athletes/daeheon-hwang"
        },
        {
            name: { ko: "최가온 (대한민국)", en: "Choi Ga-on (South Korea)", zh: "崔佳恩 (韩国)", ja: "チェ・ガオン (韓国)", es: "Choi Ga-on (Corea del Sur)", fr: "Choi Ga-on (Corée du Sud)" },
            achievement: { ko: "스노보드 하프파이프 신성", en: "Snowboard Halfpipe Rising Star", zh: "单板滑雪半管新星", ja: "スノーボード・ハーフパイプの新星", es: "Estrella naciente del Halfpipe", fr: "Étoile montante du Halfpipe" },
            reason: { ko: "무한한 잠재력으로 세상을 놀라게 하는 당신, 최가온 선수처럼 겁 없이 도전하는 모습이 멋집니다.", en: "Surprising the world with infinite potential, your fearless challenge resembles Choi Ga-on.", zh: "以无限潜力惊艳世界，您无畏挑战的样子像极了崔佳恩。", ja: "無限の可能性で世界を驚かせるあなた、チェ・ガオン選手のように恐れずに挑戦する姿が素敵です。", es: "Sorprendiendo al mundo con un potencial infinito, tu desafío intrépido se parece a Choi Ga-on.", fr: "Surprenant le monde avec un potentiel infini, votre défi intrépide ressemble à Choi Ga-on." },
            cheer_message: { ko: "더 높이 날아오를 당신의 미래를 응원합니다!", en: "Cheering for your future that will soar higher!", zh: "为您飞得更高的未来加油！", ja: "もっと高く舞い上がるあなたの未来を応援します！", es: "¡Animando tu futuro para que vueles más alto!", fr: "Encourageant votre avenir qui s'élèvera plus haut !" },
            link: "https://olympics.com/en/athletes/gaon-choi"
        },
        {
            name: { ko: "미카엘라 시프린 (미국)", en: "Mikaela Shiffrin (USA)", zh: "米凯拉·席弗琳 (美国)", ja: "ミカエラ・シフリン (アメリカ)", es: "Mikaela Shiffrin (EE. UU.)", fr: "Mikaela Shiffrin (États-Unis)" },
            achievement: { ko: "알파인 스키의 여제", en: "Alpine Skiing Queen", zh: "高山滑雪女皇", ja: "アルペンスキーの女王", es: "Reina del esquí alpino", fr: "Reine du ski alpin" },
            reason: { ko: "완벽을 추구하며 꾸준히 정상을 지키는 당신은 시프린과 같습니다.", en: "Pursuing perfection and staying at the top, you are like Shiffrin.", zh: "追求完美并保持巅峰，您就像席弗琳。", ja: "完璧を追求し、常にトップを維持するあなたはシフリンのようです。", es: "Persiguiendo la perfección y manteniéndote en la cima, eres como Shiffrin.", fr: "Poursuivant la perfection et restant au sommet, vous êtes comme Shiffrin." },
            cheer_message: { ko: "흔들리지 않는 멘탈로 당신만의 기록을 써 내려가세요!", en: "Write your own record with an unshakable mentality!", zh: "以不可动摇的心态写下属于您的纪录！", ja: "揺るぎないメンタルで、あなただけの記録を刻んでください！", es: "¡Escribe tu propio récord con una mentalidad inquebrantable!", fr: "Écrivez votre propre record avec une mentalité inébranlable !" },
            link: "https://olympics.com/en/athletes/mikaela-shiffrin"
        },
        {
            name: { ko: "아일린 구 (중국)", en: "Eileen Gu (China)", zh: "谷爱凌 (中国)", ja: "アイリーン・グー (中国)", es: "Eileen Gu (China)", fr: "Eileen Gu (Chine)" },
            achievement: { ko: "프리스타일 스키 2관왕", en: "Freestyle Skiing Double Gold", zh: "自由式滑雪双料冠军", ja: "フリースタイルスキー2冠", es: "Doble oro en esquí acrobático", fr: "Double or en ski acrobatique" },
            reason: { ko: "다재다능하고 창의적인 당신, 아일린 구처럼 스타일리시합니다.", en: "Versatile and creative, you are stylish like Eileen Gu.", zh: "多才多艺且富有创意，您像谷爱凌一样时尚。", ja: "多才で創造的なあなた、アイリーン・グーのようにスタイリッシュです。", es: "Versátil y creativo, eres elegante como Eileen Gu.", fr: "Polyvalent et créatif, vous êtes élégant comme Eileen Gu." },
            cheer_message: { ko: "세상을 당신만의 무대로 만드세요!", en: "Make the world your stage!", zh: "让世界成为您的舞台！", ja: "世界をあなたの舞台にしてください！", es: "¡Haz del mundo tu escenario!", fr: "Faites du monde votre scène !" },
            link: "https://olympics.com/en/athletes/eileen-gu"
        },
        {
            name: { ko: "고바야시 료유 (일본)", en: "Ryoyu Kobayashi (Japan)", zh: "小林陵侑 (日本)", ja: "小林陵侑 (日本)", es: "Ryoyu Kobayashi (Japón)", fr: "Ryoyu Kobayashi (Japon)" },
            achievement: { ko: "스키점프 그랜드슬래머", en: "Ski Jumping Grand Slammer", zh: "跳台滑雪大满贯", ja: "スキージャンプ・グランドスラマー", es: "Grand Slam de salto de esquí", fr: "Grand Chelem de saut à ski" },
            reason: { ko: "높은 목표를 향해 비상하는 당신, 료유의 담대함을 닮았습니다.", en: "Soaring towards high goals, you resemble Ryoyu's boldness.", zh: "向着高远目标飞翔，您有着小林陵侑的胆识。", ja: "高い目標に向かって飛翔するあなた、陵侑の度胸に似ています。", es: "Elevándote hacia metas altas, te pareces a la audacia de Ryoyu.", fr: "S'élevant vers des objectifs élevés, vous ressemblez à l'audace de Ryoyu." },
            cheer_message: { ko: "더 높이, 더 멀리! 한계는 없습니다.", en: "Higher, further! No limits.", zh: "更高，更远！没有极限。", ja: "より高く、より遠くへ！限界はありません。", es: "¡Más alto, más lejos! Sin límites.", fr: "Plus haut, plus loin ! Sans limites." },
            link: "https://olympics.com/en/athletes/ryoyu-kobayashi"
        },
        {
            name: { ko: "수잔 슐팅 (네덜란드)", en: "Suzanne Schulting (Netherlands)", zh: "苏珊娜·舒尔廷 (荷兰)", ja: "スザンヌ・シュルティング (オランダ)", es: "Suzanne Schulting (Países Bajos)", fr: "Suzanne Schulting (Pays-Bas)" },
            achievement: { ko: "쇼트트랙의 지배자", en: "Short Track Dominator", zh: "短道速滑统治者", ja: "ショートトラックの支配者", es: "Dominadora de pista corta", fr: "Dominatrice de piste courte" },
            reason: { ko: "압도적인 실력과 리더십, 당신은 슐팅과 같습니다.", en: "Overwhelming skill and leadership, you are like Schulting.", zh: "压倒性的实力和领导力，您就像舒尔廷。", ja: "圧倒的な実力とリーダーシップ、あなたはシュルティングのようです。", es: "Habilidad y liderazgo abrumadores, eres como Schulting.", fr: "Compétence et leadership écrasants, vous êtes comme Schulting." },
            cheer_message: { ko: "자신을 믿고 전력 질주하세요!", en: "Believe in yourself and sprint!", zh: "相信自己，全力冲刺！", ja: "自分を信じて全力疾走してください！", es: "¡Cree en ti mismo y corre!", fr: "Croyez en vous et sprintez !" },
            link: "https://olympics.com/en/athletes/suzanne-schulting"
        },
        {
            name: { ko: "클로이 김 (미국)", en: "Chloe Kim (USA)", zh: "克洛伊·金 (美国)", ja: "クロエ・キム (アメリカ)", es: "Chloe Kim (EE. UU.)", fr: "Chloe Kim (États-Unis)" },
            achievement: { ko: "스노보드 하프파이프 2연패", en: "Snowboard Halfpipe 2x Gold", zh: "单板滑雪半管两连冠", ja: "スノーボード・ハーフパイプ2連覇", es: "Doble oro en Halfpipe", fr: "Double or en Halfpipe" },
            reason: { ko: "자유롭고 쾌활한 성격으로 압도적인 퍼포먼스를 보여주는 당신!", en: "With a free and cheerful personality, you show overwhelming performance!", zh: "性格开朗自由，表现出压倒性的表现！", ja: "自由で快活な性格で圧倒的なパフォーマンスを見せるあなた！", es: "¡Con una personalidad libre y alegre, muestras un rendimiento abrumador!", fr: "Avec une personnalité libre et joyeuse, vous montrez une performance écrasante !" },
            cheer_message: { ko: "즐기는 자를 이길 수는 없습니다. 즐기세요!", en: "You can't beat someone who enjoys it. Enjoy!", zh: "乐在其中的人是无敌的。享受吧！", ja: "楽しむ者には勝てません。楽しんで！", es: "No puedes vencer a alguien que lo disfruta. ¡Disfruta!", fr: "Vous ne pouvez pas battre quelqu'un qui aime ça. Profitez-en !" },
            link: "https://olympics.com/en/athletes/chloe-kim"
        },
        {
            name: { ko: "네이선 첸 (미국)", en: "Nathan Chen (USA)", zh: "陈巍 (美国)", ja: "ネイサン・チェン (アメリカ)", es: "Nathan Chen (EE. UU.)", fr: "Nathan Chen (États-Unis)" },
            achievement: { ko: "피겨 스케이팅 점프 머신", en: "Figure Skating Jump Machine", zh: "花样滑冰跳跃机器", ja: "フィギュアスケートのジャンプマシーン", es: "Máquina de saltos de patinaje", fr: "Machine à sauts de patinage" },
            reason: { ko: "치밀한 계산과 완벽한 기술을 구사하는 당신은 네이선 첸과 닮았습니다.", en: "Executing precise calculations and perfect technique, you resemble Nathan Chen.", zh: "运用精密计算和完美技术的您，像极了陈巍。", ja: "緻密な計算と完璧な技術を駆使するあなたは、ネイサン・チェンに似ています。", es: "Ejecutando cálculos precisos y técnica perfecta, te pareces a Nathan Chen.", fr: "Exécutant des calculs précis et une technique parfaite, vous ressemblez à Nathan Chen." },
            cheer_message: { ko: "당신의 노력은 배신하지 않습니다. 완벽을 향해!", en: "Your efforts won't betray you. Towards perfection!", zh: "您的努力不会背叛您。向着完美！", ja: "あなたの努力は裏切りません。完璧を目指して！", es: "Tus esfuerzos no te traicionarán. ¡Hacia la perfección!", fr: "Vos efforts ne vous trahiront pas. Vers la perfection !" },
            link: "https://olympics.com/en/athletes/nathan-chen"
        },
        {
            name: { ko: "윤성빈 (대한민국)", en: "Yun Sung-bin (South Korea)", zh: "尹诚彬 (韩国)", ja: "ユン・ソンビン (韓国)", es: "Yun Sung-bin (Corea del Sur)", fr: "Yun Sung-bin (Corée du Sud)" },
            achievement: { ko: "스켈레톤 황제", en: "Iron Man of Skeleton", zh: "钢架雪车皇帝", ja: "スケルトンの皇帝", es: "El emperador del Skeleton", fr: "L'empereur du Skeleton" },
            reason: { ko: "폭발적인 파워와 집중력으로 목표를 향해 돌진하는 당신!", en: "Charging towards goals with explosive power and focus!", zh: "以爆发性的力量和集中力向目标冲刺的您！", ja: "爆発的なパワーと集中力で目標に向かって突進するあなた！", es: "¡Cargando hacia las metas con poder explosivo y concentración!", fr: "Fonçant vers les objectifs avec une puissance explosive et de la concentration !" },
            cheer_message: { ko: "누구보다 빠르게, 남들과는 다르게!", en: "Faster than anyone, different from others!", zh: "比谁都快，与众不同！", ja: "誰よりも速く、他人とは違うように！", es: "¡Más rápido que nadie, diferente a los demás!", fr: "Plus vite que quiconque, différent des autres !" },
            link: "https://olympics.com/en/athletes/sungbin-yun"
        },
        {
            name: { ko: "김연아 (대한민국)", en: "Yuna Kim (South Korea)", zh: "金妍儿 (韩国)", ja: "キム・ヨナ (韓国)", es: "Yuna Kim (Corea del Sur)", fr: "Yuna Kim (Corée du Sud)" },
            achievement: { ko: "피겨 스케이팅의 전설", en: "Figure Skating Legend", zh: "花样滑冰传奇", ja: "フィギュアスケートの伝説", es: "Leyenda del patinaje artístico", fr: "Légende du patinage artistique" },
            reason: { ko: "우아함 속에 강인한 내면을 지닌 당신, 영원한 퀸 연아와 같습니다.", en: "Elegant yet strong inside, you are like the eternal Queen Yuna.", zh: "优雅中蕴含坚强内心的您，就像永远的女王金妍儿。", ja: "優雅さの中に強い内面を持つあなた、永遠のクイーン・ヨナのようです。", es: "Elegante pero fuerte por dentro, eres como la eterna Reina Yuna.", fr: "Élégant mais fort à l'intérieur, vous êtes comme l'éternelle Reine Yuna." },
            cheer_message: { ko: "당신의 존재만으로도 빛이 납니다.", en: "You shine just by being you.", zh: "您的存在本身就在发光。", ja: "あなたの存在だけで輝いています。", es: "Brillas solo por ser tú.", fr: "Vous brillez juste en étant vous." },
            link: "https://olympics.com/en/athletes/yuna-kim"
        },
        {
            name: { ko: "하뉴 유즈루 (일본)", en: "Yuzuru Hanyu (Japan)", zh: "羽生结弦 (日本)", ja: "羽生結弦 (日本)", es: "Yuzuru Hanyu (Japón)", fr: "Yuzuru Hanyu (Japon)" },
            achievement: { ko: "피겨 스케이팅 올림픽 2연패", en: "2x Olympic Figure Skating Champion", zh: "花样滑冰奥运两连冠", ja: "フィギュアスケート五輪2連覇", es: "Doble campeón olímpico de patinaje", fr: "Double champion olympique de patinage" },
            reason: { ko: "예술과 기술의 경지를 넘어선 당신, 하뉴와 같은 몰입력을 가졌군요.", en: "Going beyond art and technique, you have Hanyu's immersion.", zh: "超越艺术与技术境界的您，拥有羽生般的投入力。", ja: "芸術と技術の境地を超えたあなた、羽生のような没入力を持っていますね。", es: "Yendo más allá del arte y la técnica, tienes la inmersión de Hanyu.", fr: "Allant au-delà de l'art et de la technique, vous avez l'immersion de Hanyu." },
            cheer_message: { ko: "당신의 열정은 전설이 될 것입니다.", en: "Your passion will become a legend.", zh: "您的热情将成为传奇。", ja: "あなたの情熱は伝説になるでしょう。", es: "Tu pasión se convertirá en leyenda.", fr: "Votre passion deviendra une légende." },
            link: "https://olympics.com/en/athletes/yuzuru-hanyu"
        },
        {
            name: { ko: "숀 화이트 (미국)", en: "Shaun White (USA)", zh: "肖恩·怀特 (美国)", ja: "ショーン・ホワイト (アメリカ)", es: "Shaun White (EE. UU.)", fr: "Shaun White (États-Unis)" },
            achievement: { ko: "스노보드 황제", en: "Snowboarding Legend", zh: "单板滑雪传奇", ja: "スノーボードの伝説", es: "Leyenda del snowboard", fr: "Légende du snowboard" },
            reason: { ko: "끝없는 도전과 혁신, 당신은 숀 화이트처럼 한계를 모릅니다.", en: "Endless challenge and innovation, unknown limits like Shaun White.", zh: "无尽的挑战与创新，您像肖恩·怀特一样不知极限。", ja: "果てしない挑戦と革新、あなたはショーン・ホワイトのように限界を知りません。", es: "Desafío e innovación interminables, límites desconocidos como Shaun White.", fr: "Défis et innovations sans fin, limites inconnues comme Shaun White." },
            cheer_message: { ko: "마지막 순간까지 최선을 다하는 당신이 챔피언!", en: "Giving your best until the end, you are a champion!", zh: "拼搏到最后一刻的您就是冠军！", ja: "最後の瞬間まで全力を尽くすあなたがチャンピオン！", es: "¡Dando lo mejor hasta el final, eres un campeón!", fr: "En donnant le meilleur jusqu'à la fin, vous êtes un champion !" },
            link: "https://olympics.com/en/athletes/shaun-white"
        },
        {
            name: { ko: "이상화 (대한민국)", en: "Lee Sang-hwa (South Korea)", zh: "李相花 (韩国)", ja: "イ・サンファ (韓国)", es: "Lee Sang-hwa (Corea del Sur)", fr: "Lee Sang-hwa (Corée du Sud)" },
            achievement: { ko: "빙속 여제", en: "Speed Skating Empress", zh: "速滑女皇", ja: "スピードスケートの女帝", es: "Emperatriz del patinaje de velocidad", fr: "Impératrice du patinage de vitesse" },
            reason: { ko: "자신과의 싸움에서 이겨내는 강인한 정신력의 소유자!", en: "Possessor of strong mental power overcoming self-battles!", zh: "战胜自我的坚强意志拥有者！", ja: "自分との戦いに勝つ強靭な精神力の持ち主！", es: "¡Poseedor de un fuerte poder mental que supera las batallas internas!", fr: "Possesseur d'un fort pouvoir mental surmontant les batailles intérieures !" },
            cheer_message: { ko: "전설로 기억될 당신의 오늘을 응원합니다.", en: "Cheering for your today that will be remembered as legend.", zh: "为您将被铭记为传奇的今天加油。", ja: "伝説として記憶されるあなたの今日を応援します。", es: "Animando tu hoy que será recordado como leyenda.", fr: "Encourageant votre aujourd'hui qui restera dans les mémoires comme une légende." },
            link: "https://olympics.com/en/athletes/sang-hwa-lee"
        },
        {
            name: { ko: "에스터 레데츠카 (체코)", en: "Ester Ledecká (Czech Republic)", zh: "埃斯特尔·莱德茨卡 (捷克)", ja: "エステル・レデツカ (チェコ)", es: "Ester Ledecká (República Checa)", fr: "Ester Ledecká (République tchèque)" },
            achievement: { ko: "스키 & 스노보드 동시 석권", en: "Ski & Snowboard Dual Champ", zh: "滑雪与单板双料冠军", ja: "スキー＆スノーボード二刀流", es: "Doble campeona de esquí y snowboard", fr: "Double championne de ski et de snowboard" },
            reason: { ko: "불가능을 가능으로 만드는 다재다능함, 당신은 레데츠카입니다.", en: "Making the impossible possible, versatile like Ledecká.", zh: "化不可能为可能的多才多艺，您就是莱德茨卡。", ja: "不可能を可能にする多才さ、あなたはレデツカです。", es: "Haciendo posible lo imposible, versátil como Ledecká.", fr: "Rendre l'impossible possible, polyvalente comme Ledecká." },
            cheer_message: { ko: "고정관념을 깨고 새로운 역사를 쓰세요!", en: "Break stereotypes and write new history!", zh: "打破固有观念，书写新历史！", ja: "固定観念を破り、新しい歴史を書いてください！", es: "¡Rompe los estereotipos y escribe una nueva historia!", fr: "Brisez les stéréotypes et écrivez une nouvelle histoire !" },
            link: "https://olympics.com/en/athletes/ester-ledecka"
        },
        {
            name: { ko: "마르셀 히르셔 (오스트리아)", en: "Marcel Hirscher (Austria)", zh: "马塞尔·希尔舍 (奥地利)", ja: "マルセル・ヒルシャー (オーストリア)", es: "Marcel Hirscher (Austria)", fr: "Marcel Hirscher (Autriche)" },
            achievement: { ko: "알파인 스키의 거인", en: "Giant of Alpine Skiing", zh: "高山滑雪巨人", ja: "アルペンスキーの巨人", es: "Gigante del esquí alpino", fr: "Géant du ski alpin" },
            reason: { ko: "압도적인 기술과 꾸준함, 당신은 진정한 마스터입니다.", en: "Overwhelming technique and consistency, you are a true master.", zh: "压倒性的技术和稳定性，您是真正的大师。", ja: "圧倒的な技術と着実さ、あなたは真のマスターです。", es: "Técnica abrumadora y consistencia, eres un verdadero maestro.", fr: "Technique écrasante et constance, vous êtes un vrai maître." },
            cheer_message: { ko: "정상에서도 멈추지 않는 열정을 응원합니다.", en: "Cheering for your passion that never stops at the top.", zh: "为您巅峰不止的热情加油。", ja: "頂点でも止まらない情熱を応援します。", es: "Animando tu pasión que nunca se detiene en la cima.", fr: "Encourageant votre passion qui ne s'arrête jamais au sommet." },
            link: "https://olympics.com/en/athletes/marcel-hirscher"
        },
        {
            name: { ko: "테사 버츄 & 스캇 모이어 (캐나다)", en: "Virtue & Moir (Canada)", zh: "沃尔图 & 莫伊尔 (加拿大)", ja: "ヴァーチュ & モイア (カナダ)", es: "Virtue & Moir (Canadá)", fr: "Virtue & Moir (Canada)" },
            achievement: { ko: "아이스 댄싱의 전설", en: "Ice Dance Legends", zh: "冰舞传奇", ja: "アイスダンスの伝説", es: "Leyendas de la danza sobre hielo", fr: "Légendes de la danse sur glace" },
            reason: { ko: "환상적인 호흡과 파트너십을 중시하는 당신!", en: "Valuing fantastic chemistry and partnership!", zh: "重视梦幻般的默契与合作的您！", ja: "幻想的な呼吸とパートナーシップを重視するあなた！", es: "¡Valorando la química fantástica y la asociación!", fr: "Valorisant une alchimie fantastique et un partenariat !" },
            cheer_message: { ko: "함께할 때 더 빛나는 당신을 응원합니다.", en: "Cheering for you, shining brighter together.", zh: "为您在一起时更闪耀的样子加油。", ja: "共にいるとき、より輝くあなたを応援します。", es: "Animándote, brillando más juntos.", fr: "Vous encourageant, brillant plus fort ensemble." },
            link: "https://olympics.com/en/athletes/tessa-virtue"
        },
        {
            name: { ko: "스벤 크라머 (네덜란드)", en: "Sven Kramer (Netherlands)", zh: "斯文·克拉默 (荷兰)", ja: "スベン・クラマー (オランダ)", es: "Sven Kramer (Países Bajos)", fr: "Sven Kramer (Pays-Bas)" },
            achievement: { ko: "스피드 스케이팅의 황제", en: "Emperor of Speed Skating", zh: "速滑皇帝", ja: "スピードスケートの皇帝", es: "Emperador del patinaje de velocidad", fr: "Empereur du patinage de vitesse" },
            reason: { ko: "지치지 않는 체력과 끈기로 목표를 달성하는 당신.", en: "Achieving goals with tireless stamina and persistence.", zh: "以不知疲倦的体力和毅力达成目标的您。", ja: "疲れを知らない体力と粘り強さで目標を達成するあなた。", es: "Logrando metas con resistencia incansable y persistencia.", fr: "Atteindre les objectifs avec une endurance inlassable et de la persévérance." },
            cheer_message: { ko: "롱런하는 당신의 인생을 응원합니다!", en: "Cheering for your long-running life!", zh: "为您长跑般的人生加油！", ja: "ロングランするあなたの人生を応援します！", es: "¡Animando tu vida de larga duración!", fr: "Encourageant votre vie de longue durée !" },
            link: "https://olympics.com/en/athletes/sven-kramer"
        },
        {
            name: { ko: "카밀 스토흐 (폴란드)", en: "Kamil Stoch (Poland)", zh: "卡米尔·斯托赫 (波兰)", ja: "カミル・ストッホ (ポーランド)", es: "Kamil Stoch (Polonia)", fr: "Kamil Stoch (Pologne)" },
            achievement: { ko: "스키점프 3관왕", en: "Ski Jumping 3x Gold", zh: "跳台滑雪三冠王", ja: "スキージャンプ3冠", es: "Triple oro en salto de esquí", fr: "Triple or en saut à ski" },
            reason: { ko: "조용하지만 강한 카리스마, 스토흐와 같은 집중력을 가지셨군요.", en: "Quiet but strong charisma, you have Stoch's focus.", zh: "安静却强大的魅力，您拥有斯托赫般的集中力。", ja: "静かだが強いカリスマ、ストッホのような集中力を持っていますね。", es: "Carisma tranquilo pero fuerte, tienes la concentración de Stoch.", fr: "Charisme calme mais fort, vous avez la concentration de Stoch." },
            cheer_message: { ko: "당신의 비상은 이제 시작입니다.", en: "Your flight is just beginning.", zh: "您的飞翔现在才开始。", ja: "あなたの飛翔は今からです。", es: "Tu vuelo apenas comienza.", fr: "Votre vol ne fait que commencer." },
            link: "https://olympics.com/en/athletes/kamil-stoch"
        },
        {
            name: { ko: "미카엘 킹스버리 (캐나다)", en: "Mikaël Kingsbury (Canada)", zh: "米卡埃尔·金斯伯里 (加拿大)", ja: "ミカエル・キングズベリー (カナダ)", es: "Mikaël Kingsbury (Canadá)", fr: "Mikaël Kingsbury (Canada)" },
            achievement: { ko: "모굴 스키 최강자", en: "Mogul Skiing King", zh: "雪上技巧之王", ja: "モーグルスキー最強者", es: "Rey del esquí moguls", fr: "Roi du ski de bosses" },
            reason: { ko: "어떤 굴곡진 길도 유연하게 헤쳐나가는 당신!", en: "Navigating any bumpy road flexibly!", zh: "灵活应对任何崎岖道路的您！", ja: "どんな凸凹道も柔軟に乗り越えるあなた！", es: "¡Navegando cualquier camino lleno de baches con flexibilidad!", fr: "Naviguer sur n'importe quelle route cahoteuse avec flexibilité !" },
            cheer_message: { ko: "거침없는 질주를 응원합니다!", en: "Cheering for your unstoppable run!", zh: "为您勇往直前的疾驰加油！", ja: "よどみない疾走を応援します！", es: "¡Animando tu carrera imparable!", fr: "Encourageant votre course imparable !" },
            link: "https://olympics.com/en/athletes/mikael-kingsbury"
        },
        {
            name: { ko: "숀 화이트 (미국)", en: "Shaun White (USA)", zh: "肖恩·怀特 (美国)", ja: "ショーン・ホワイト (アメリカ)", es: "Shaun White (EE. UU.)", fr: "Shaun White (États-Unis)" },
            achievement: { ko: "스노보드 레전드", en: "Snowboard Legend", zh: "单板滑雪传奇", ja: "スノーボードの伝説", es: "Leyenda del snowboard", fr: "Légende du snowboard" },
            reason: { ko: "압도적인 퍼포먼스와 끊임없는 도전, 당신은 숀 화이트입니다.", en: "Overwhelming performance and constant challenge, you are Shaun White.", zh: "压倒性的表现和不断的挑战，您就是肖恩·怀特。", ja: "圧倒的なパフォーマンスと絶え間ない挑戦、あなたはショーン・ホワイトです。", es: "Rendimiento abrumador y desafío constante, eres Shaun White.", fr: "Performance écrasante et défi constant, vous êtes Shaun White." },
            cheer_message: { ko: "전설을 넘어 신화가 되세요!", en: "Become a myth beyond a legend!", zh: "超越传奇，成为神话！", ja: "伝説を超えて神話になれ！", es: "¡Conviértete en un mito más allá de una leyenda!", fr: "Devenez un mythe au-delà d'une légende !" },
            link: "https://olympics.com/en/athletes/shaun-white"
        }
    ];

    const randomAthlete = athletes[Math.floor(Math.random() * athletes.length)];

    return {
        match_name: randomAthlete.name[lang] || randomAthlete.name['en'],
        achievement: randomAthlete.achievement[lang] || randomAthlete.achievement['en'],
        reason: randomAthlete.reason[lang] || randomAthlete.reason['en'],
        cheer_message: randomAthlete.cheer_message[lang] || randomAthlete.cheer_message['en'],
        link: randomAthlete.link
    };
};
