#!/usr/bin/env node

/**
 * OpenClaw Stardew Valley Theme Uninstaller
 * 从 OpenClaw 项目中移除星露谷物语主题
 */

const fs = require('fs');
const path = require('path');

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

// 要删除的主题文件列表
const THEME_FILES = [
  'stardew-spring.css',
  'stardew-summer.css',
  'stardew-autumn.css',
  'stardew-winter.css',
  'stardew-common.css',
  'stardew-cursors.css',
  'stardew-selector.css',
  'stardew-realtime.css',
  'stardew-decorations.css',
  'stardew-farm-decorations.css',
  'stardew-crop-progress.css',
  'stardew-weather.css',
  'stardew-scroll.css',
  'stardew-sprites.css',
];

// 检测 OpenClaw 项目
function detectOpenClawProject() {
  const possiblePaths = [
    path.resolve(process.cwd()),
    path.resolve(process.cwd(), '..'),
    path.resolve(process.cwd(), 'ui'),
    path.resolve(process.cwd(), '..', 'ui'),
  ];

  for (const checkPath of possiblePaths) {
    const stylesPath = path.join(checkPath, 'ui', 'src', 'styles');
    const stylesPathAlt = path.join(checkPath, 'src', 'styles');

    if (fs.existsSync(stylesPath)) {
      return { root: checkPath, stylesDir: stylesPath };
    }
    if (fs.existsSync(stylesPathAlt)) {
      return { root: checkPath, stylesDir: stylesPathAlt };
    }
  }
  return null;
}

// 删除目录
function removeDir(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
    return true;
  }
  return false;
}

// 卸载主题
function uninstall() {
  log('\n🗑️  卸载星露谷物语主题...\n', 'cyan');

  const project = detectOpenClawProject();

  if (!project) {
    log('❌ 未检测到 OpenClaw 项目', 'red');
    process.exit(1);
  }

  const { root, stylesDir } = project;
  const themesDir = path.join(stylesDir, 'themes');
  const fontsDir = path.join(stylesDir, 'fonts');
  const scriptsDir = path.join(root, 'ui', 'src', 'scripts');

  // 删除主题 CSS 文件
  for (const file of THEME_FILES) {
    const filePath = path.join(themesDir, file);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      log(`  ✓ 删除: ${file}`, 'green');
    }
  }

  // 删除字体文件 (仅星露谷相关)
  const stardewFonts = fs.readdirSync(fontsDir).filter(f =>
    f.includes('ark-pixel') || f.includes('stardew')
  );
  for (const font of stardewFonts) {
    const fontPath = path.join(fontsDir, font);
    if (fs.existsSync(fontPath)) {
      fs.unlinkSync(fontPath);
      log(`  ✓ 删除字体: ${font}`, 'green');
    }
  }

  // 删除实时脚本
  const realtimeScript = path.join(scriptsDir, 'stardew-realtime.js');
  if (fs.existsSync(realtimeScript)) {
    fs.unlinkSync(realtimeScript);
    log(`  ✓ 删除脚本: stardew-realtime.js`, 'green');
  }

  log('\n✅ 星露谷物语主题已卸载', 'green');
  log('\n⚠️  请手动从 styles.css 中移除相关导入语句', 'yellow');
}

uninstall();
