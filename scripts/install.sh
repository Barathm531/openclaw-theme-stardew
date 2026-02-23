#!/bin/bash

# ==============================================================================
# OpenClaw 星露谷物语主题安装脚本
# Stardew Valley Theme Installer for OpenClaw
#
# 使用方法:
#   ./install.sh                    # 自动检测 OpenClaw 项目
#   ./install.sh /path/to/openclaw  # 指定 OpenClaw 项目路径
# ==============================================================================

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# 主题包目录
THEME_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# 打印带颜色的消息
log_info() { echo -e "${BLUE}ℹ ${NC}$1"; }
log_success() { echo -e "${GREEN}✓ ${NC}$1"; }
log_warning() { echo -e "${YELLOW}⚠ ${NC}$1"; }
log_error() { echo -e "${RED}✗ ${NC}$1"; }

# 打印横幅
print_banner() {
    echo -e "${CYAN}"
    echo "╔════════════════════════════════════════════════════╗"
    echo "║   🌾 OpenClaw 星露谷物语主题安装器              ║"
    echo "║     Stardew Valley Theme Installer                 ║"
    echo "╚════════════════════════════════════════════════════╝"
    echo -e "${NC}"
}

# 检测 OpenClaw 项目
detect_openclaw() {
    local search_paths=(
        "$1"
        "$(pwd)"
        "$(pwd)/ui"
        "$(dirname "$(pwd)")"
        "$(dirname "$(pwd)")/openclaw"
        "$(dirname "$(pwd)")/openclaw-desktop"
        "$(dirname "$(pwd)")/openclaw-stardew"
    )

    for path in "${search_paths[@]}"; do
        if [[ -z "$path" ]]; then continue; fi

        local styles_dir="$path/ui/src/styles"
        if [[ -d "$styles_dir" ]]; then
            echo "$path"
            return 0
        fi

        styles_dir="$path/src/styles"
        if [[ -d "$styles_dir" ]]; then
            echo "$path"
            return 0
        fi
    done

    return 1
}

# 复制文件
copy_files() {
    local target_root="$1"
    local styles_dir="$target_root/ui/src/styles"

    # 复制主题 CSS 文件
    if [[ -d "$THEME_DIR/css/themes" ]]; then
        log_info "复制主题 CSS 文件..."
        mkdir -p "$styles_dir/themes"
        cp -r "$THEME_DIR/css/themes/"* "$styles_dir/themes/" 2>/dev/null || true
        log_success "主题文件已安装到: $styles_dir/themes"
    fi

    # 复制字体文件
    if [[ -d "$THEME_DIR/fonts" ]]; then
        log_info "复制像素字体文件..."
        mkdir -p "$styles_dir/fonts"
        cp -r "$THEME_DIR/fonts/"* "$styles_dir/fonts/" 2>/dev/null || true
        log_success "字体文件已安装到: $styles_dir/fonts"
    fi

    # 复制脚本文件
    if [[ -d "$THEME_DIR/js" ]]; then
        log_info "复制实时季节脚本..."
        mkdir -p "$target_root/ui/src/scripts"
        cp -r "$THEME_DIR/js/"* "$target_root/ui/src/scripts/" 2>/dev/null || true
        log_success "脚本文件已安装到: $target_root/ui/src/scripts"
    fi
}

# 更新 styles.css
update_styles_css() {
    local styles_css="$1/ui/src/styles.css"

    if [[ ! -f "$styles_css" ]]; then
        log_warning "未找到 styles.css，跳过自动导入"
        print_manual_instructions
        return
    fi

    if grep -q "stardew-spring.css" "$styles_css"; then
        log_success "styles.css 已包含星露谷主题导入"
        return
    fi

    log_info "更新 styles.css 导入..."

    cat >> "$styles_css" << 'EOF'

/* 🌾 星露谷物语主题 - 自动添加 */
@import "./styles/themes/stardew-spring.css";
@import "./styles/themes/stardew-summer.css";
@import "./styles/themes/stardew-autumn.css";
@import "./styles/themes/stardew-winter.css";
@import "./styles/themes/stardew-common.css";
@import "./styles/themes/stardew-cursors.css";
@import "./styles/themes/stardew-selector.css";
EOF

    log_success "已更新 styles.css 导入"
}

# 打印手动安装说明
print_manual_instructions() {
    echo -e "${YELLOW}"
    echo "手动安装说明:"
    echo "  在 styles.css 中添加以下导入语句:"
    echo -e "${NC}"
    echo '  @import "./styles/themes/stardew-spring.css";'
    echo '  @import "./styles/themes/stardew-summer.css";'
    echo '  @import "./styles/themes/stardew-autumn.css";'
    echo '  @import "./styles/themes/stardew-winter.css";'
    echo '  @import "./styles/themes/stardew-common.css";'
    echo '  @import "./styles/themes/stardew-cursors.css";'
    echo ""
}

# 主函数
main() {
    print_banner

    # 检测 OpenClaw 项目
    local openclaw_root=$(detect_openclaw "$1")

    if [[ -z "$openclaw_root" ]]; then
        log_error "未检测到 OpenClaw 项目"
        echo ""
        log_info "请使用以下方式之一运行安装:"
        echo "  1. 在 OpenClaw 项目根目录运行此脚本"
        echo "  2. 指定 OpenClaw 项目路径: ./install.sh /path/to/openclaw"
        echo ""
        print_manual_instructions
        exit 1
    fi

    log_success "检测到 OpenClaw 项目: $openclaw_root"

    # 复制文件
    echo ""
    copy_files "$openclaw_root"

    # 更新样式导入
    echo ""
    update_styles_css "$openclaw_root"

    # 完成
    echo ""
    log_success "星露谷物语主题安装完成!"
    echo ""
    echo -e "${CYAN}使用方法:${NC}"
    echo "  • 在设置中选择: 春季 / 夏季 / 秋季 / 冬季 主题"
    echo '  • 或使用代码: document.documentElement.setAttribute("data-theme", "stardew-spring")'
    echo ""
}

# 运行
main "$@"
