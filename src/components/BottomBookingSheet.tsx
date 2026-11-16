import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { ViewMode, SeatData, CameraPerspective } from '../types';
import { MiniSeatRadar } from './MiniSeatRadar';

interface BottomBookingSheetProps {
  viewMode: ViewMode;
  selectedSeat: SeatData | null;
  seats: SeatData[];
  cameraPerspective?: CameraPerspective;
  onSeatSelect: (seat: SeatData) => void;
  onContinue: () => void;
  onChangeSeat: () => void;
  onBook: () => void;
  onTogglePerspective?: () => void;
}

export const BottomBookingSheet: React.FC<BottomBookingSheetProps> = ({
  viewMode,
  selectedSeat,
  seats,
  cameraPerspective = 'pov',
  onSeatSelect,
  onContinue,
  onChangeSeat,
  onBook,
  onTogglePerspective,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Auto collapse when in auditorium view so the entire theater hall & green chair are unobstructed
  useEffect(() => {
    if (cameraPerspective === 'auditorium') {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  }, [cameraPerspective]);

  // 3D View mode bottom sheet
  if (viewMode === 'view3d') {
    if (!selectedSeat) return null;

    const { distanceToScreen, fieldOfView, offsetFromCenter, offsetSide } = selectedSeat.metrics;
    const sideLabel = offsetSide === 'centre' ? 'centred' : `${offsetSide} of centre`;

    return (
      <div className={`w-full bg-[#121318]/95 backdrop-blur-xl border-t border-white/10 rounded-t-[32px] px-6 pt-2.5 pb-5 z-30 shadow-2xl transition-all duration-300 animate-in slide-in-from-bottom`}>
        {/* Drag Handle & Collapse Toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex justify-center py-1 mb-2 group cursor-pointer outline-none"
          aria-label={isCollapsed ? 'Expand Details Sheet' : 'Minimize Details Sheet'}
        >
          <div className="w-10 h-1 bg-white/20 rounded-full group-hover:bg-white/40 transition-colors" />
        </button>

        {/* Minimized View Bar (shown when collapsed in Auditorium View) */}
        {isCollapsed ? (
          <div className="flex items-center justify-between pt-0.5 pb-1 animate-in fade-in duration-200">
            <div>
              <span className="text-[10px] font-semibold text-mint uppercase tracking-wider block">
                {selectedSeat.tag} · HALL VIEW
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-base font-bold text-white">
                  Row {selectedSeat.row}, Seat {selectedSeat.number}
                </span>
                <span className="text-xs text-white/50">· €{selectedSeat.price.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (onTogglePerspective) onTogglePerspective();
                  setIsCollapsed(false);
                }}
                className="px-3.5 py-1.5 rounded-full bg-mint hover:bg-mint-light text-black font-semibold text-xs tracking-wide transition-all active:scale-95 shadow-mint-glow"
              >
                👁️ Enter POV
              </button>
              <button
                onClick={() => setIsCollapsed(false)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Expand Sheet Details"
              >
                <ChevronUp size={16} />
              </button>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in duration-200">
            {/* View Perspective Selector Pills */}
            <div className="flex items-center justify-between mb-3.5">
              <div className="flex items-center gap-1 p-1 bg-white/5 rounded-full border border-white/10">
                <button
                  onClick={() => {
                    if (cameraPerspective !== 'pov' && onTogglePerspective) onTogglePerspective();
                  }}
                  className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all ${
                    cameraPerspective === 'pov'
                      ? 'bg-mint text-black font-semibold shadow-sm'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  👁️ Seat POV
                </button>
                <button
                  onClick={() => {
                    if (cameraPerspective !== 'auditorium' && onTogglePerspective) onTogglePerspective();
                  }}
                  className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all ${
                    cameraPerspective === 'auditorium'
                      ? 'bg-mint text-black font-semibold shadow-sm'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  🪑 Hall View
                </button>
              </div>

              <span className="text-[10px] text-white/40 uppercase tracking-wider font-mono">
                Click 3D seat to switch
              </span>
            </div>

            {/* Header & Mini Radar */}
            <div className="flex items-start justify-between mb-4">
              <div>
                {/* Tag (UP CLOSE, SWEET SPOT, FULL PICTURE) */}
                <span className="text-[11px] font-semibold text-mint tracking-wider uppercase block mb-0.5">
                  {selectedSeat.tag}
                </span>
                {/* Seat Title */}
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Row {selectedSeat.row}, Seat {selectedSeat.number}
                </h2>
                {/* Category and Price */}
                <p className="text-xs sm:text-sm text-white/50 capitalize mt-0.5">
                  {selectedSeat.type} · €{selectedSeat.price.toFixed(2)}
                </p>
              </div>

              {/* Interactive Mini Radar Widget */}
              <MiniSeatRadar
                seats={seats}
                selectedSeatId={selectedSeat.id}
                onSeatSelect={onSeatSelect}
              />
            </div>

            {/* 3 Metric Cards */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3 mb-5">
              {/* Metric 1: Distance to Screen */}
              <div className="bg-[#1b1c23] border border-white/5 rounded-2xl p-3 flex flex-col justify-center">
                <span className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {distanceToScreen.toFixed(1)} m
                </span>
                <span className="text-[10px] text-white/45 tracking-wide mt-0.5">
                  to screen
                </span>
              </div>

              {/* Metric 2: Field of View */}
              <div className="bg-[#1b1c23] border border-white/5 rounded-2xl p-3 flex flex-col justify-center">
                <span className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {fieldOfView}°
                </span>
                <span className="text-[10px] text-white/45 tracking-wide mt-0.5">
                  field of view
                </span>
              </div>

              {/* Metric 3: Offset */}
              <div className="bg-[#1b1c23] border border-white/5 rounded-2xl p-3 flex flex-col justify-center">
                <span className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {offsetFromCenter.toFixed(1)} m
                </span>
                <span className="text-[10px] text-white/45 tracking-wide mt-0.5 truncate">
                  {sideLabel}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              {/* Change seat button */}
              <button
                onClick={onChangeSeat}
                className="flex-1 py-3.5 px-4 rounded-full bg-[#1b1c23] hover:bg-[#23242e] border border-white/10 text-white font-medium text-sm transition-all active:scale-[0.98]"
              >
                Change seat
              </button>

              {/* Book button */}
              <button
                onClick={onBook}
                className="flex-1 py-3.5 px-4 rounded-full bg-white hover:bg-white/95 text-black font-semibold text-sm transition-all active:scale-[0.98] shadow-lg shadow-white/10"
              >
                Book · €{selectedSeat.price.toFixed(2)}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 2D Map mode bottom sheet
  return (
    <div className="w-full bg-[#13141a]/95 backdrop-blur-xl border-t border-white/5 rounded-t-[28px] px-6 py-4 z-30 shadow-2xl">
      <div className="w-full max-w-[390px] mx-auto flex items-center justify-between">
        {selectedSeat ? (
          <div className="flex flex-col">
            <span className="text-xs text-white/50 tracking-wide font-medium">
              Row {selectedSeat.row} · Seat {selectedSeat.number}
            </span>
            <span className="text-xl font-bold text-white tracking-tight">
              €{selectedSeat.price.toFixed(2)}
            </span>
          </div>
        ) : (
          <div className="flex flex-col">
            <span className="text-sm font-medium text-white/80">
              Choose your seat
            </span>
            <div className="w-8 h-0.5 bg-white/20 rounded-full mt-1.5" />
          </div>
        )}

        {/* Continue Button */}
        <button
          onClick={onContinue}
          disabled={!selectedSeat}
          className={`px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
            selectedSeat
              ? 'bg-mint text-black shadow-mint-glow hover:bg-mint-light active:scale-95 cursor-pointer'
              : 'bg-[#1e1f26] text-white/30 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

