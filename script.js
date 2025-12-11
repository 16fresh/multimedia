// ------------------ 纹样数据配置 (已修复文件名大小写和空格) ------------------
const MOTIFS_DATA = {
    // Motif 1: 鹿纹 (已有的)
    '1': {
        description: '明代万历年间 - 哥釉青花松鹿纹瓶',
        history: '“哥釉青花”是其釉色与工艺风格的一种。所谓青花，即在瓷器胚胎上以钴料描绘图案，再施透明釉、入窑高温烧成，是中国传统“釉下彩”瓷器的重要流派。这件松鹿纹瓶以“鹿 + 松柏”为主要装饰——鹿取“禄”之谐音，象征“福禄”；松柏寓意长寿、常青，因此松鹿纹整体寓意为“福禄双全、长寿永年”。这种通过谐音与图像结合来表达吉祥寓意，是中国古代瓷器中常见的装饰寓意方式。瓶的造型为传统的“瓶／长颈瓶”样式（也有人称其为棒槌瓶、长颈圆腹瓶），线条流畅，造型稳重／端庄，结合纹饰与器型，使作品既具实用功能，又兼具观赏与象征价值。',
        images: {
            original: 'original_1.png',
            minimalist: 'Minimalist_result_1.png', // ✅ 修复：移除了多余的空格
            cyberpunk: 'Cyberpunk_result_1.png',
            popart: 'popart_result_1.png',
            guochao: 'guochao_result_1.png'
        }
    },
    // Motif 2: 双狮鸳鸯纹镜 (新增)
    '2': {
        description: '唐代 - 双狮鸳鸯纹菱花铜镜',
        history: '唐代铜镜制作达到巅峰，常以祥瑞动物为主题。此镜纹样中，两只雄狮相对嬉戏，象征威武和力量；鸳鸯双栖，寓意忠贞和爱情。整体圆形镜面与菱花边相结合，象征圆满和谐。铜镜在古代不仅是照容工具，更是寄托吉祥寓意的工艺品。',
        images: {
            original: 'original_2.png',
            minimalist: 'Minimalist_result_2.png',
            cyberpunk: 'Cyberpunk_result_2.png',
            popart: 'popart_result_2.png', // ✅ 修复：P改为小写 p
            guochao: 'guochao_result_2.png' // ✅ 修复：G改为小写 g
        }
    },
    // Motif 3: 白玉夔龙佩 (新增)
    '3': {
        description: '战国 - 白玉夔龙纹佩',
        history: '这件白玉夔龙纹佩制作于战国时期，是当时贵族佩饰中等级较高的一类玉器。通体以质地细腻的白玉雕琢而成，玉色温润，局部可见自然沁色，显示出其长久埋藏后的历史痕迹。器形呈弧状或长条状，整体线条流畅优雅，中部以浅浮雕或镂空的方式刻画夔龙纹。夔龙是古代艺术中常见的神灵兽形象，躯体蜿蜒卷曲，呈S形或回首式构图，既具抽象装饰性，又体现神兽守护的象征意义。龙身上的细密刻线与云雷纹背景展示了战国玉工高超的减地雕刻技艺，纹饰繁而不乱，刀法劲挺，抛光细致，体现出当时玉器制作工艺的成熟与精湛。战国时期的玉佩不仅用于装饰，更是贵族身份与礼仪的重要象征。佩挂玉器行走时发出的清脆声响，被视为“以声养德”的礼制体现。夔龙纹作为驱邪与护佑力量的象征，使得这类玉佩兼具审美、宗教及礼仪价值。此类白玉夔龙纹佩往往属于贵族随身佩饰或随葬品，其造型、纹样与工艺均反映了战国时期高度发达的玉器文化与独特的审美追求。',
        images: {
            original: 'original_3.png',
            minimalist: 'Minimalist_result_3.png',
            cyberpunk: 'Cyberpunk_result_3.png',
            popart: 'popart_result_3.png', // ✅ 修复：P改为小写 p
            guochao: 'guochao_result_3.png' // ✅ 修复：G改为小写 g
        }
    },
    // Motif 4: 朱雀纹瓦当 (新增)
    '4': {
        description: '汉代 - 朱雀纹空心砖瓦当',
        history: '朱雀是中国古代神话中的四象之一，代表南方和火，象征吉祥、长寿。瓦当是中国古代建筑中覆盖在屋檐前端的圆形或半圆形构件，常雕刻神兽纹样以避邪纳福。朱雀纹瓦当体现了汉代人对宇宙秩序的信仰和对吉祥安宁的追求。',
        images: {
            original: 'original_4.png',
            minimalist: 'Minimalist_result_4.png',
            cyberpunk: 'Cyberpunk_result_4.png',
            popart: 'popart_result_4.png', // ✅ 修复：P改为小写 p
            guochao: 'guochao_result_4.png' // ✅ 修复：G改为小写 g
        }
    }
};


// ------------------ 全局语音设置（最高兼容性修复） - 保持不变 ------------------

window.currentUtterance = null;
window.zhVoice = null; 
window.voicesLoaded = false;

function loadChineseVoice() {
    if (window.voicesLoaded || !('speechSynthesis' in window)) return;
    const speech = window.speechSynthesis;
    const voices = speech.getVoices();
    window.zhVoice = voices.find(v => v.lang.startsWith('zh'));
    if (window.zhVoice) {
        window.voicesLoaded = true;
        console.log("中文语音包加载成功:", window.zhVoice.name);
    } else {
        console.warn("未找到特定的中文语音包。将使用默认设置。");
    }
}

if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = loadChineseVoice;
    loadChineseVoice();
}


// ------------------ 页面初始化 (已修改为动态加载) - 保持不变 ------------------

document.addEventListener('DOMContentLoaded', () => {
    // 1. 读取 URL 参数 (这是多纹样展示的核心)
    const urlParams = new URLSearchParams(window.location.search);
    const motifId = urlParams.get('motif') || '1'; // 默认加载 '1' (鹿纹)

    // 2. 加载对应的纹样数据
    const motifData = MOTIFS_DATA[motifId] || MOTIFS_DATA['1']; // 如果参数错误，依然回退到 '1'
    
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

        // 更新四个结果展示页的图片 (核心修改点：动态替换图片路径)
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


// ------------------ 页面切换功能 (保持不变) ------------------

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


// ------------------ 无障碍朗读功能 (最高兼容性代码) - 保持不变 ------------------

function readPageContent() {
    stopReading(); 
    
    const currentDisplay = document.querySelector('.result-display:not(.hidden)');
    let textToRead = '';
    
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
        
        const historyButton = document.querySelector('.history-button');
         if (historyButton) {
            textToRead += '。点击选择 ' + historyButton.textContent;
        }
    }


    if (textToRead && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(textToRead);
        
        if (!window.zhVoice) {
            loadChineseVoice();
        }
        
        if (window.zhVoice) {
            utterance.voice = window.zhVoice;
        } else {
            utterance.lang = 'zh-CN'; 
        }

        window.currentUtterance = utterance;

        setTimeout(() => {
            if (window.speechSynthesis.speaking) {
                 window.speechSynthesis.cancel();
            }
            
            window.speechSynthesis.speak(window.currentUtterance);
            
            setTimeout(() => {
                 if (!window.speechSynthesis.speaking) {
                      console.log("TTS 第一次尝试失败，进行第二次唤醒。");
                      window.speechSynthesis.speak(window.currentUtterance);
                 }
            }, 500);
            
        }, 100); 
        
    } else {
        console.warn('浏览器不支持文本转语音功能或无内容可读。');
    }
}

function stopReading() {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        window.currentUtterance = null;
    }
}

