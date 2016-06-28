# Installation

### Step1 安裝nodejs
```
https://nodejs.org/en/ (請裝6以上版本)
```

### Step2 安裝git

```
https://git-scm.com/
```

### Step3 下載makeSprite

按[win]+r

輸入cmd

按確定

複製以下區塊指令貼在cmd上按enter
```bash
cd %HomePath%/Desktop
git clone https://github.com/leidottw/makeSprite.git
```

### Step4

關閉cmd

到桌面找到makeSprite資料夾

點兩下進去

點兩下install.bat (如果這邊有問題一定是nodejs裝的版本不是6以上)

安裝完一票東西後就完成了

# Usage

1. 在makeSprite資料夾內建立一個子資料夾"images"

2. 把要組大圖的"整包單圖"(整個資料夾的意思)丟進images資料夾去 (可以一次丟很多資料夾進去)

    通常一個物件的圖會放成一包像是一個toolbar, 結構大概像下面

    ```
        [toolbar] <- (資料夾)
        
            pic1.png <- (單圖)
        
            pic2.png <- (單圖)
          
            pic3.png <- (單圖)
          
            pic3_hover.png <- (單圖的hover狀態)
          
            pic3_active.png <- (單圖的active狀態)
          
            pic4.png <- (單圖)
          
            pic5.png <- (單圖)
    ```

3. 點兩下exec.bat

4. 執行完會出現build資料夾, 裡面會有兩個資料夾分別是css跟大圖

5. css跟大圖的檔名會對應你放在images的資料夾名稱


# Upgrade

未來若需要更新
只要點兩下upgrade.bat就可以了