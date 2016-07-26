# makeSprite

> 圖檔處理只支援png, 製作iconFont只可使用svg

## 安裝
1. 安裝git

    https://git-scm.com/

2. 安裝nodejs 6以上版本

    https://nodejs.org/

3. 安裝imageMagick

    http://www.imagemagick.org/script/binary-releases.php

    ImageMagick-7.0.2-5-Q8-x64-dll.exe

    安裝過程的第三步驟記得勾選Install legacy utilities(e.g. convert)

4. 打開cmd執行以下指令
```bash
git clone https://github.com/leidottw/makeSprite.git
```

5. 執行install.bat

## 建立工作目錄

可參考config.js

工作目錄結構都在上半段有需要可以自行修改

Src結尾的是要餵給程式吃的圖檔來源

Dest結尾的是程式產生的結果放置位置

```js
spriteSrc: './workarea/images/', // 組縮圖+壓縮 檔案來源路徑
spriteDest: './workarea/build/', // 組縮圖+壓縮 結果產生路徑
compressSrc: './workarea/只做壓縮來源/', // 只做壓縮 檔案來源路徑
compressDest: './workarea/只做壓縮結果/', // 只做壓縮 結果產生路徑
iconFontSrc: './workarea/iconFontSrc/',
iconFontDest: './workarea/iconFontDest/',
appIconSrc: './workarea/appIcon來源/',
appIconDestQpkg: './workarea/appIcon結果/qpkg/',
appIconDestMobileApp: './workarea/appIcon結果/mobileApp/',
launchImageSrc: 'workarea/launch_image_source/',
launchImageDest: 'workarea/launch_image_result/',
```

根據以上結構

1. 先在makeSprite內建立一個workarea子目錄

2. 建立個功能的資料來源目錄

    spriteSrc （小圖組大圖 + 壓縮)

    compressSrc (純圖檔壓縮)

    iconFontSrc (製作iconFont)

    appIconSrc (製作appIcon)

    launchImageSrc (製作app啟動畫面)

## 使用方式
1. 小圖組大圖 + 壓縮

    目錄結構: 把要組成一張大圖的所有小圖放在一個資料夾內, 再把資料夾丟進spriteSrc目錄

    組成的大圖檔名會是資料夾名稱
    
    執行"組縮圖加壓縮.bat"

2. 純圖檔壓縮

    把要壓縮的圖檔丟進去

    目錄結構: 隨便放都行
    
    結果的目錄結構會跟來源端相同
    
    執行"只做壓縮.bat"

3. 製作iconFont
    
    目錄結構: 把所有要做成字型檔的".svg"直接放到iconFontSrc, 不要有子目錄

    執行"製作IconFont.bat"

4. 製作appIcon

    目錄結構: 把要做appIcon的大圖直接方進appIconSrc下

    執行"製作appIcon.bat"
    
    各種size的appIcon會自動產生出來(android, ios, app center)
    

5. 製作app啟動畫面

    目錄結構: 把要做成app啟動頁面的appIcon直接放進launchImageSrc下

    執行"製作launchImage.bat"或"製作launchImage貼牌.bat"
    
    (貼牌的下方不會有QNAP logo)
