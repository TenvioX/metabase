const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'locales');
const poFiles = ['zh-CN.po', 'zh-TW.po', 'zh-HK.po', 'metabase.po'];

poFiles.forEach(file => {
  const poFilePath = path.join(localesDir, file);
  if (!fs.existsSync(poFilePath)) {
    console.error(`File not found: ${file}`);
    return;
  }

  let content = fs.readFileSync(poFilePath, 'utf8');
  const lines = content.split('\n');

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    if (line.startsWith('msgid ')) {
      line = line.replace(/Metabase/g, 'TenvioX');
    } else if (line.startsWith('msgstr ')) {
      line = line.replace(/Metabase/g, '天伟数科');
      line = line.replace(/天纬数科/g, '天伟数科');
    } else if (line.startsWith('"')) {
      let j = i - 1;
      let isMsgId = false;
      let isMsgStr = false;
      while (j >= 0) {
        if (lines[j].startsWith('msgid ')) {
          isMsgId = true;
          break;
        } else if (lines[j].startsWith('msgstr ')) {
          isMsgStr = true;
          break;
        } else if (!lines[j].startsWith('"')) {
          break;
        }
        j--;
      }
      
      if (isMsgId) {
        line = line.replace(/Metabase/g, 'TenvioX');
      } else if (isMsgStr) {
        line = line.replace(/Metabase/g, '天伟数科');
        line = line.replace(/天纬数科/g, '天伟数科');
      }
    }
    lines[i] = line;
  }

  fs.writeFileSync(poFilePath, lines.join('\n'), 'utf8');
  console.log(`Updated ${file} successfully!`);
});
