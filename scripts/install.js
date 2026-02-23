#!/usr/bin/env node

/**
 * OpenClaw Stardew Valley Theme Installer
 * 自动将星露谷物语主题安装到 OpenClaw 项目中
 */

const fs = require('fs');
const path = require('path');

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// 主题包根目录
const themePackageRoot = path.resolve(__dirname, '..');

// OpenClaw 可能的目录位置
const possibleOpenClawPaths = [
  // 当前目录
  path.resolve(process.cwd()),
  // 父目录（如果主题包在 node_modules 中）
  path.resolve(process.cwd(), '..'),
  // 上两级（如果是 workspace）
  path.resolve(process.cwd(), '..', '..'),
  // 常见项目名
  path.resolve(process.cwd(), '..', 'openclaw'),
  path.resolve(process.cwd(), '..', 'openclaw-desktop'),
  path.resolve(process.cwd(), '..', 'openclaw-stardew'),
  // UI 子目录
  path.resolve(process.cwd(), 'ui'),
  path.resolve(process.cwd(), '..', 'ui'),
];

// 检测 OpenClaw 项目
function detectOpenClawProject() {
  for (const checkPath of possibleOpenClawPaths) {
    const stylesPath = path.join(checkPath, 'ui', 'src', 'styles');
    const stylesPathAlt = path.join(checkPath, 'src', 'styles');

    if (fs.existsSync(stylesPath)) {
      return { root: checkPath, stylesDir: stylesPath, type: 'ui-subdir' };
    }
    if (fs.existsSync(stylesPathAlt)) {
      return { root: checkPath, stylesDir: stylesPathAlt, type: 'src-subdir' };
    }
  }
  return null;
}

// 复制目录
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// 安装主题文件
function installThemeFiles(openclawProject) {
  const { root, stylesDir, type } = openclawProject;

  log('\n🌾 开始安装星露谷物语主题...\n', 'cyan');

  // 1. 复制主题 CSS 文件
  const themesDestDir = path.join(stylesDir, 'themes');
  const fontsDestDir = path.join(stylesDir, 'fonts');
  const scriptsDestDir = path.join(root, 'ui', 'src', 'scripts');

  // 源目录
  const themesSrcDir = path.join(themePackageRoot, 'css', 'themes');
  const fontsSrcDir = path.join(themePackageRoot, 'fonts');
  const scriptsSrcDir = path.join(themePackageRoot, 'js');

  // 复制主题文件
  if (fs.existsSync(themesSrcDir)) {
    log('📦 复制主题 CSS 文件...', 'blue');
    copyDir(themesSrcDir, themesDestDir);
    log(`   ✓ 主题文件已安装到: ${themesDestDir}`, 'green');
  }

  // 复制字体文件
  if (fs.existsSync(fontsSrcDir)) {
    log('🔤 复制像素字体文件...', 'blue');
    copyDir(fontsSrcDir, fontsDestDir);
    log(`   ✓ 字体文件已安装到: ${fontsDestDir}`, 'green');
  }

  // 复制脚本文件
  if (fs.existsSync(scriptsSrcDir)) {
    log('📜 复制实时季节脚本...', 'blue');
    copyDir(scriptsSrcDir, scriptsDestDir);
    log(`   ✓ 脚本文件已安装到: ${scriptsDestDir}`, 'green');
  }

  // 2. 修改 styles.css 入口文件
  const stylesCssPath = path.join(stylesDir, '..', 'styles.css');
  updateStylesCss(stylesCssPath);

  // 3. 更新 theme.ts 类型定义
  const themeTsPath = findThemeTsFile(root);
  if (themeTsPath) {
    updateThemeTypes(themeTsPath);
  }

  log('\n✅ 星露谷物语主题安装完成！\n', 'green');
  log('使用方法:', 'yellow');
  log('  - 在设置中选择: 春季 / 夏季 / 秋季 / 冬季 主题', 'reset');
  log('  - 或使用代码: document.documentElement.setAttribute("data-theme", "stardew-spring")', 'reset');
  log('');
}

// 查找 theme.ts 文件
function findThemeTsFile(root) {
  const possiblePaths = [
    path.join(root, 'ui', 'src', 'ui', 'theme.ts'),
    path.join(root, 'src', 'ui', 'theme.ts'),
    path.join(root, 'src', 'theme.ts'),
  ];

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      return p;
    }
  }
  return null;
}

// 更新 styles.css
function updateStylesCss(stylesCssPath) {
  if (!fs.existsSync(stylesCssPath)) {
    log('⚠️  未找到 styles.css，跳过自动导入', 'yellow');
    log('   请手动添加以下导入语句:', 'yellow');
    printManualImports();
    return;
  }

  let content = fs.readFileSync(stylesCssPath, 'utf-8');

  // 检查是否已安装
  if (content.includes('stardew-spring.css')) {
    log('📝 styles.css 已包含星露谷主题导入', 'green');
    return;
  }

  // 添加导入语句
  const imports = `
/* 🌾 星露谷物语主题 - 自动添加 */
@import "./styles/themes/stardew-spring.css";
@import "./styles/themes/stardew-summer.css";
@import "./styles/themes/stardew-autumn.css";
@import "./styles/themes/stardew-winter.css";
@import "./styles/themes/stardew-common.css";
@import "./styles/themes/stardew-cursors.css";
@import "./styles/themes/stardew-selector.css";
`;

  content = content.trimEnd() + '\n' + imports;
  fs.writeFileSync(stylesCssPath, content);
  log('📝 已更新 styles.css 导入', 'green');
}

// 更新 theme.ts 类型定义
function updateThemeTypes(themeTsPath) {
  let content = fs.readFileSync(themeTsPath, 'utf-8');

  // 检查是否已包含星露谷主题类型
  if (content.includes('stardew-spring')) {
    log('📝 theme.ts 已包含星露谷主题类型', 'green');
    return;
  }

  // 添加星露谷主题类型
  const stardewThemes = `"stardew-spring" | "stardew-summer" | "stardew-autumn" | "stardew-winter"`;

  // 尝试更新 ThemeMode 类型
  const themeModeRegex = /export type ThemeMode\s*=\s*([^;]+);/;
  if (themeModeRegex.test(content)) {
    content = content.replace(themeModeRegex, (match, types) => {
      if (types.includes('stardew')) return match;
      return `export type ThemeMode = ${types.trim()} | ${stardewThemes};`;
    });
    fs.writeFileSync(themeTsPath, content);
    log('📝 已更新 theme.ts 类型定义', 'green');
  } else {
    log('⚠️  无法自动更新 theme.ts，请手动添加主题类型', 'yellow');
  }
}

// 打印手动导入说明
function printManualImports() {
  log('\n   在 styles.css 中添加:', 'cyan');
  log('   @import "./styles/themes/stardew-spring.css";', 'reset');
  log('   @import "./styles/themes/stardew-summer.css";', 'reset');
  log('   @import "./styles/themes/stardew-autumn.css";', 'reset');
  log('   @import "./styles/themes/stardew-winter.css";', 'reset');
  log('   @import "./styles/themes/stardew-common.css";', 'reset');
  log('   @import "./styles/themes/stardew-cursors.css";', 'reset');
  log('');
}

// 主函数
function main() {
  log('\n╔════════════════════════════════════════════════════╗', 'cyan');
  log('║   🌾 OpenClaw 星露谷物语主题安装器              ║', 'cyan');
  log('║     Stardew Valley Theme Installer                 ║', 'cyan');
  log('╚════════════════════════════════════════════════════╝\n', 'cyan');

  // 检测 OpenClaw 项目
  const openclawProject = detectOpenClawProject();

  if (!openclawProject) {
    log('❌ 未检测到 OpenClaw 项目', 'red');
    log('\n请确保在以下位置之一运行安装:', 'yellow');
    log('  - OpenClaw 项目根目录', 'reset');
    log('  - OpenClaw/ui 目录', 'reset');
    log('  - 或使用 --target 参数指定路径', 'reset');
    log('\n手动安装说明:', 'yellow');
    printManualImports();
    process.exit(1);
  }

  log(`📁 检测到 OpenClaw 项目: ${openclawProject.root}`, 'green');

  // 安装主题
  installThemeFiles(openclawProject);
}

// 运行
main();
