export interface SimulationResult {
  finalAmount: number;
  principal: number;
  profit: number;
  profitRate: number;
  endYear: number;
  endMonth: number;
}

export interface SimulationInput {
  startYear: number;
  startMonth: number;
  monthlyAmount: number;
  annualRate: number;
  years: number;
}

/**
 * 複利計算を実行
 * FV = PMT × [(1 + r)^n - 1] / r
 * FV: Future Value（将来価値）
 * PMT: Payment（定期的な支払額）
 * r: 期間利率
 * n: 期間数
 */
export function calculateCompoundInterest(input: SimulationInput): SimulationResult {
  const { startYear, startMonth, monthlyAmount, annualRate, years } = input;

  const monthlyRate = annualRate / 12 / 100;
  const months = years * 12;
  const principal = monthlyAmount * months;

  let finalAmount: number;

  if (monthlyRate === 0) {
    // 利率が0%の場合は元本のみ
    finalAmount = principal;
  } else {
    // 複利計算
    finalAmount = monthlyAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
  }

  const profit = finalAmount - principal;
  const profitRate = principal > 0 ? (profit / principal) * 100 : 0;

  // 終了日の計算
  const endDate = new Date(startYear, startMonth - 1);
  endDate.setMonth(endDate.getMonth() + months);

  return {
    finalAmount: Math.round(finalAmount),
    principal: Math.round(principal),
    profit: Math.round(profit),
    profitRate: Math.round(profitRate),
    endYear: endDate.getFullYear(),
    endMonth: endDate.getMonth() + 1,
  };
}

/**
 * 数値を3桁カンマ区切りでフォーマット
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('ja-JP').format(value);
}
