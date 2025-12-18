// ------------------ 纹样数据配置 ------------------
const MOTIFS_DATA = {
    '1': {
        description: '明代万历年间 - 哥釉青花松鹿纹瓶',
        history: '“哥釉青花”是其釉色与工艺风格的一种。鹿取“禄”之谐音，象征“福禄”；松柏寓意长寿，寓意“福禄双全”。',
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
        history: '唐代铜镜制作达到巅峰。双狮象征威武，鸳鸯寓意忠贞，整体象征圆满和谐。',
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
        history: '质地细腻，夔龙纹呈S形构图，既具抽象装饰性，又体现神兽守护的象征意义。',
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
        history: '朱雀代表南方和火，象征吉祥。瓦当是古代建筑构件，用于避邪纳福。',
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


