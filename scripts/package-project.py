"""Build and verify a portable source-and-game ZIP without Git metadata."""
from datetime import datetime
from pathlib import Path
import re
import subprocess
import sys
from zipfile import ZipFile, ZIP_DEFLATED
from zoneinfo import ZoneInfo

root = Path(__file__).resolve().parents[1]
subprocess.run([sys.executable, str(root / 'scripts/build-standalone.py')], check=True)
files = sorted({p for pattern in ['*.js', '*.mjs', '*.html', '*.css', '*.json', '*.md', 'scripts/*.py', 'tests/*.mjs'] for p in root.glob(pattern) if p.is_file()})
for path in files:
    if path.suffix in {'.js', '.mjs'}:
        for name in re.findall(r"from\s+['\"](\./[^'\"]+)['\"]", path.read_text()):
            if (path.parent / name).resolve() not in files:
                raise RuntimeError(f'Missing source dependency: {name}')
date = datetime.now(ZoneInfo('Asia/Taipei')).date().isoformat()
output = root.parent / f'一日大甲高工資訊科學生體驗_專案備份_{date}.zip'
temporary = output.with_suffix('.updating.zip')
prefix = '大甲高工資訊科體驗專案'
start = f'''一日大甲高工資訊科學生體驗 — 專案備份
儲存日期：{date}（台灣時間）

請先解壓縮整個資料夾，再用瀏覽器開啟「資訊館漫遊.html」即可遊玩。
完整程式、測試、對話紀錄與接續說明都在「原始碼」資料夾。

繼續開發：先讀 PROJECT_STATUS.md、README.md 與 對話紀錄.md。
開發啟動：在原始碼資料夾執行 npm start（需 Python 3 和 Node.js）。
驗證：npm test。
更新遊戲：python3 scripts/build-standalone.py。
更新備份：python3 scripts/package-project.py。

探索目標：參訪辦公室與選手室，完成六個工場，共八項任務。
全部完成後找科主任對話，領取「歡迎加入大甲高工資訊科」邀請函。

六個工場全數開放：
A201 單晶片微處理機實習、A202 程式設計實習、
A301 可程式邏輯設計實習、A302 電腦網路實習（硬體組裝體驗）、
A401 電子學實習（非反相 OPA 放大器）、
A402 基本電學實習（串聯與並聯燈泡電路判斷）。

沒有外部套件或 API 金鑰需求。離線可遊玩，網路天氣無資料時會明確標示。
瀏覽器中的個人角色、遊玩進度與草稿不包含在本備份。
本次為可下載的專案備份，未推送至 GitHub。
'''
with ZipFile(temporary, 'w', ZIP_DEFLATED) as archive:
    archive.writestr(prefix + '/開始使用.txt', start)
    archive.write(root.parent / '資訊館漫遊.html', prefix + '/資訊館漫遊.html')
    for path in files:
        archive.write(path, prefix + '/原始碼/' + path.relative_to(root).as_posix())
with ZipFile(temporary) as archive:
    assert archive.testzip() is None
    assert len(archive.namelist()) == len(set(archive.namelist()))
    assert archive.read(prefix + '/原始碼/game.js') == (root / 'game.js').read_bytes()
    assert archive.read(prefix + '/資訊館漫遊.html') == (root.parent / '資訊館漫遊.html').read_bytes()
temporary.replace(output)
print(f'已驗證並保存 {len(files)} 個來源與文件檔案：{output}')
