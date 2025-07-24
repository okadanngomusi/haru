import React from 'react';

interface DiceProps {
  value: number;
  isRolling: boolean;
  size?: 'small' | 'medium' | 'large';
}

const Dice: React.FC<DiceProps> = ({ value, isRolling, size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-12 h-12 text-xs',
    medium: 'w-16 h-16 text-sm',
    large: 'w-20 h-20 text-base'
  };

  const renderDots = (value: number) => {
    const dotPositions = {
      1: ['center'],
      2: ['top-left', 'bottom-right'],
      3: ['top-left', 'center', 'bottom-right'],
      4: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
      5: ['top-left', 'top-right', 'center', 'bottom-left', 'bottom-right'],
      6: ['top-left', 'top-right', 'middle-left', 'middle-right', 'bottom-left', 'bottom-right']
    };

    const positions = dotPositions[value as keyof typeof dotPositions] || [];

    return (
      <div className="relative w-full h-full p-2">
        {positions.map((position, index) => (
          <div
            key={index}
            className={`absolute w-2 h-2 bg-gray-800 rounded-full ${
              position === 'top-left' ? 'top-1 left-1' :
              position === 'top-right' ? 'top-1 right-1' :
              position === 'center' ? 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' :
              position === 'middle-left' ? 'top-1/2 left-1 transform -translate-y-1/2' :
              position === 'middle-right' ? 'top-1/2 right-1 transform -translate-y-1/2' :
              position === 'bottom-left' ? 'bottom-1 left-1' :
              position === 'bottom-right' ? 'bottom-1 right-1' : ''
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div
      className={`${sizeClasses[size]} bg-white border-2 border-gray-300 rounded-xl shadow-lg 
        ${isRolling ? 'animate-spin' : ''} 
        transition-all duration-300 hover:shadow-xl hover:scale-105
        relative overflow-hidden`}
      style={{
        background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
        boxShadow: isRolling ? '0 0 20px rgba(59, 130, 246, 0.3)' : '0 4px 15px rgba(0, 0, 0, 0.1)'
      }}
    >
      {!isRolling && renderDots(value)}
      {isRolling && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
        </div>
      )}
    </div>
  );
};

export default Dice;