import React from 'react';
import { SeatData } from '../types';
import { ROWS } from '../data/cinemaData';
import { soundFX } from '../utils/audio';

interface MiniSeatRadarProps {
  seats: SeatData[];
  selectedSeatId: string | null;
  onSeatSelect: (seat: SeatData) => void;
}

export const MiniSeatRadar: React.FC<MiniSeatRadarProps> = ({
  seats,
  selectedSeatId,
  onSeatSelect,
}) => {
  const rowMap = React.useMemo(() => {
    const map = new Map<string, SeatData[]>();
    ROWS.forEach((r) => map.set(r, []));
    seats.forEach((seat) => {
      const list = map.get(seat.row) || [];
      list.push(seat);
      map.set(seat.row, list);
    });
    return map;
  }, [seats]);

  return (
    <div className="flex flex-col items-center p-2 rounded-xl bg-white/[0.03] border border-white/5 select-none">
      {/* Screen Mini Arc */}
      <svg viewBox="0 0 70 8" className="w-16 h-2 mb-1" fill="none">
        <path d="M 4 7 Q 35 1 66 7" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.4" strokeLinecap="round" />
      </svg>

      {/* Micro rows */}
      <div className="flex flex-col gap-0.5">
        {ROWS.map((row) => {
          const rowSeats = rowMap.get(row) || [];
          const leftBlock = rowSeats.filter((s) => s.section === 'left');
          const centerBlock = rowSeats.filter((s) => s.section === 'center');
          const rightBlock = rowSeats.filter((s) => s.section === 'right');

          const renderDot = (seat: SeatData) => {
            const isSelected = seat.id === selectedSeatId;
            const isTaken = seat.status === 'taken';

            let dotColor = 'bg-white/20';
            if (isSelected) dotColor = 'bg-mint scale-150 z-10 shadow-[0_0_6px_#3ddc97] ring-1 ring-white/50';
            else if (isTaken) dotColor = 'bg-white/5';
            else if (seat.type === 'recliner') dotColor = 'bg-[#84394b]/60';

            return (
              <button
                key={`mini-${seat.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isTaken) {
                    soundFX.playSeatClick();
                    onSeatSelect(seat);
                  }
                }}
                disabled={isTaken}
                title={`${seat.row}${seat.number}`}
                className={`w-1.5 h-1.5 rounded-[1px] transition-all ${dotColor} ${isTaken ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-white/60'}`}
              />
            );
          };

          return (
            <div key={`mini-row-${row}`} className="flex items-center gap-1.5">
              <div className="flex gap-0.5">{leftBlock.map(renderDot)}</div>
              <div className="flex gap-0.5">{centerBlock.map(renderDot)}</div>
              <div className="flex gap-0.5">{rightBlock.map(renderDot)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

