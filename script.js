// 默认隐藏所有结果页面
document.addEventListener('DOMContentLoaded', () => {
    const results = document.querySelectorAll('.result-display');
    results.forEach(el => el.classList.add('hidden'));
});

// 显示特定结果并隐藏选择器
function showResult(styleId) {
    // 隐藏选择器和按钮
    document.getElementById('selection-header').classList.add('hidden');
    document.querySelector('.style-selector').classList.add('hidden');

    // 隐藏所有结果
    const results = document.querySelectorAll('.result-display');
    results.forEach(el => el.classList.add('hidden'));

    // 显示目标结果
    document.getElementById(styleId).classList.remove('hidden');

    // (可选) 滚动到页面顶部，确保用户看到新内容
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 显示选择器并隐藏所有结果
function showSelector() {
    // 隐藏所有结果
    const results = document.querySelectorAll('.result-display');
    results.forEach(el => el.classList.add('hidden'));

    // 显示选择器和按钮
    document.getElementById('selection-header').classList.remove('hidden');
    document.querySelector('.style-selector').classList.remove('hidden');

    // (可选) 滚动到页面顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
}