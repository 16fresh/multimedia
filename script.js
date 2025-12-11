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
    // 如果需要添加第二个纹样，请在此处添加 '2' 字段
};


// ------------------ 页面初始化 ------------------

document.addEventListener('DOMContentLoaded', () => {
    // 1. 读取 URL 参数
    const urlParams = new URLSearchParams(window.location.search);
    const motifId = urlParams.get('motif') || '1'; // 默认加载 '1'

    // 2. 加载对应的纹样数据
    const motifData = MOTIFS_DATA[motifId] || MOTIFS_DATA['1'];
    
    // 3. 应用纹样数据到 HTML 元素
    if (motifData) {
        // 更新原始纹样图片
        document.querySelector('.original-motif img').src = `images/${motifData.images.original}`;
        
        // 更新原始纹样介绍文本 (strong标签内容)
        const descriptionElement = document.querySelector('.motif-description strong');
        if (descriptionElement) {
            descriptionElement.textContent = motifData.description;
        }

        // 更新历史回望文本 (history-text id内容)
        const historyTextEl = document.getElementById('history-text');
        if (historyTextEl) {
            historyTextEl.textContent = motifData.history;
        }

        // 更新四个结果展示页的图片
        document.querySelector('#minimalist img').src = `images/${motifData.images.minimalist}`;
        document.querySelector('#cyberpunk img').src = `images/${motifData.images.cyberpunk}`;
        document.querySelector('#popart img').src = `images/${motifData.images.popart}`;
        document.querySelector('#guochao img').src = `images/${motifData.images.guochao}`;
    }

    // 4. 默认隐藏所有结果页面
    const results = document.querySelectorAll('.result-display');
    results.forEach(el => el.classList.add('hidden'));

    // 5. 确保选择器是可见的
    document.getElementById('selection-header').classList.remove('hidden');
    document.querySelector('.style-selector').classList.remove('hidden');
});


// ------------------ 页面切换功能 ------------------

// 显示特定结果并隐藏选择器
function showResult(styleId) {
    stopReading(); 
    document.getElementById('selection-header').classList.add('hidden');
    document.querySelector('.style-selector').classList.add('hidden');
    const results = document.querySelectorAll('.result-display');
    results.forEach(el => el.classList.add('hidden'));
    document.getElementById(styleId).classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 显示历史介绍页面
function showHistory() {
    stopReading(); 
    document.getElementById('selection-header').classList.add('hidden');
    document.querySelector('.style-selector').classList.add('hidden');
    const results = document.querySelectorAll('.result-display');
    results.forEach(el => el.classList.add('hidden'));
    document.getElementById('history-display').classList.remove('hidden'); // 显示历史区
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


// 显示选择器并隐藏所有结果
function showSelector() {
    stopReading(); 
    const results = document.querySelectorAll('.result-display');
    results.forEach(el => el.classList.add('hidden'));
    document.getElementById('selection-header').classList.remove('hidden');
    document.querySelector('.style-selector').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


// ------------------ 无障碍朗读功能（已优化移动端兼容性） ------------------

// 全局变量用于保存 utterance 对象的引用，防止移动端浏览器将其作为垃圾回收
window.currentUtterance = null;

/**
 * 朗读当前屏幕上的可见文本内容
 */
function readPageContent() {
    stopReading(); // 确保开始新的朗读前停止旧的
    
    // 找到当前可见的展示区或历史区
    const currentDisplay = document.querySelector('.result-display:not(.hidden)');
    
    let textToRead = '';
    
    if (currentDisplay) {
        // 如果在结果页或历史页，朗读标题和所有段落
        textToRead = currentDisplay.querySelector('h2')?.textContent || '';
        const paragraphs = currentDisplay.querySelectorAll('h3, p');
        paragraphs.forEach(p => {
            if (p.textContent.trim()) {
                textToRead += '。' + p.textContent.trim();
            }
        });
    } else {
        // 如果在主选择页，朗读介绍和所有按钮名称
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

    // 使用 SpeechSynthesis API 进行朗读
    if (textToRead && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.lang = 'zh-CN'; // 确保使用中文发音

        // 🎯 优化点 1: 将对象存储在全局变量中，防止移动端垃圾回收
        window.currentUtterance = utterance;

        // 🎯 优化点 2: 使用 setTimeout 延迟启动，给移动端语音引擎初始化时间
        setTimeout(() => {
            window.speechSynthesis.speak(window.currentUtterance);
        }, 100); // 延迟100毫秒
        
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
        // 🎯 优化点 3: 清理全局引用
        window.currentUtterance = null;
    }
}
