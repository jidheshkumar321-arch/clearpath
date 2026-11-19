import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  withTagline?: boolean;
  className?: string;
  inverted?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  withTagline = false,
  className = '',
  inverted = false
}) => {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Path / Checkpoint Symbol */}
      <div className={`relative flex items-center justify-center rounded-xl transition-transform hover:scale-105 border border-[#252B38] ${iconSizes[size]} ${
        inverted ? 'bg-white text-[#090B10] shadow-md' : 'bg-gradient-to-br from-[#10131A] to-[#171B25] text-white shadow-soft shadow-blue-500/10'
      }`}>
        <svg
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-4/5 h-4/5"
        >
          {/* Subtle grid path */}
          <path
            d="M5 21L11 15L17 19L23 7"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={inverted ? 'text-slate-900' : 'text-slate-400'}
          />
          {/* Active checkpoints along the path */}
          <circle cx="5" cy="21" r="2.5" fill="#60A5FA" />
          <circle cx="11" cy="15" r="2.5" fill="#3B82F6" />
          <circle cx="17" cy="19" r="2.5" fill="#60A5FA" />
          <circle cx="23" cy="7" r="3" fill="#3B82F6" stroke="#090B10" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="flex flex-col">
        <span
          className={`font-extrabold tracking-tight font-sans leading-none ${textSizes[size]} ${
            inverted ? 'text-slate-900' : 'text-[#F8FAFC]'
          }`}
        >
          CLEAR<span className="text-blue-500 font-black">PATH</span>
        </span>
        {withTagline && (
          <span className={`text-[10px] uppercase font-bold tracking-wider mt-1 ${
            inverted ? 'text-slate-500' : 'text-[#A1A1AA]'
          }`}>
            Your issue. Your plan. Your progress.
          </span>
        )}
      </div>
    </div>
  );
};
