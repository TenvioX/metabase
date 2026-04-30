const fs = require('fs');
const path = require('path');

console.log("🚀 开始执行 TenvioX / 天纬数科 换皮脚本...");

function walkSync(dir, filelist) {
  if (!fs.existsSync(dir)) return filelist;
  const files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      // Ignore irrelevant folders
      if (!['node_modules', '.git', 'dist', 'build'].includes(file)) {
        filelist = walkSync(path.join(dir, file), filelist);
      }
    }
    else {
      const ext = path.extname(file);
      if (['.js', '.jsx', '.ts', '.tsx'].includes(ext)) {
        filelist.push(path.join(dir, file));
      }
    }
  });
  return filelist;
}

let files = [];
files = walkSync('frontend/src', files);
files = walkSync('enterprise/frontend/src', files);

console.log(`📂 找到 ${files.length} 个前端源码文件。`);

let modifiedFilesCount = 0;

files.forEach((file, index) => {
  if (index % 1000 === 0) console.log(`已处理 ${index} 个文件...`);

  let content = fs.readFileSync(file, 'utf-8');
  
  // 快速跳过不包含 Metabase 的文件，极大提升速度
  if (!content.includes('Metabase')) return;

  let originalContent = content;

  // 1a. 替换 t`...` 和 jt`...` 中的 Metabase (使用更安全的正则避免回溯)
  content = content.replace(/(?:j?t)`([^`]*)`/g, (match, inner) => {
    if (inner.includes('Metabase')) {
      const replacedInner = inner.replace(/Metabase/g, 'TenvioX');
      return match.replace(inner, replacedInner);
    }
    return match;
  });

  // 1b. 替换 JSX 中的文本节点 (如 >Metabase<)
  content = content.replace(/>\s*Metabase\s*</g, '>TenvioX<');
  content = content.replace(/>\s*Metabase/g, '>TenvioX');
  content = content.replace(/Metabase\s*</g, 'TenvioX<');

  // 1c. 针对部分特定的 Title 属性或硬编码字符串
  content = content.replace(/title="Metabase"/g, 'title="TenvioX"');
  content = content.replace(/placeholder="([^"]*?)Metabase([^"]*?)"/g, (match, p1, p2) => `placeholder="${p1}TenvioX${p2}"`);
  content = content.replace(/"Welcome to Metabase"/g, '"Welcome to TenvioX"');
  content = content.replace(/'Welcome to Metabase'/g, "'Welcome to TenvioX'");

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf-8');
    modifiedFilesCount++;
  }
});

console.log(`✅ 已在 ${modifiedFilesCount} 个源码文件中将 "Metabase" 替换为 "TenvioX"。`);

// 2. 处理多语言文件 zh-CN.po
const poFile = 'locales/zh-CN.po';
if (fs.existsSync(poFile)) {
  let poContent = fs.readFileSync(poFile, 'utf-8');
  let originalPoContent = poContent;

  // 替换 msgid 中的 "Metabase" 为 "TenvioX" (为了与源码的英文匹配)
  poContent = poContent.replace(/^msgid\s+"([^"]*?)Metabase([^"]*?)"$/gm, (match, p1, p2) => {
    return `msgid "${p1}TenvioX${p2}"`;
  });

  // 替换 msgstr 中的 "Metabase" 为 "天纬数科" (呈现给用户的中文)
  poContent = poContent.replace(/^msgstr\s+"([^"]*?)Metabase([^"]*?)"$/gm, (match, p1, p2) => {
    return `msgstr "${p1}天纬数科${p2}"`;
  });

  if (poContent !== originalPoContent) {
    fs.writeFileSync(poFile, poContent, 'utf-8');
    console.log(`✅ 已同步更新多语言文件: ${poFile}`);
  } else {
    console.log(`⚠️ 多语言文件 ${poFile} 未发生变动。`);
  }
} else {
  console.log(`❌ 未找到多语言文件: ${poFile}`);
}

console.log("🎉 换皮脚本执行完毕！请重新运行 'bun run build-hot:js' 查看效果。");
