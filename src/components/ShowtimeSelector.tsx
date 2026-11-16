import React from 'react';
import { Showtime } from '../types';

interface ShowtimeSelectorProps {
  showtimes: Showtime[];
  activeShowtimeId: string;
  onSelectShowtime: (showtime: Showtime) => void;
}

export const ShowtimeSelector: React.FC<ShowtimeSelectorProps> = ({
  showtimes,
  activeShowtimeId,
  onSelectShowtime,
}) => {
  return (
    <div className="w-full flex justify-center px-4 py-2 z-10">
      <div className="inline-flex items-center p-1 rounded-full bg-[#16171d] border border-white/5 shadow-inner">
        {showtimes.map((st) => {
          const isActive = st.id === activeShowtimeId;
          return (
            <button
              key={st.id}
              onClick={() => onSelectShowtime(st)}
              className={`relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ease-out flex items-center gap-1.5 ${
                isActive
                  ? 'bg-white text-black shadow-md scale-100'
                  : 'text-white/60 hover:text-white/90 scale-95'
              }`}
            >
              <span>{st.time}</span>
              <span className={`text-[10px] font-medium uppercase ${isActive ? 'text-black/70' : 'text-white/40'}`}>
                {st.format}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

