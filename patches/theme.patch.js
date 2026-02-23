/**
 * OpenClaw Theme Configuration Patch
 * 用于在 OpenClaw 项目中启用星露谷主题的补丁配置
 *
 * 使用方法：
 * 1. 将此文件复制到 OpenClaw 项目的 ui/src/ui/ 目录
 * 2. 在 theme.ts 中导入并使用
 */

// 添加到 theme.ts 的类型定义
export const STARDEW_THEME_TYPES = `
// 星露谷四季主题
export type StardewTheme = "stardew-spring" | "stardew-summer" | "stardew-autumn" | "stardew-winter";

// 扩展 ThemeMode 类型
export type ThemeMode =
  | "system"
  | "light"
  | "dark"
  | "stardew-spring"
  | "stardew-summer"
  | "stardew-autumn"
  | "stardew-winter";

// 星露谷主题信息
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
`;

// 添加到 styles.css 的导入语句
export const STARDEW_CSS_IMPORTS = `
/* 🌾 星露谷物语主题 */
@import "./styles/themes/stardew-spring.css";
@import "./styles/themes/stardew-summer.css";
@import "./styles/themes/stardew-autumn.css";
@import "./styles/themes/stardew-winter.css";
@import "./styles/themes/stardew-common.css";
@import "./styles/themes/stardew-cursors.css";
@import "./styles/themes/stardew-selector.css";
`;

// 添加到 index.html 的脚本引用
export const STARDEW_SCRIPT_IMPORT = `
<!-- 可选：自动季节切换 -->
<script src="scripts/stardew-realtime.js"></script>
`;
