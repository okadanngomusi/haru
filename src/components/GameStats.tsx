import React from 'react';
import { BarChart3, Trophy, TrendingUp } from 'lucide-react';

interface GameStatsProps {
  totalRolls: number;
  highestRoll: number;
  averageRoll: number;
  rollHistory: number[];
}

const GameStats: React.FC<GameStatsProps> = ({ totalRolls, highestRoll, averageRoll, rollHistory }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-blue-600" />
        ゲーム統計
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{totalRolls}</div>
          <div className="text-sm text-blue-700">総回数</div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600 flex items-center justify-center gap-1">
            <Trophy className="w-5 h-5" />
            {highestRoll}
          </div>
          <div className="text-sm text-green-700">最高点</div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-600 flex items-center justify-center gap-1">
            <TrendingUp className="w-5 h-5" />
            {averageRoll.toFixed(1)}
          </div>
          <div className="text-sm text-purple-700">平均点</div>
        </div>
      </div>

      {rollHistory.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">最近の履歴</h4>
          <div className="flex flex-wrap gap-2">
            {rollHistory.slice(-10).map((roll, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
              >
                {roll}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GameStats;