/**
 * 投資シミュレーター計算ロジック
 *
 * 複利計算の公式:
 * FV = PMT × [(1 + r)^n - 1] / r
 *
 * FV: Future Value（将来価値）
 * PMT: Payment（定期的な支払額）
 * r: 期間利率（月利）
 * n: 期間数（月数）
 */

/**
 * 複利計算を実行
 * @param {Object} params - 計算パラメータ
 * @param {number} params.startYear - 開始年
 * @param {number} params.startMonth - 開始月
 * @param {number} params.monthlyAmount - 毎月の投資額
 * @param {number} params.annualRate - 年利率(%)
 * @param {number} params.years - 投資期間(年)
 * @returns {Object} 計算結果
 */
function calculateCompoundInterest({ startYear, startMonth, monthlyAmount, annualRate, years }) {
    // 月利を計算（年利を12で割って100で割る）
    const monthlyRate = annualRate / 12 / 100;

    // 総月数を計算
    const months = years * 12;

    // 元本を計算（毎月の投資額 × 月数）
    const principal = monthlyAmount * months;

    let finalAmount;

    if (monthlyRate === 0) {
        // 利率が0%の場合は元本のみ
        finalAmount = principal;
    } else {
        // 複利計算の公式を適用
        finalAmount = monthlyAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    }

    // 運用益を計算
    const profit = finalAmount - principal;

    // 運用益率を計算（%）
    const profitRate = principal > 0 ? Math.round((profit / principal) * 100) : 0;

    // 終了日を計算
    const endDate = new Date(startYear, startMonth - 1);
    endDate.setMonth(endDate.getMonth() + months);
    const endYear = endDate.getFullYear();
    const endMonth = endDate.getMonth() + 1;

    return {
        finalAmount: Math.round(finalAmount),
        principal: Math.round(principal),
        profit: Math.round(profit),
        profitRate: profitRate,
        endYear: endYear,
        endMonth: endMonth
    };
}

/**
 * 数値を3桁カンマ区切りでフォーマット
 * @param {number} value - フォーマットする数値
 * @returns {string} フォーマットされた文字列
 */
function formatCurrency(value) {
    return new Intl.NumberFormat('ja-JP').format(value);
}
