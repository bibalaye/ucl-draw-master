import { useState, useEffect } from 'react';
import { Team } from '@/data/teams';

interface DrawBallProps {
  team?: Team;
  isDrawing?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const DrawBall = ({ team, isDrawing = false, size = 'md', className = '' }: DrawBallProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isDrawing) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 600);
      return () => clearTimeout(timer);
    }
  }, [isDrawing]);

  const sizeClasses = {
    sm: 'w-12 h-12 text-xs',
    md: 'w-16 h-16 text-sm',
    lg: 'w-20 h-20 text-base'
  };

  const potColors = {
    1: 'from-yellow-400 to-yellow-600',
    2: 'from-blue-400 to-blue-600', 
    3: 'from-green-400 to-green-600',
    4: 'from-purple-400 to-purple-600'
  };

  return (
    <div 
      className={`
        relative ${sizeClasses[size]} rounded-full 
        bg-gradient-to-br ${team ? potColors[team.pot as keyof typeof potColors] : 'from-gray-300 to-gray-500'}
        shadow-lg flex items-center justify-center
        ${isAnimating ? 'animate-uefa-draw' : 'animate-uefa-float'}
        ${className}
      `}
      style={{
        boxShadow: 'var(--shadow-ball), inset 0 2px 4px rgba(255,255,255,0.3)'
      }}
    >
      {/* Ball highlight effect */}
      <div className="absolute inset-2 rounded-full bg-white/20" />
      
      {/* Team info */}
      {team && (
        <div className="relative z-10 text-center text-white font-bold px-1">
          <div className="text-[10px] leading-tight">{team.name}</div>
          {size !== 'sm' && (
            <div className="text-[8px] opacity-80">{team.country}</div>
          )}
        </div>
      )}
      
      {/* Empty ball */}
      {!team && (
        <div className="relative z-10 w-8 h-8 rounded-full border-2 border-white/50" />
      )}
    </div>
  );
};

export default DrawBall;