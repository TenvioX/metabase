import { serve } from "bun";
import { readFileSync } from "fs";
import { resolve } from "path";

// 目标远程 API 服务器地址
const TARGET_API = process.env.TARGET_API || "http://tenviox-22:9300";
// 本地 Frontend Rspack Dev Server 端口
const LOCAL_ASSETS_PORT = process.env.MB_FRONTEND_DEV_PORT || 8080;
// 代理服务监听的端口
const PROXY_PORT = 7300;

/**
 * 读取本地构建的 index.html 并提取出由 Rspack 注入的 JS 和 CSS 标签
 */
function getLocalAssetsTags() {
  try {
    const localHtmlPath = resolve(__dirname, "./resources/frontend_client/index.html");
    const localHtml = readFileSync(localHtmlPath, "utf-8");
    
    // 匹配 rspack 插入的 scripts (通常是 src="http://localhost:8080/app/dist/...")
    const scriptRegex = new RegExp(`<script[^>]*src="http://localhost:${LOCAL_ASSETS_PORT}/app/dist/[^"]*"[^>]*><\\/script>`, "g");
    const linkRegex = new RegExp(`<link[^>]*href="http://localhost:${LOCAL_ASSETS_PORT}/app/dist/[^"]*"[^>]*>`, "g");
    
    const scriptTags = localHtml.match(scriptRegex) || [];
    const linkTags = localHtml.match(linkRegex) || [];
    
    return [...linkTags, ...scriptTags].join("\n");
  } catch (e: any) {
    console.error("⚠️ 无法读取本地的 index.html，这可能是因为 'bun run build-hot:js' 还没启动完毕。", e.message);
    return "";
  }
}

serve({
  port: PROXY_PORT,
  async fetch(req) {
    const url = new URL(req.url);

    // 拦截 favicon 请求，直接返回本地自定义的图标
    if (url.pathname.endsWith("favicon.ico")) {
      return new Response(readFileSync(resolve(__dirname, "./dev-docs/public/images/favicon.ico")), {
        headers: { "Content-Type": "image/x-icon", "Cache-Control": "no-cache" }
      });
    }
    if (url.pathname.endsWith("favicon-32x32.png")) {
      return new Response(readFileSync(resolve(__dirname, "./dev-docs/public/images/favicon-32x32.png")), {
        headers: { "Content-Type": "image/png", "Cache-Control": "no-cache" }
      });
    }
    if (url.pathname.endsWith("apple-touch-icon.png")) {
      return new Response(readFileSync(resolve(__dirname, "./dev-docs/public/images/icon.png")), {
        headers: { "Content-Type": "image/png", "Cache-Control": "no-cache" }
      });
    }

    // 拦截 locales 请求，加载本地构建的多语言文件
    if (url.pathname.startsWith("/app/locales/") && url.pathname.endsWith(".json")) {
      const localeFileName = url.pathname.split('/').pop();
      try {
        const localePath = resolve(__dirname, `./resources/frontend_client/app/locales/${localeFileName}`);
        return new Response(readFileSync(localePath), {
          headers: { "Content-Type": "application/json", "Cache-Control": "no-cache" }
        });
      } catch (e) {
        console.warn(`⚠️ 无法找到本地多语言文件: ${localeFileName}，降级回退到远程获取`);
      }
    }

    // 组装远程目标 URL
    const targetUrl = new URL(url.pathname + url.search, TARGET_API);
    const targetReq = new Request(targetUrl, req);
    
    // 修改 Host 头以欺骗远程服务器
    targetReq.headers.set("Host", new URL(TARGET_API).host);
    
    // 移除 Accept-Encoding 使得我们可以获取到未压缩的 HTML 明文进行操作
    targetReq.headers.delete("Accept-Encoding");

    try {
      const response = await fetch(targetReq);
      const contentType = response.headers.get("Content-Type");

      // 如果返回的是 HTML 文件，拦截并注入本地前端资源
      if (contentType && contentType.includes("text/html")) {
        let html = await response.text();
        
        // 移除远程生产环境的 assets (<script src="[optional /]app/dist/...">)
        html = html.replace(/<script[^>]*src="\/?app\/dist\/[^"]*"[^>]*><\/script>/g, "");
        html = html.replace(/<link[^>]*href="\/?app\/dist\/[^"]*"[^>]*>/g, "");

        // 拦截并替换初始 Title，防止刷新时瞬间出现 Metabase
        html = html.replace(/<title>.*?<\/title>/gi, "<title>TenvioX</title>");
        
        // 获取本地热更新的资源标签
        const localTags = getLocalAssetsTags();
        if (localTags) {
           // 将本地资源插入到 </body> 或者 </head> 之前
           if (html.includes("</body>")) {
               html = html.replace("</body>", `\n<!-- Injecting Local Dev Assets -->\n${localTags}\n</body>`);
           } else if (html.includes("</head>")) {
               html = html.replace("</head>", `\n<!-- Injecting Local Dev Assets -->\n${localTags}\n</head>`);
           }
        }

        // 拦截并替换 HTML 中嵌入的多语言 JSON，以便本地开发时立刻生效
        html = html.replace(
          /(<script type="application\/json" id="_metabase(?:User|Site)Localization">)(.*?)(<\/script>)/gs,
          (match, openTag, jsonString, closeTag) => {
            try {
              const parsed = JSON.parse(jsonString);
              const locale = parsed?.headers?.language;
              if (locale) {
                const localPath = resolve(__dirname, `./resources/frontend_client/app/locales/${locale}.json`);
                const localJson = readFileSync(localPath, "utf-8");
                console.log(`🌍 成功向 HTML 内联注入本地多语言: ${locale}.json`);
                return `${openTag}${localJson}${closeTag}`;
              }
            } catch (e) {
              // 解析失败或文件不存在，保持原样
            }
            return match;
          }
        );
        
        // 清除 Content-Length 因为我们改变了响应体长度
        const newHeaders = new Headers(response.headers);
        newHeaders.delete("Content-Length");
        // 关键修复：Bun 内部可能已经解压了内容，如果保留原样的 Content-Encoding，浏览器解压纯文本时会报 ERR_CONTENT_DECODING_FAILED
        newHeaders.delete("Content-Encoding");
        // 开发环境需要放开 CSP 限制，否则浏览器会拦截我们注入的 localhost:8080 的热更新资源
        newHeaders.delete("Content-Security-Policy");
        
        return new Response(html, {
          status: response.status,
          headers: newHeaders,
        });
      }

      // 其他资源类型（如 API 接口 JSON、图片等）
      // Bun 的 fetch 会自动解压响应体，但 Header 可能残留 Content-Encoding: gzip，导致浏览器解析报错。
      // 所以我们统一清洗 Header 再返回
      const cleanHeaders = new Headers(response.headers);
      cleanHeaders.delete("Content-Encoding");
      cleanHeaders.delete("Content-Length");
      cleanHeaders.delete("Content-Security-Policy");
      return new Response(response.body, {
        status: response.status,
        headers: cleanHeaders
      });
    } catch (e: any) {
      console.error(`🚨 代理请求失败 (${targetUrl}):`, e.message);
      return new Response(`Proxy Error: Could not reach ${TARGET_API}`, { status: 502 });
    }
  },
});

console.log(`\n=================================================`);
console.log(`🚀 Metabase 前端热更新代理服务已启动!`);
console.log(`=================================================\n`);
console.log(`📡 监听地址   : http://localhost:${PROXY_PORT}`);
console.log(`🌐 远程后端   : ${TARGET_API}`);
console.log(`🔥 本地资源   : http://localhost:${LOCAL_ASSETS_PORT}`);
console.log(`\n📝 使用指南:`);
console.log(`1. 请确保在另一个终端运行了: bun run build-hot:js`);
console.log(`2. 请在浏览器打开: http://localhost:${PROXY_PORT}`);
console.log(`\n=================================================\n`);
