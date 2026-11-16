import React from 'react';
import { SeatData } from '../types';
import { ROWS } from '../data/cinemaData';
import { soundFX } from '../utils/audio';

interface SeatMapProps {
  seats: SeatData[];
  selectedSeatId: string | null;
  onSeatSelect: (seat: SeatData) => void;
}

export const SeatMap: React.FC<SeatMapProps> = ({
  seats,
  selectedSeatId,
  onSeatSelect,
}) => {
  // Group seats by row
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

  const [activeRippleSeatId, setActiveRippleSeatId] = React.useState<string | null>(null);

  const handleSeatClick = (seat: SeatData) => {
    if (seat.status === 'taken') return;
    setActiveRippleSeatId(seat.id);
    setTimeout(() => {
      setActiveRippleSeatId((current) => (current === seat.id ? null : current));
    }, 550);
    soundFX.playSeatClick();
    onSeatSelect(seat);
  };

  const renderSeat = (seat: SeatData) => {
    const isSelected = seat.id === selectedSeatId;
    const isTaken = seat.status === 'taken';
    const isRecliner = seat.type === 'recliner';

    let styling = '';

    if (isSelected) {
      styling = 'bg-mint text-black font-bold shadow-mint-glow scale-110 z-10';
    } else if (isTaken) {
      if (isRecliner) {
        styling = 'border border-[#5a2734] bg-transparent opacity-30 cursor-not-allowed';
      } else {
        styling = 'border border-[#2d2f38] bg-transparent opacity-30 cursor-not-allowed';
      }
    } else {
      if (isRecliner) {
        styling = 'bg-[#7a3344] hover:bg-[#923d52] active:scale-95 cursor-pointer';
      } else {
        styling = 'bg-[#33353e] hover:bg-[#434652] active:scale-95 cursor-pointer';
      }
    }

    return (
      <div key={seat.id} className="relative flex items-center justify-center">
        {/* Animated Touch Ripple Feedback (matches reference video f_0036.jpg) */}
        {activeRippleSeatId === seat.id && (
          <span className="absolute w-8 h-8 rounded-full bg-white/35 border border-white/50 pointer-events-none animate-seat-ripple z-30" />
        )}
        <button
          onClick={() => handleSeatClick(seat)}
          disabled={isTaken}
          aria-label={`Row ${seat.row} Seat ${seat.number}${isSelected ? ' (Selected)' : isTaken ? ' (Taken)' : ''}`}
          className={`w-4 h-4 sm:w-5 sm:h-5 rounded-[4px] sm:rounded-[5px] flex items-center justify-center text-[9px] sm:text-[10px] transition-all duration-200 outline-none ${styling}`}
        >
          {isSelected ? seat.number : null}
        </button>
      </div>
    );
  };

  return (
    <div className="w-full max-w-[390px] mx-auto px-4 flex flex-col items-center select-none">
      {/* Seating Grid */}
      <div className="w-full flex flex-col gap-2.5 sm:gap-3 py-2">
        {ROWS.map((row) => {
          const rowSeats = rowMap.get(row) || [];
          const leftBlock = rowSeats.filter((s) => s.section === 'left');
          const centerBlock = rowSeats.filter((s) => s.section === 'center');
          const rightBlock = rowSeats.filter((s) => s.section === 'right');

          return (
            <div key={row} className="flex items-center justify-between w-full">
              {/* Row Label */}
              <span className="w-4 text-[10px] font-medium text-white/30 text-left">
                {row}
              </span>

              {/* Row Seats with Aisles */}
              <div className="flex-1 flex items-center justify-center gap-4 sm:gap-5">
                {/* Left Block (3 seats) */}
                <div className="flex items-center gap-1 sm:gap-1.5">
                  {row === 'A' && <div className="w-4 h-4 sm:w-5 sm:h-5" />}
                  {leftBlock.map(renderSeat)}
                </div>

                {/* Center Block (7 seats) */}
                <div className="flex items-center gap-1 sm:gap-1.5">
                  {centerBlock.map(renderSeat)}
                </div>

                {/* Right Block (3 seats) */}
                <div className="flex items-center gap-1 sm:gap-1.5">
                  {rightBlock.map(renderSeat)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend Row */}
      <div className="flex items-center justify-center gap-4 sm:gap-5 mt-6 mb-2 text-[10px] text-white/50 tracking-wide">
        {/* Available */}
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-[3px] bg-[#33353e]" />
          <span>Available</span>
        </div>

        {/* Taken */}
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-[3px] border border-[#3b3e4a] bg-transparent" />
          <span>Taken</span>
        </div>

        {/* Recliner */}
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-[3px] bg-[#7a3344]" />
          <span>Recliner</span>
        </div>

        {/* Selected */}
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-[3px] bg-mint shadow-mint-glow" />
          <span>Selected</span>
        </div>
      </div>
    </div>
  );
};

