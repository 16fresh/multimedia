// ------------------ 纹样数据配置 ------------------
const MOTIFS_DATA = {
    '1': {
        description: '明代万历年间 - 哥釉青花松鹿纹瓶',
        history: '“哥釉青花”是中国瓷器史上极具个性的工艺结合。它将宋代哥窑那如碎冰般自然延展的“金丝铁线”开片纹，与明代盛行的幽靓青花融为一体。瓶身上描绘的松鹿图，不仅是自然的写照，更是古人精神世界的寄托。鹿，被视为仙家的坐骑，取其“禄”之谐音，象征官禄与福缘；而松柏历经严寒而不凋，寓意意志坚韧与长寿永年。这种“松鹿同春”的构图，传达了明代文人对世俗生活圆满与自然生命长青的双重向往，是“福禄双全”这一朴素愿望的最雅致表达。',
        video: 'video_1.mp4', 
        images: {
            landing: 'landing_1.png',   
            original: 'original_1.png',  
            minimalist: 'Minimalist_result_1.png',
            cyberpunk: 'Cyberpunk_result_1.png',
            popart: 'popart_result_1.png',
            guochao: 'guochao_result_1.png'
        }
    },
    '2': {
        description: '唐代 - 双狮鸳鸯纹菱花铜镜',
        history: '唐代是铜镜制作艺术的巅峰。这枚菱花镜不仅是日常梳妆的用具，更是大唐盛世开放、包容气质的缩影。镜背纹样采用了奇妙的对称布局：威猛的狮子本是经由丝绸之路传来的西域神兽，象征着无上的威严与守护力量；而温婉的鸳鸯则是本土文化中对忠贞爱情的永恒礼赞。一刚一柔，在镜背方寸之间和谐共生。这种“刚柔并济”的构图，隐喻了家庭的稳固与情感的和谐，反映了唐人对美满姻缘的祝福以及对盛世太平景象的自信呈现。',
        video: 'video_2.mp4',
        images: {
            landing: 'landing_2.png',
            original: 'original_2.png',
            minimalist: 'Minimalist_result_2.png',
            cyberpunk: 'Cyberpunk_result_2.png',
            popart: 'popart_result_2.png',
            guochao: 'guochao_result_2.png'
        }
    },
    '3': {
        description: '战国 - 白玉夔龙纹佩',
        history: '这件白玉夔龙纹佩是战国玉雕艺术的巅峰之作。玉质温润细腻，仿佛凝结了千年的时光。纹样采用了极具动感的“S”形构图，夔龙躯体舒展弯曲，充满了张力与韵律感。在先民的信仰中，夔龙是能通天地的神兽，不仅象征着皇权与威严，更承载着驱邪避灾、守护佩戴者灵魂的深意。这种抽象而灵动的线条，恰恰体现了战国时代那份百家争鸣、自由奔放的精神特质，是东方美学中“气韵生动”的完美体现。',
        video: 'video_3.mp4',
        images: {
            landing: 'landing_3.png',
            original: 'original_3.png',
            minimalist: 'Minimalist_result_3.png',
            cyberpunk: 'Cyberpunk_result_3.png',
            popart: 'popart_result_3.png',
            guochao: 'guochao_result_3.png'
        }
    },
    '4': {
        description: '汉代 - 朱雀纹空心砖瓦当',
        history: '在汉代人的精神宇宙中，朱雀是镇守南方的神鸟，更是火的化身与不朽的象征。作为建筑构件的瓦当，不仅起着遮风挡雨的实用作用，更是一家人祈求神灵护佑的“护身符”。这枚瓦当上的朱雀舒展双翼，姿态雄健，仿佛正欲破空而出，展现了汉代艺术特有的那种昂扬向上、浪漫奔放的生命力。红色的朱雀纹样不仅象征着红火的生活与吉祥的兆头，更寄托了先民希望家宅避邪纳福、生命如火般生生不息的美好愿景。',
        video: 'video_4.mp4',
        images: {
            landing: 'landing_4.png',
            original: 'original_4.png',
            minimalist: 'Minimalist_result_4.png',
            cyberpunk: 'Cyberpunk_result_4.png',
            popart: 'popart_result_4.png',
            guochao: 'guochao_result_4.png'
        }
    }
};

// ------------------ 页面初始化 ------------------
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const motifId = urlParams.get('motif') || '1';
    const motifData = MOTIFS_DATA[motifId] || MOTIFS_DATA['1'];
    
    if (motifData) {
        // 1. 加载首页展示图 (landing)
        const landingImg = document.getElementById('landing-img');
        if (landingImg) landingImg.src = `images/${motifData.images.landing}`;
        
        // 2. 加载首页视频 (mp4)
        const videoEl = document.getElementById('landing-video');
        if (videoEl) videoEl.src = `videos/${motifData.video}`;

        // 3. 加载背景页图片 (original)
        const historyImg = document.getElementById('history-img');
        if (historyImg) historyImg.src = `images/${motifData.images.original}`;
        
        // 4. 加载各个风格结果图
        document.querySelector('#minimalist img').src = `images/${motifData.images.minimalist}`;
        document.querySelector('#cyberpunk img').src = `images/${motifData.images.cyberpunk}`;
        document.querySelector('#popart img').src = `images/${motifData.images.popart}`;
        document.querySelector('#guochao img').src = `images/${motifData.images.guochao}`;

        // 5. 更新文本内容
        const titleEl = document.querySelector('.motif-description strong');
        if (titleEl) titleEl.textContent = motifData.description;
        
        const historyTextEl = document.getElementById('history-text');
        if (historyTextEl) historyTextEl.textContent = motifData.history;
    }
});

// ------------------ 交互逻辑 ------------------

// 播放首页视频
function playLandingVideo() {
    const videoEl = document.getElementById('landing-video');
    const btn = document.getElementById('ai-video-btn');
    if (videoEl) {
        videoEl.classList.remove('hidden');
        videoEl.play();
        if (btn) btn.classList.add('hidden'); 
    }
}

// 切换页面时重置媒体状态（停止视频和朗读）
function resetMedia() {
    stopReading();
    const videoEl = document.getElementById('landing-video');
    const btn = document.getElementById('ai-video-btn');
    if (videoEl) {
        videoEl.pause();
        videoEl.currentTime = 0;
        videoEl.classList.add('hidden');
    }
    if (btn) btn.classList.remove('hidden');
}

// 显示结果页
function showResult(styleId) {
    resetMedia();
    document.getElementById('selection-header').classList.add('hidden');
    document.querySelector('.style-selector').classList.add('hidden');
    document.querySelectorAll('.result-display').forEach(el => el.classList.add('hidden'));
    document.getElementById(styleId).classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 显示背景回望页
function showHistory() {
    resetMedia();
    document.getElementById('selection-header').classList.add('hidden');
    document.querySelector('.style-selector').classList.add('hidden');
    document.querySelectorAll('.result-display').forEach(el => el.classList.add('hidden'));
    document.getElementById('history-display').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 返回选择首页
function showSelector() {
    resetMedia();
    document.querySelectorAll('.result-display').forEach(el => el.classList.add('hidden'));
    document.getElementById('selection-header').classList.remove('hidden');
    document.querySelector('.style-selector').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ------------------ 语音功能 ------------------
function stopReading() { if (window.speechSynthesis) window.speechSynthesis.cancel(); }
function readPageContent() {
    stopReading();
    const currentDisplay = document.querySelector('.result-display:not(.hidden)');
    const textToRead = currentDisplay ? currentDisplay.innerText : document.querySelector('.container').innerText;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'zh-CN';
    window.speechSynthesis.speak(utterance);
}
