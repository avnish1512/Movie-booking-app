import React from 'react';
import { ChevronLeft, Info, Eye, Layers } from 'lucide-react';
import { ViewMode, SeatData, Showtime, CameraPerspective } from '../types';

interface CinemaHeaderProps {
  viewMode: ViewMode;
  selectedSeat: SeatData | null;
  activeShowtime: Showtime;
  cameraPerspective?: CameraPerspective;
  onBack: () => void;
  onInfoClick: () => void;
  onTogglePerspective?: () => void;
}

export const CinemaHeader: React.FC<CinemaHeaderProps> = ({
  viewMode,
  selectedSeat,
  activeShowtime,
  cameraPerspective = 'pov',
  onBack,
  onInfoClick,
  onTogglePerspective,
}) => {
  if (viewMode === 'view3d') {
    return (
      <header className="relative w-full px-5 pt-4 pb-2 flex items-center justify-between z-20">
        {/* Back button to return to 2D Seat Map */}
        <button
          onClick={onBack}
          aria-label="Back to Seat Map"
          className="w-10 h-10 rounded-full bg-[#1c1d22]/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/90 hover:text-white hover:bg-white/15 active:scale-95 transition-all shadow-lg"
        >
          <ChevronLeft size={20} />
        </button>

        {/* View from seat pill indicator - clickable to toggle perspective */}
        <button
          onClick={onTogglePerspective}
          aria-label="Toggle camera perspective"
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18191f]/90 backdrop-blur-md border border-white/10 hover:border-mint/50 shadow-lg active:scale-95 transition-all group"
        >
          <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
          <span className="text-xs font-medium text-white/95 tracking-wide">
            View from {selectedSeat?.id || 'Seat'}
          </span>
          <span className="text-[10px] font-semibold text-mint/90 bg-mint/15 px-1.5 py-0.5 rounded tracking-wide uppercase group-hover:bg-mint group-hover:text-black transition-colors">
            {cameraPerspective === 'pov' ? 'POV' : 'Hall'}
          </span>
        </button>

        {/* Perspective toggle icon button (Hall Overview <-> POV) */}
        <button
          onClick={onTogglePerspective}
          aria-label={cameraPerspective === 'pov' ? 'Switch to Auditorium Hall View' : 'Switch to Seated POV'}
          title={cameraPerspective === 'pov' ? 'Switch to Auditorium Hall View' : 'Switch to Seated POV'}
          className="w-10 h-10 rounded-full bg-[#1c1d22]/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/90 hover:text-mint hover:bg-white/15 active:scale-95 transition-all shadow-lg"
        >
          {cameraPerspective === 'pov' ? <Layers size={18} /> : <Eye size={18} />}
        </button>
      </header>
    );
  }

  return (
    <header className="relative w-full px-5 pt-4 pb-2 flex items-center justify-between z-20">
      {/* Back button */}
      <button
        onClick={onBack}
        aria-label="Back"
        className="w-10 h-10 rounded-full bg-[#18191f] border border-white/5 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Cinema Title & Hall info */}
      <div className="text-center">
        <h1 className="text-base font-semibold tracking-tight text-white">
          {activeShowtime.cinema}
        </h1>
        <p className="text-xs text-white/50 tracking-wide mt-0.5">
          {activeShowtime.hall} · {activeShowtime.date}
        </p>
      </div>

      {/* Info button */}
      <button
        onClick={onInfoClick}
        aria-label="Cinema Information"
        className="w-10 h-10 rounded-full bg-[#18191f] border border-white/5 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
      >
        <Info size={18} />
      </button>
    </header>
  );
};
