/**
 * OpenClaw Stardew Valley Theme - Type Definitions
 * 星露谷物语主题类型定义
 */

/**
 * 星露谷四季主题名称
 */
export type StardewTheme =
  | 'stardew-spring'
  | 'stardew-summer'
  | 'stardew-autumn'
  | 'stardew-winter';

/**
 * 星露谷主题信息
 */
export interface StardewThemeInfo {
  name: string;
  nameZh: string;
  icon: string;
  description: string;
  accentColor: string;
  bgColor: string;
}

/**
 * 星露谷主题配置映射
 */
export const STARDEW_THEMES: StardewTheme[];

/**
 * 星露谷主题详细信息映射
 */
export const STARDEW_THEME_INFO: Record<StardewTheme, StardewThemeInfo>;

/**
 * 设置星露谷主题
 * @param theme 主题名称
 */
export function setStardewTheme(theme: StardewTheme): void;

/**
 * 根据当前月份自动设置季节主题
 */
export function autoSeason(): void;

/**
 * 获取当前季节
 * @returns 春季/夏季/秋季/冬季
 */
export function getCurrentSeason(): 'spring' | 'summer' | 'autumn' | 'winter';

/**
 * 实时季节控制器
 */
export interface StardewRealTimeController {
  /**
   * 启用自动季节切换
   */
  enableAutoSeason(): void;

  /**
   * 禁用自动季节切换
   */
  disableAutoSeason(): void;

  /**
   * 手动设置季节
   */
  setSeason(season: 'spring' | 'summer' | 'autumn' | 'winter'): void;

  /**
   * 获取当前季节
   */
  getSeason(): 'spring' | 'summer' | 'autumn' | 'winter';

  /**
   * 是否启用自动切换
   */
  isEnabled(): boolean;
}

/**
 * 全局实时季节控制器实例
 */
declare global {
  interface Window {
    stardewRealTime?: StardewRealTimeController;
  }
}

export {};
