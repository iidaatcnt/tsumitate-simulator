/**
 * 投資シミュレーター UI制御
 *
 * このファイルでは以下を管理:
 * - 入力要素の取得とイベントリスナーの設定
 * - 入力値の変更検知
 * - 計算の実行と結果の表示更新
 */

// DOM要素の取得
const elements = {
    // 入力要素
    startYear: document.getElementById('startYear'),
    startMonth: document.getElementById('startMonth'),
    monthlyAmount: document.getElementById('monthlyAmount'),
    years: document.getElementById('years'),
    annualRate: document.getElementById('annualRate'),

    // スライダーの値表示
    yearsValue: document.getElementById('yearsValue'),
    annualRateValue: document.getElementById('annualRateValue'),

    // 結果表示要素
    endDate: document.getElementById('endDate'),
    resultDescription: document.getElementById('resultDescription'),
    finalAmount: document.getElementById('finalAmount'),
    principal: document.getElementById('principal'),
    profit: document.getElementById('profit'),
    savingsOnly: document.getElementById('savingsOnly'),
    difference: document.getElementById('difference')
};

/**
 * 入力値を取得
 * @returns {Object} 入力パラメータ
 */
function getInputValues() {
    return {
        startYear: parseInt(elements.startYear.value) || 2025,
        startMonth: parseInt(elements.startMonth.value) || 10,
        monthlyAmount: parseInt(elements.monthlyAmount.value) || 50000,
        annualRate: parseFloat(elements.annualRate.value) || 7,
        years: parseInt(elements.years.value) || 20
    };
}

/**
 * 結果を画面に表示
 */
function updateDisplay() {
    // 入力値を取得
    const inputs = getInputValues();

    // スライダーの値を更新
    elements.yearsValue.textContent = inputs.years;
    elements.annualRateValue.textContent = inputs.annualRate;

    // 計算を実行
    const result = calculateCompoundInterest(inputs);

    // 貯金のみの場合の金額
    const savingsOnly = inputs.monthlyAmount * inputs.years * 12;

    // 結果を表示
    elements.endDate.textContent = `${result.endYear}年${result.endMonth}月`;

    // 説明文を動的に生成
    const monthlyAmountText = inputs.monthlyAmount >= 10000
        ? `${inputs.monthlyAmount / 10000}万円`
        : `${formatCurrency(inputs.monthlyAmount)}円`;
    elements.resultDescription.textContent =
        `月${monthlyAmountText}を優良なインデックスファンド（年利${inputs.annualRate}%）に${inputs.years}年間投資した結果のシミュレーション`;

    elements.finalAmount.textContent = formatCurrency(result.finalAmount);
    elements.principal.textContent = formatCurrency(result.principal) + '円';
    elements.profit.textContent =
        `${formatCurrency(result.profit)}円 (+${result.profitRate}%)`;
    elements.savingsOnly.textContent = formatCurrency(savingsOnly) + '円';
    elements.difference.textContent = '+' + formatCurrency(result.profit) + '円';
}

/**
 * イベントリスナーを設定
 */
function setupEventListeners() {
    // すべての入力要素に変更イベントリスナーを追加
    elements.startYear.addEventListener('input', updateDisplay);
    elements.startMonth.addEventListener('input', updateDisplay);
    elements.monthlyAmount.addEventListener('input', updateDisplay);
    elements.years.addEventListener('input', updateDisplay);
    elements.annualRate.addEventListener('input', updateDisplay);
}

/**
 * アプリケーション初期化
 */
function init() {
    // 現在の日付を取得して初期値に設定
    const now = new Date();
    elements.startYear.value = now.getFullYear();
    elements.startMonth.value = now.getMonth() + 1;

    // イベントリスナーを設定
    setupEventListeners();

    // 初期表示を更新
    updateDisplay();
}

// ページ読み込み完了時に初期化を実行
document.addEventListener('DOMContentLoaded', init);
