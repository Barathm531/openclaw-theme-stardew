# 🌾 OpenClaw 星露谷物语主题包

<p align="center">
    <img src="https://img.shields.io/badge/OpenClaw-Theme-ff6b6b?style=for-the-badge" alt="OpenClaw Theme">
    <img src="https://img.shields.io/badge/版本-1.0.0-4ecdc4?style=for-the-badge" alt="Version 1.0.0">
    <img src="https://img.shields.io/badge/许可证-MIT-blue.svg" alt="MIT License">
</p>

**OpenClaw 的星露谷物语风格主题包** - 一键安装四季像素风格主题到你的 OpenClaw 项目中。

## 功能特点

- **一键安装** - 自动检测并安装到 OpenClaw 项目
- **四季主题** - 春/夏/秋/冬四种季节配色
- **像素光标** - 锄头、斧头、水壶等游戏工具光标
- **像素字体** - 方舟像素字体，支持中英文
- **实时切换** - 根据当前月份自动切换季节主题

---

## 安装方法

### 方式一：NPM 安装（推荐）

在你的 OpenClaw 项目目录下运行：

```bash
# 安装主题包
npm install openclaw-theme-stardew

# 主题会自动安装到 OpenClaw 项目中
```

### 方式二：手动安装

```bash
# 克隆或下载主题包
git clone https://github.com/andyhuo520/openclaw-theme-stardew.git

# 进入目录
cd openclaw-theme-stardew

# 运行安装脚本
./scripts/install.sh /path/to/your/openclaw
```

### 方式三：Node.js 脚本安装

```bash
# 在主题包目录下运行
node scripts/install.js /path/to/your/openclaw
```

---

## 安装后目录结构

安装后，以下文件会被添加到你的 OpenClaw 项目中：

```
your-openclaw/
└── ui/src/
    ├── styles/
    │   ├── themes/
    │   │   ├── stardew-spring.css    # 春季主题
    │   │   ├── stardew-summer.css    # 夏季主题
    │   │   ├── stardew-autumn.css    # 秋季主题
    │   │   ├── stardew-winter.css    # 冬季主题
    │   │   ├── stardew-common.css    # 通用样式
    │   │   ├── stardew-cursors.css   # 像素光标
    │   │   └── stardew-selector.css  # 选择器样式
    │   └── fonts/
    │       ├── ark-pixel.css         # 字体定义
    │       └── *.woff2               # 字体文件
    ├── scripts/
    │   └── stardew-realtime.js       # 实时季节切换
    └── styles.css                    # 已更新导入
```

---

## 使用方法

### 1. 通过 UI 切换

安装完成后，在 OpenClaw 设置中选择主题：
- 🌸 春季 (stardew-spring)
- ☀️ 夏季 (stardew-summer)
- 🍂 秋季 (stardew-autumn)
- ❄️ 冬季 (stardew-winter)

### 2. 通过代码切换

```javascript
// 设置春季主题
document.documentElement.setAttribute('data-theme', 'stardew-spring');

// 设置夏季主题
document.documentElement.setAttribute('data-theme', 'stardew-summer');

// 设置秋季主题
document.documentElement.setAttribute('data-theme', 'stardew-autumn');

// 设置冬季主题
document.documentElement.setAttribute('data-theme', 'stardew-winter');
```

### 3. 自动季节切换

```html
<!-- 在 HTML 中引入脚本 -->
<script src="scripts/stardew-realtime.js"></script>

<script>
  // 启用自动季节切换（根据当前月份）
  window.stardewRealTime.enableAutoSeason();
</script>
```

季节对应月份：
| 季节 | 月份 |
|------|------|
| 春季 | 3月 - 5月 |
| 夏季 | 6月 - 8月 |
| 秋季 | 9月 - 11月 |
| 冬季 | 12月 - 2月 |

---

## 主题预览

| 主题 | 主色调 | 强调色 | 氛围 |
|------|--------|--------|------|
| 🌸 春季 | 草地绿 `#1a2e1a` | 樱花粉 `#ff9ecd` | 生机勃勃 |
| ☀️ 夏季 | 深海蓝 `#0d2137` | 阳光金 `#ffd54f` | 海滩度假 |
| 🍂 秋季 | 枫叶棕 `#2d1f14` | 南瓜橙 `#f5a623` | 丰收田园 |
| ❄️ 冬季 | 冬夜蓝 `#1a2433` | 壁炉橙 `#ff8a65` | 雪夜温馨 |

---

## 手动安装说明

如果自动安装失败，可以手动完成以下步骤：

### 1. 复制文件

```bash
# 复制主题文件
cp -r css/themes/* /path/to/openclaw/ui/src/styles/themes/

# 复制字体文件
cp -r fonts/* /path/to/openclaw/ui/src/styles/fonts/

# 复制脚本文件
cp -r js/* /path/to/openclaw/ui/src/scripts/
```

### 2. 更新 styles.css

在 `/path/to/openclaw/ui/src/styles.css` 末尾添加：

```css
/* 🌾 星露谷物语主题 */
@import "./styles/themes/stardew-spring.css";
@import "./styles/themes/stardew-summer.css";
@import "./styles/themes/stardew-autumn.css";
@import "./styles/themes/stardew-winter.css";
@import "./styles/themes/stardew-common.css";
@import "./styles/themes/stardew-cursors.css";
@import "./styles/themes/stardew-selector.css";
```

### 3. 更新主题类型（可选）

如果使用 TypeScript，在 `ui/src/ui/theme.ts` 中添加：

```typescript
export type StardewTheme = "stardew-spring" | "stardew-summer" | "stardew-autumn" | "stardew-winter";

export const STARDEW_THEMES: StardewTheme[] = [
  "stardew-spring",
  "stardew-summer",
  "stardew-autumn",
  "stardew-winter"
];

export const STARDEW_THEME_INFO: Record<StardewTheme, { name: string; icon: string; nameZh: string }> = {
  "stardew-spring": { name: "Spring", icon: "pixelarticons:flower", nameZh: "春季" },
  "stardew-summer": { name: "Summer", icon: "pixelarticons:sun", nameZh: "夏季" },
  "stardew-autumn": { name: "Autumn", icon: "pixelarticons:leaf", nameZh: "秋季" },
  "stardew-winter": { name: "Winter", icon: "pixelarticons:snowflake", nameZh: "冬季" },
};
```

---

## 卸载

```bash
# 使用 npm
npm uninstall openclaw-theme-stardew

# 或运行卸载脚本
node scripts/uninstall.js
```

---

## 依赖项

### 字体
- **Ark Pixel Font** - [方舟像素字体](https://github.com/TakWolf/ark-pixel-font) (SIL OFL 1.1)

### 图标
- **Pixelarticons** - 像素风格图标库

---

## 浏览器支持

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## 许可证

- 代码：MIT License
- 字体：SIL Open Font License 1.1 (见 fonts/OFL.txt)

---

## 致谢

- **Stardew Valley** - 灵感来源 (ConcernedApe)
- **Ark Pixel Font** - 优秀的开源像素字体
- **OpenClaw** - 目标框架

---

## 支持

如果喜欢这个主题，请给个 Star ⭐

[GitHub](https://github.com/andyhuo520/openclaw-theme-stardew) | [问题反馈](https://github.com/andyhuo520/openclaw-theme-stardew/issues)
