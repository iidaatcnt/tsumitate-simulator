import { useState, useEffect } from 'react';
import { calculateCompoundInterest, formatCurrency } from './utils/calculator';

function App() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  const [startYear, setStartYear] = useState(currentYear);
  const [startMonth, setStartMonth] = useState(currentMonth);
  const [monthlyAmount, setMonthlyAmount] = useState(50000);
  const [years, setYears] = useState(20);
  const [annualRate, setAnnualRate] = useState(7);

  const result = calculateCompoundInterest({
    startYear,
    startMonth,
    monthlyAmount,
    annualRate,
    years,
  });

  const savingsOnly = monthlyAmount * years * 12;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            💰 副業収入投資シミュレーター
          </h1>
          <p className="text-lg text-gray-600">
            月5万円の副業を投資に回したら...?
          </p>
        </div>

        {/* メインカード */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          {/* 入力セクション */}
          <div className="space-y-6 mb-8">
            {/* 開始日 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                開始日
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={startYear}
                  onChange={(e) => setStartYear(Number(e.target.value))}
                  className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  min="2020"
                  max="2100"
                />
                <span className="flex items-center text-gray-600">年</span>
                <input
                  type="number"
                  value={startMonth}
                  onChange={(e) => setStartMonth(Number(e.target.value))}
                  className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  min="1"
                  max="12"
                />
                <span className="flex items-center text-gray-600">月</span>
              </div>
            </div>

            {/* 毎月の投資額 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                毎月の投資額
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={monthlyAmount}
                  onChange={(e) => setMonthlyAmount(Number(e.target.value))}
                  className="w-full px-4 py-2 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  min="0"
                  step="1000"
                />
                <span className="text-gray-600 whitespace-nowrap">円</span>
              </div>
            </div>

            {/* 投資期間 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                投資期間: {years}年
              </label>
              <input
                type="range"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                min="1"
                max="50"
                step="1"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1年</span>
                <span>50年</span>
              </div>
            </div>

            {/* 想定利回り */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                想定利回り: {annualRate}%（年率）
              </label>
              <input
                type="range"
                value={annualRate}
                onChange={(e) => setAnnualRate(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                min="0"
                max="20"
                step="0.5"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0%</span>
                <span>20%</span>
              </div>
            </div>
          </div>

          {/* 結果表示セクション */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-300 rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
              📊 {result.endYear}年{result.endMonth}月の資産額
            </h2>

            <div className="text-center mb-6">
              <div className="text-5xl md:text-6xl font-bold text-red-600 mb-2">
                {formatCurrency(result.finalAmount)}
                <span className="text-2xl md:text-3xl ml-2">円</span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center bg-white bg-opacity-60 rounded-lg p-3">
                <span className="text-gray-700">投資した元本:</span>
                <span className="font-semibold text-gray-800">
                  {formatCurrency(result.principal)}円
                </span>
              </div>
              <div className="flex justify-between items-center bg-white bg-opacity-60 rounded-lg p-3">
                <span className="text-gray-700">運用で増えた額:</span>
                <span className="font-semibold text-green-600">
                  {formatCurrency(result.profit)}円 (+{result.profitRate}%)
                </span>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-2xl">💡</span>
                <div className="flex-1">
                  <p className="text-sm text-gray-700 mb-1">
                    貯金だけなら: <span className="font-semibold">{formatCurrency(savingsOnly)}円</span>
                  </p>
                  <p className="text-sm font-bold text-blue-600">
                    差額: +{formatCurrency(result.profit)}円
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 注意事項 */}
          <div className="mt-6 text-xs text-gray-500 space-y-1">
            <p>※ この計算はシミュレーションです。実際の運用結果を保証するものではありません。</p>
            <p>※ 投資には元本割れのリスクがあります。</p>
            <p>※ 税金や手数料は考慮されていません。</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
