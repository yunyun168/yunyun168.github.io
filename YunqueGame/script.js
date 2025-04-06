// 使用 'DOMContentLoaded' 事件確保在執行 JavaScript 前，整個 HTML 文件已經被完整載入和解析
document.addEventListener('DOMContentLoaded', () => {

    // --- 元素選擇 ---
    // 獲取 ID 為 'splash-screen' 的元素 (初始 Logo 畫面)
    const splashScreen = document.getElementById('splash-screen');
    // 獲取 ID 為 'main-content' 的元素 (主要內容區塊，可選，用於更精確控制顯示)
    const mainContent = document.getElementById('main-content');
    // 獲取 ID 為 'current-year' 的 span 元素 (用於顯示頁尾年份)
    const currentYearSpan = document.getElementById('current-year');
    // 獲取所有帶有 'details-link' class 的元素 (遊戲選擇區的 "查看詳情" 按鈕)
    const detailLinks = document.querySelectorAll('.details-link');
     // 獲取所有帶有 'back-to-selection' class 的元素 (詳細說明區的 "返回遊戲選擇" 按鈕)
    const backLinks = document.querySelectorAll('.back-to-selection');


    // --- 功能函數 ---

    // 函數：隱藏 Splash Screen 並顯示主要內容
    function hideSplashScreen() {
        // 檢查 splashScreen 元素是否存在
        if (splashScreen) {
            // 1. 為 splashScreen 添加 'hidden' class，觸發 CSS 中的淡出動畫
            splashScreen.classList.add('hidden');

            // 2. 恢復 body 的滾動能力
            //    使用 setTimeout 稍微延遲恢復滾動，避免在動畫未完成時出現滾動條閃爍
            setTimeout(() => {
                document.body.style.overflow = 'auto';
            }, 100); // 延遲 100 毫秒 (可調整)

            // 3. (可選) 在 CSS 動畫結束後，可以從 DOM 中移除 splashScreen 或設置 display: none
            //    這樣做可以釋放一點點資源，但對於簡單頁面影響不大
            // splashScreen.addEventListener('transitionend', () => {
            //     splashScreen.style.display = 'none';
            // }, { once: true }); // 確保 transitionend 事件只觸發一次
        } else {
             // 如果 splashScreen 不存在，直接允許滾動 (容錯處理)
            document.body.style.overflow = 'auto';
        }
    }

    // 函數：平滑滾動到指定 ID 的元素
    function scrollToSection(event) {
        event.preventDefault(); // 阻止連結的默認跳轉行為
        const targetId = event.target.getAttribute('href'); // 獲取連結的 href 屬性值 (例如 "#yiwenlu-details")
        const targetElement = document.querySelector(targetId); // 根據 ID 選擇目標元素

        if (targetElement) {
            // 使用 scrollIntoView 方法實現平滑滾動
            targetElement.scrollIntoView({
                behavior: 'smooth', // 指定滾動行為為平滑
                block: 'start' // 將目標元素的頂部與視口的頂部對齊
            });
        }
    }


    // --- 事件監聽器設定 ---

    // 1. Splash Screen 點擊事件
    //    檢查 splashScreen 是否存在，如果存在則添加點擊監聽器
    if (splashScreen) {
        // 'click' 事件: 當用戶點擊 splashScreen 時觸發
        // { once: true }: 選項確保此事件監聽器只觸發一次，點擊後即自動移除
        splashScreen.addEventListener('click', hideSplashScreen, { once: true });
    } else {
        // 如果沒有 splash screen (例如開發中註解掉了)，直接恢復滾動
        document.body.style.overflow = 'auto';
    }

    // 2. "查看詳情" 連結點擊事件
    //    遍歷所有 'details-link' 按鈕，為每個按鈕添加點擊事件監聽器
    detailLinks.forEach(link => {
        link.addEventListener('click', scrollToSection);
    });

     // 3. "返回遊戲選擇" 連結點擊事件
    //    遍歷所有 'back-to-selection' 按鈕，為每個按鈕添加點擊事件監聽器
    backLinks.forEach(link => {
        link.addEventListener('click', scrollToSection);
    });

    // 4. 設定頁尾年份
    //    檢查 currentYearSpan 元素是否存在
    if (currentYearSpan) {
        // 獲取當前年份並設置 span 的文字內容
        currentYearSpan.textContent = new Date().getFullYear();
    }

}); // DOMContentLoaded 事件監聽器結束