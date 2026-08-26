export function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export const CATEGORY_CODE: Record<string, string> = {
  學習紀錄: 'LOG',
  專案開發紀錄: 'DEV',
  技術文章: 'ART',
  鐵人賽系列: 'ITH',
};
