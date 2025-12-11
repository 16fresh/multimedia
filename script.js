// ------------------ 纹样数据配置 ------------------
const MOTIFS_DATA = {
    // Motif 1: 鹿纹（唯一一个纹样）
    '1': {
        description: '明代万历年间 - 哥釉青花松鹿纹瓶',
        // 详细历史介绍，供“背景回望”和“朗读”功能使用
        history: '“哥釉青花”是其釉色与工艺风格的一种。所谓青花，即在瓷器胚胎上以钴料描绘图案，再施透明釉、入窑高温烧成，是中国传统“釉下彩”瓷器的重要流派。这件松鹿纹瓶以“鹿 + 松柏”为主要装饰——鹿取“禄”之谐音，象征“福禄”；松柏寓意长寿、常青，因此松鹿纹整体寓意为“福禄双全、长寿永年”。这种通过谐音与图像结合来表达吉祥寓意，是中国古代瓷器中常见的装饰寓意方式。瓶的造型为传统的“瓶／长颈瓶”样式（也有人称其为棒槌瓶、长颈圆腹瓶），线条流畅，造型稳重／端庄，结合纹饰与器型，使作品既具实用功能，又兼具观赏与象征价值。',
        images: {
            original: 'original_1.png',
            minimalist: 'Minimalist _result_1.png',
            cyberpunk: 'Cyberpunk_result_1.png',
            popart: 'popart_result_1.png',
            guochao: 'guochao_result_1.png'
        }
    }
};


// ------------------ 全局语音设置（NEW!） ------------------

// 全局变量用于保存 utterance 对象的引用，防止移动端垃圾回收
window.currentUtterance = null;
// 全局变量用于存储可用的中文语音
window.zhVoice = null; 

// 🎯 优化点：等待语音列表加载，并选择中文语音
if ('speechSynthesis' in window) {
    const speech = window.speechSynthesis;
    
    // 检查语音是否已经加载（某些浏览器可能会同步加载）
    if (speech.getVoices().length !== 0) {
        window.zhVoice = speech.getVoices().find(v => v.lang.startsWith('zh'));
    }

    // 如果未加载，等待 onvoiceschanged 事件
    speech.onvoiceschanged = () => {
        if (!window.zhVoice) {
            // 尝试查找任意中文语音 ('zh-CN', 'zh-TW', 'zh-HK', 'zh')
            window.zhVoice = speech.getVoices().find(v => v.lang.startsWith('zh'));
        }
    };
}


// ------------------ 页面初始化 ------------------

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const motifId = urlParams.get('motif') || '1'; 
    const motifData = MOTIFS_DATA[motifId] || MOTIFS_DATA['1'];
    
    if (motifData) {
        document.querySelector('.original-motif img').src = `images/${motifData.images.original}`;
        const descriptionElement = document.querySelector('.motif-description strong');
        if (descriptionElement) {
            descriptionElement.textContent = motifData.description;
        }
        const historyTextEl = document.getElementById('history-text');
        if (historyTextEl) {
            historyTextEl.textContent = motifData.history;
        }
        document.querySelector('#minimalist img').src = `images/${motifData.images.minimalist}`;
        document.querySelector('#cyberpunk img').src = `images/${motifData.images.cyberpunk}`;
        document.querySelector('#popart img').src = `images/${motifData.images.popart}`;
        document.querySelector('#guochao img').src = `images/${motifData.images.guochao}`;
    }

    const results = document.querySelectorAll('.result-display');
    results.forEach(el => el.classList.add('hidden'));

    document.getElementById('selection-header').classList.remove('hidden');
    document.querySelector('.style-selector').classList.remove('hidden');
});


// ------------------ 页面切换功能 ------------------

function showResult(styleId) {
    stopReading(); 
    document.getElementById('selection-header').classList.add('hidden');
    document.querySelector('.style-selector').classList.add('hidden');
    const results = document.querySelectorAll('.result-display');
    results.forEach(el => el.classList.add('hidden'));
    document.getElementById(styleId).classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showHistory() {
    stopReading(); 
    document.getElementById('selection-header').classList.add('hidden');
    document.querySelector('.style-selector').classList.add('hidden');
    const results = document.querySelectorAll('.result-display');
    results.forEach(el => el.classList.add('hidden'));
    document.getElementById('history-display').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showSelector() {
    stopReading(); 
    const results = document.querySelectorAll('.result-display');
    results.forEach(el => el.classList.add('hidden'));
    document.getElementById('selection-header').classList.remove('hidden');
    document.querySelector('.style-selector').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


// ------------------ 无障碍朗读功能（已应用最高兼容性修复） ------------------

/**
 * 朗读当前屏幕上的可见文本内容
 */
function readPageContent() {
    stopReading(); 
    
    const currentDisplay = document.querySelector('.result-display:not(.hidden)');
    let textToRead = '';
    
    // ... (获取 textToRead 的逻辑不变) ...
    if (currentDisplay) {
        textToRead = currentDisplay.querySelector('h2')?.textContent || '';
        const paragraphs = currentDisplay.querySelectorAll('h3, p');
        paragraphs.forEach(p => {
            if (p.textContent.trim()) {
                textToRead += '。' + p.textContent.trim();
            }
        });
    } else {
        textToRead += document.querySelector('#selection-header h1').textContent + '。';
        textToRead += document.querySelector('#selection-header p').textContent + '。';
        
        const descriptionElement = document.querySelector('.motif-description strong');
        if (descriptionElement) {
            textToRead += descriptionElement.textContent + '。';
        }

        const buttons = document.querySelectorAll('.style-selector button');
        buttons.forEach(btn => {
            textToRead += '。点击选择 ' + btn.textContent;
        });
    }


    if (textToRead && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(textToRead);
        
        // 🎯 优化点 1: 尝试使用预先找到的中文语音
        if (window.zhVoice) {
            utterance.voice = window.zhVoice;
        } else {
            // 如果没有找到特定的语音，至少设置语言为中文
            utterance.lang = 'zh-CN'; 
        }

        // 🎯 优化点 2: 将对象存储在全局变量中，防止移动端垃圾回收
        window.currentUtterance = utterance;

        // 🎯 优化点 3: 使用 setTimeout 延迟启动，确保在用户交互后稳定启动
        setTimeout(() => {
            window.speechSynthesis.speak(window.currentUtterance);
        }, 100); 
        
    } else {
        console.warn('浏览器不支持文本转语音功能或无内容可读。');
    }
}

/**
 * 停止正在进行的朗读
 */
function stopReading() {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        // 清理全局引用
        window.currentUtterance = null;
    }
}
