const fs = require('fs');
const path = require('path');

const newsDir = path.join(__dirname, 'content/news');
const outputDir = path.join(__dirname, 'news');

// 确保 /news/ 目录存在
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// 简易 Markdown 转 HTML 转换器
function simpleMarkdownToHtml(md) {
    if (!md) return '';
    return md
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
        .replace(/\*\*(.* animate)\*\*/gim, '<strong>$1</strong>')
        .replace(/\*(.*)\*/gim, '<em>$1</em>')
        .replace(/!\[(.*?)\]\((.*?)\)/gim, '<img src="$2" alt="$1">')
        .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank">$1</a>')
        .replace(/\n\s*\n/gim, '</p><p>')
        .replace(/^(.+)$/gim, (match) => {
            if (match.startsWith('<h') || match.startsWith('<block') || match.startsWith('<p')) {
                return match;
            }
            return '<p>' + match + '</p>';
        });
}

// 检查 content/news 目录
if (fs.existsSync(newsDir)) {
    const files = fs.readdirSync(newsDir).filter(file => file.endsWith('.md'));
    let newsList = [];

    files.forEach(file => {
        const filePath = path.join(newsDir, file);
        const content = fs.readFileSync(filePath, 'utf8');

        // 解析 Frontmatter (--- ... ---)
        const match = content.match(/^---\s*([\s\S]*?)\s*---\s*([\s\S]*)$/);
        if (!match) return;

        const headers = match[1];
        const bodyMd = match[2];

        const titleMatch = headers.match(/title:\s*(['"]?)(.*?)\1$/m);
        const dateMatch = headers.match(/date:\s*([0-9\-]+)/m);
        const imageMatch = headers.match(/image:\s*(['"]?)(.*?)\1$/m);

        const title = titleMatch ? (titleMatch[2] || titleMatch[0].replace('title:', '').trim()) : 'News';
        const date = dateMatch ? dateMatch[1] : '2026-01-01';
        const image = imageMatch ? imageMatch[2] : '';

        // 日期处理
        const [year, month, day] = date.split('-');
        const dateObj = new Date(Date.UTC(year, month - 1, day));
        const displayDate = dateObj.toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric', timeZone: 'UTC' });

        const slug = file.replace(/\.md$/, '');
        const htmlFileName = `${slug}.html`;
        const relativeUrl = `/news/${htmlFileName}`;
        const fullUrl = `https://www.cwsemi.com${relativeUrl}`;

        newsList.push({
            date: date,
            displayDate: displayDate,
            title: title,
            url: relativeUrl
        });

        const bodyHtml = simpleMarkdownToHtml(bodyMd);

        // 生成精准与原有设计一致的 HTML 详情页
        const detailHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - Digisino Electronics</title>
    <link rel="icon" href="/svg-logos/digisino-favicon.png" type="image/png" sizes="192x192">
    <link rel="shortcut icon" href="/svg-logos/digisino-favicon.png">
    <link rel="apple-touch-icon" href="/svg-logos/digisino-favicon.png">
    <meta name="description" content="${title} - Latest updates from Digisino Electronics">
    <link rel="canonical" href="${fullUrl}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="/css/style.css">
    <style>
        .page-header { background: linear-gradient(rgba(0, 111, 66, 0.6), rgba(0, 111, 66, 0.75)), url('/webp-images/general/news-bg.webp'); background-size: cover; background-position: center; color: var(--white); padding: 100px 0 60px; text-align: center; min-height: 40vh; }
        .page-header h1 { font-size: 3rem; margin-bottom: 20px; color: var(--white); }
        .breadcrumb { display: flex; justify-content: center; list-style: none; padding: 0; font-size: 1.1rem; }
        .breadcrumb li { display: flex; align-items: center; }
        .breadcrumb li:not(:last-child):after { content: '/'; margin: 0 15px; color: rgba(255, 255, 255, 0.7); }
        .breadcrumb a { color: rgba(255, 255, 255, 0.9); }
        .breadcrumb a:hover { color: var(--white); }
        .news-section { padding: 80px 0; }
        .news-container { max-width: 900px; margin: 0 auto; }
        .news-item { background: var(--white); border-radius: 10px; box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05); padding: 40px; margin-bottom: 40px; }
        .news-date { color: var(--primary-color); font-weight: 600; margin-bottom: 15px; display: flex; align-items: center; gap: 10px; }
        .news-title { font-size: 1.8rem; margin-bottom: 20px; color: var(--primary-dark); }
        .news-content { margin-bottom: 25px; font-size: 1.1rem; line-height: 1.8; }
        .news-content img { max-width: 100%; height: auto; border-radius: 8px; margin: 20px 0; box-shadow: 0 5px 15px rgba(0,0,0,0.1); display: block; margin-left: auto; margin-right: auto; }
        .back-to-news { display: inline-flex; align-items: center; gap: 8px; padding: 12px 25px; background: var(--primary-color); color: var(--white); border-radius: 4px; margin-top: 30px; font-weight: 500; }
        .back-to-news:hover { background: var(--primary-dark); color: var(--white); }
        .social-share { display: flex; justify-content: center; gap: 15px; margin-top: 40px; padding-top: 20px; border-top: 1px solid rgba(0,0,0,0.1); flex-wrap: wrap; }
        .share-btn { display: flex; align-items: center; gap: 8px; padding: 10px 20px; border-radius: 30px; color: white; font-weight: 500; }
        .share-btn.facebook { background: #3b5998; }
        .share-btn.twitter { background: #1DA1F2; }
        .share-btn.linkedin { background: #0077B5; }
        .share-btn.whatsapp { background: #25D366; }
    </style>
</head>
<body>
    <div class="top-header">
        <div class="container top-header-container">
            <div class="top-header-features">
                <span>Welcome to Digisino Electronics Limited</span>
                <span>Secure Sources</span>
                <span>Competitive Price</span>
                <span>Cost Down Solutions</span>
            </div>
            <div class="top-header-contact"><i class="fas fa-envelope"></i> info@digisino.com</div>
        </div>
    </div>
    <header class="main-header">
        <div class="container header-container">
            <a href="/index.html" class="logo">
                <div class="logo-container">
                    <img src="/svg-logos/digisino-logo.svg" alt="Digisino Logo" class="logo-img">
                    <div class="logo-text"><span>Electronic Components Distributor</span></div>
                </div>
            </a>
            <nav>
                <ul class="nav-menu">
                    <li class="nav-item"><a href="/index.html" class="nav-link">Digisino</a></li>
                    <li class="nav-item"><a href="https://www.cwsemi.com/products" class="nav-link">PRODUCT CENTER</a></li>
                    <li class="nav-item"><a href="/linecards.html" class="nav-link">Extensive Line Cards</a></li>
                    <li class="nav-item"><a href="/rfq.html" class="nav-link">RFQ/BOM Service</a></li>
                    <li class="nav-item"><a href="/contact.html" class="nav-link">Contact Digisino</a></li>
                    <li class="nav-item"><a href="/news.html" class="nav-link">News</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <section class="page-header">
        <div class="container">
            <h1>${title}</h1>
            <ul class="breadcrumb">
                <li><a href="/index.html">Home</a></li>
                <li><a href="/news.html">News</a></li>
                <li>Details</li>
            </ul>
        </div>
    </section>

    <section class="news-section">
        <div class="container">
            <div class="news-container">
                <div class="news-item">
                    <div class="news-date"><i class="far fa-calendar-alt"></i> ${displayDate}</div>
                    <h3 class="news-title">${title}</h3>
                    <div class="news-content">
                        ${image ? `<img src="${image}" alt="${title}">` : ''}
                        ${bodyHtml}
                        <div style="text-align: center; margin-top: 40px;">
                            <a href="/news.html" class="back-to-news"><i class="fas fa-arrow-left"></i> Back to News</a>
                        </div>
                    </div>
                    <div class="social-share">
                        <span class="share-title">Share this post:</span>
                        <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}" target="_blank" class="share-btn facebook"><i class="fab fa-facebook-f"></i> Facebook</a>
                        <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}" target="_blank" class="share-btn twitter"><i class="fab fa-twitter"></i> Twitter</a>
                        <a href="https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(fullUrl)}" target="_blank" class="share-btn linkedin"><i class="fab fa-linkedin-in"></i> LinkedIn</a>
                        <a href="https://api.whatsapp.com/send?text=${encodeURIComponent(fullUrl)}" target="_blank" class="share-btn whatsapp"><i class="fab fa-whatsapp"></i> WhatsApp</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <script src="/js/main.js" defer></script>
</body>
</html>`;

        fs.writeFileSync(path.join(outputDir, htmlFileName), detailHtml);
    });

    // 针对新添加或变更的新闻，更新 news.html 中的 allNews 数组
    const newsHtmlPath = path.join(__dirname, 'news.html');
    if (fs.existsSync(newsHtmlPath) && newsList.length > 0) {
        let newsHtmlContent = fs.readFileSync(newsHtmlPath, 'utf8');
        
        // 合并原有 allNews 避免丢失老新闻
        const arrayMatch = newsHtmlContent.match(/var\s+allNews\s*=\s*(\[\s*[\s\S]*?\s*\]);/);
        let existingNews = [];
        if (arrayMatch) {
            try {
                existingNews = eval(arrayMatch[1]);
            } catch (e) {}
        }

        // 合并新老新闻（按 url 去重）
        const combinedMap = new Map();
        existingNews.forEach(item => combinedMap.set(item.url, item));
        newsList.forEach(item => combinedMap.set(item.url, item));

        const updatedArray = Array.from(combinedMap.values());
        updatedArray.sort((a, b) => new Date(b.date) - new Date(a.date));

        const updatedArrayStr = `var allNews = ${JSON.stringify(updatedArray, null, 12)};`;
        newsHtmlContent = newsHtmlContent.replace(/var\s+allNews\s*=\s*\[[\s\S]*?\];/m, updatedArrayStr);

        fs.writeFileSync(newsHtmlPath, newsHtmlContent);
    }
}

console.log('Build completed successfully.');
