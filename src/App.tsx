import React, { useState, useCallback } from 'react';
import { Dices, RotateCcw, Settings, Sparkles } from 'lucide-react';
import Dice from './components/Dice';
import GameStats from './components/GameStats';

function App() {
  const [diceCount, setDiceCount] = useState(2);
  const [diceValues, setDiceValues] = useState<number[]>([1, 1]);
  const [isRolling, setIsRolling] = useState(false);
  const [currentSum, setCurrentSum] = useState(2);
  const [rollHistory, setRollHistory] = useState<number[]>([]);
  const [totalRolls, setTotalRolls] = useState(0);

  const rollDice = useCallback(() => {
    if (isRolling) return;

    setIsRolling(true);
    
    // アニメーション中は複数回値を変更してリアルな回転感を演出
    const animationInterval = setInterval(() => {
      const newValues = Array.from({ length: diceCount }, () => 
        Math.floor(Math.random() * 6) + 1
      );
      setDiceValues(newValues);
    }, 100);

    // 1.5秒後に最終結果を確定
    setTimeout(() => {
      clearInterval(animationInterval);
      const finalValues = Array.from({ length: diceCount }, () => 
        Math.floor(Math.random() * 6) + 1
      );
      const sum = finalValues.reduce((acc, val) => acc + val, 0);
      
      setDiceValues(finalValues);
      setCurrentSum(sum);
      setIsRolling(false);
      setRollHistory(prev => [...prev, sum]);
      setTotalRolls(prev => prev + 1);
    }, 1500);
  }, [diceCount, isRolling]);

  const resetGame = () => {
    setRollHistory([]);
    setTotalRolls(0);
    setCurrentSum(diceCount);
    setDiceValues(Array(diceCount).fill(1));
  };

  const changeDiceCount = (count: number) => {
    setDiceCount(count);
    setDiceValues(Array(count).fill(1));
    setCurrentSum(count);
  };

  const highestRoll = rollHistory.length > 0 ? Math.max(...rollHistory) : 0;
  const averageRoll = rollHistory.length > 0 ? 
    rollHistory.reduce((sum, roll) => sum + roll, 0) / rollHistory.length : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                <Dices className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">サイコロゲーム</h1>
                <p className="text-sm text-gray-600">運試しをしてみましょう！</p>
              </div>
            </div>
            
            <button
              onClick={resetGame}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 
                text-gray-700 rounded-lg transition-colors duration-200"
            >
              <RotateCcw className="w-4 h-4" />
              リセット
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* 設定パネル */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="w-5 h-5 text-gray-700" />
            <h2 className="text-lg font-semibold text-gray-800">ゲーム設定</h2>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <span className="text-sm text-gray-600">サイコロの数:</span>
            {[1, 2, 3, 4, 5, 6].map((count) => (
              <button
                key={count}
                onClick={() => changeDiceCount(count)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  diceCount === count
                    ? 'bg-blue-500 text-white shadow-md transform scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {count}個
              </button>
            ))}
          </div>
        </div>

        {/* メインゲームエリア */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-200">
          {/* 現在の合計点 */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-6 h-6 text-yellow-500" />
              <span className="text-lg text-gray-600">合計点</span>
            </div>
            <div className={`text-6xl font-bold transition-all duration-500 ${
              isRolling ? 'text-blue-500 animate-pulse' : 'text-gray-800'
            }`}>
              {currentSum}
            </div>
          </div>

          {/* サイコロ表示エリア */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {diceValues.map((value, index) => (
              <Dice
                key={index}
                value={value}
                isRolling={isRolling}
                size="large"
              />
            ))}
          </div>

          {/* ロールボタン */}
          <div className="text-center">
            <button
              onClick={rollDice}
              disabled={isRolling}
              className={`px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 
                ${isRolling 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105'
                }`}
            >
              {isRolling ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  振っています...
                </span>
              ) : (
                '🎲 サイコロを振る'
              )}
            </button>
          </div>
        </div>

        {/* 統計パネル */}
        {totalRolls > 0 && (
          <GameStats
            totalRolls={totalRolls}
            highestRoll={highestRoll}
            averageRoll={averageRoll}
            rollHistory={rollHistory}
          />
        )}
      </main>

      {/* フッター */}
      <footer className="text-center py-8 text-gray-500">
        <p className="text-sm">🎲 サイコロゲーム - 楽しいひとときをお過ごしください</p>
      </footer>
    </div>
  );
}

export default App;