const MOTIFS_DATA = {
    '1': {
        description: '明代万历年间 - 哥釉青花松鹿纹瓶',
        history: '“哥釉青花”是其釉色与工艺风格。鹿取“禄”之谐音，象征“福禄”；松柏寓意长寿。',
        video: 'video_1.mp4', // 首页视频
        images: {
            landing: 'landing_1.png',   // 首页图
            original: 'original_1.png', // 背景图
            minimalist: 'Minimalist_result_1.png',
            cyberpunk: 'Cyberpunk_result_1.png',
            popart: 'popart_result_1.png',
            guochao: 'guochao_result_1.png'
        }
    },
    '2': {
        description: '唐代 - 双狮鸳鸯纹菱花铜镜',
        history: '双狮象征威武，鸳鸯寓意忠贞，整体象征圆满和谐。',
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
        history: '质地细腻，夔龙纹呈S形构图，既具抽象性，又体现守护意义。',
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
        history: '朱雀代表南方和火，象征吉祥。瓦当用于避邪纳福。',
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

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const motifId = urlParams.get('motif') || '1';
    const motifData = MOTIFS_DATA[motifId] || MOTIFS_DATA['1'];
    
    if (motifData) {
        // 加载图片
        document.getElementById('landing-img').src = `images/${motifData.images.landing}`;
        document.getElementById('history-img').src = `images/${motifData.images.original}`;
        
        // 加载风格页图
        document.querySelector('#minimalist img').src = `images/${motifData.images.minimalist}`;
        document.querySelector('#cyberpunk img').src = `images/${motifData.images.cyberpunk}`;
        document.querySelector('#popart img').src = `images/${motifData.images.popart}`;
        document.querySelector('#guochao img').src = `images/${motifData.images.guochao}`;

        // 绑定首页视频源
        document.getElementById('landing-video').src = `videos/${motifData.video}`;

        // 加载文本
        document.querySelector('.motif-description strong').textContent = motifData.description;
        document.getElementById('history-text').textContent = motifData.history;
    }
});

function playLandingVideo() {
    const v = document.getElementById('landing-video');
    const btn = document.getElementById('ai-video-btn');
    v.classList.remove('hidden');
    v.play();
    btn.classList.add('hidden');
}

function resetMedia() {
    stopReading();
    const v = document.getElementById('landing-video');
    const btn = document.getElementById('ai-video-btn');
    if (v) { v.pause(); v.currentTime = 0; v.classList.add('hidden'); }
    if (btn) { btn.classList.remove('hidden'); }
}

function showResult(id) {
    resetMedia();
    document.getElementById('selection-header').classList.add('hidden');
    document.querySelector('.style-selector').classList.add('hidden');
    document.querySelectorAll('.result-display').forEach(el => el.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
    window.scrollTo(0,0);
}

function showHistory() {
    resetMedia();
    document.getElementById('selection-header').classList.add('hidden');
    document.querySelector('.style-selector').classList.add('hidden');
    document.querySelectorAll('.result-display').forEach(el => el.classList.add('hidden'));
    document.getElementById('history-display').classList.remove('hidden');
    window.scrollTo(0,0);
}

function showSelector() {
    resetMedia();
    document.querySelectorAll('.result-display').forEach(el => el.classList.add('hidden'));
    document.getElementById('selection-header').classList.remove('hidden');
    document.querySelector('.style-selector').classList.remove('hidden');
}

// 语音功能保持不变...
function stopReading() { if (window.speechSynthesis) window.speechSynthesis.cancel(); }
function readPageContent() {
    stopReading();
    const current = document.querySelector('.result-display:not(.hidden)');
    const text = current ? current.innerText : document.querySelector('.container').innerText;
    const ut = new SpeechSynthesisUtterance(text);
    ut.lang = 'zh-CN';
    window.speechSynthesis.speak(ut);
}
