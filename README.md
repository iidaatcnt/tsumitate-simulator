# 副業収入投資シミュレーター

月々の副業収入を投資に回した場合の将来の資産額をシミュレーションするWebアプリです。

🔗 **デモサイト**: https://iidaatcnt.github.io/tsumitate-simulator/

## 特徴

- 🎯 シンプルな操作で即座に計算結果を確認
- 📊 リアルタイムで結果が更新
- 💰 複利効果を視覚的に理解
- 📱 レスポンシブデザイン対応
- 🚀 ビルド不要、静的HTML/CSS/JSのみ

## 初期設定

- 開始日: 現在の年月
- 毎月の投資額: 50,000円
- 投資期間: 20年
- 想定利回り: 7%（年率）

## ファイル構成

```
tsumitate-simulator/
├── index.html          # メインHTML
├── css/
│   └── style.css      # スタイル定義
├── js/
│   ├── calculator.js  # 複利計算ロジック
│   └── app.js         # UI制御・イベント処理
└── README.md
```

### 各ファイルの役割

- **index.html**: アプリの構造を定義
- **css/style.css**: デザインとレイアウトを管理
- **js/calculator.js**: 複利計算の数式を実装
- **js/app.js**: ユーザー入力の処理と画面更新を制御

## ローカルでの動作確認

1. リポジトリをクローン
```bash
git clone https://github.com/iidaatcnt/tsumitate-simulator.git
cd tsumitate-simulator
```

2. ブラウザでindex.htmlを開く
```bash
open index.html
```

または、シンプルなHTTPサーバーを起動:
```bash
# Pythonがインストールされている場合
python3 -m http.server 8000

# Node.jsがインストールされている場合
npx serve
```

ブラウザで `http://localhost:8000` にアクセス

## GitHub Pagesへのデプロイ

このプロジェクトは静的ファイルのみで構成されているため、GitHub Pagesで簡単に公開できます。

### 設定手順

1. GitHubリポジトリの **Settings** → **Pages** に移動
2. **Source** を **Deploy from a branch** に設定
3. **Branch** を **main** / **(root)** に設定
4. **Save** をクリック

数分後、`https://iidaatcnt.github.io/tsumitate-simulator/` で公開されます。

## 計算式

複利計算の標準的な式を使用:

```
最終積立金額 = 毎月積立額 × {[(1 + r)^n - 1] / r}

r = 年利率 / 12（月利）
n = 積立期間（年） × 12（総月数）
```

## カスタマイズ

### 初期値の変更

`index.html` の各input要素の `value` 属性を編集:

```html
<input type="number" id="monthlyAmount" value="50000">
<input type="range" id="years" value="20">
<input type="range" id="annualRate" value="7">
```

### スタイルの変更

`css/style.css` で色やレイアウトをカスタマイズ可能:

```css
/* グラデーション背景 */
body {
    background: linear-gradient(to bottom right, #f0fdf4, #eff6ff);
}

/* 結果表示のメインカラー */
.result-amount {
    color: #dc2626;
}
```

## 技術スタック

- HTML5
- CSS3
- Vanilla JavaScript (ES6+)

依存関係なし、外部ライブラリ不要

## ブラウザ対応

- Chrome（最新版）
- Safari（最新版）
- Firefox（最新版）
- Edge（最新版）

## 注意事項

- この計算はシミュレーションです。実際の運用結果を保証するものではありません。
- 投資には元本割れのリスクがあります。
- 税金や手数料は考慮されていません。
- 実際の投資判断は専門家にご相談ください。

## ライセンス

MIT

## 作者

iidaatcnt
