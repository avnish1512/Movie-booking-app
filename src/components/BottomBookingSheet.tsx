import React from 'react';
import { ViewMode, SeatData } from '../types';
import { MiniSeatRadar } from './MiniSeatRadar';

interface BottomBookingSheetProps {
  viewMode: ViewMode;
  selectedSeat: SeatData | null;
  seats: SeatData[];
  onSeatSelect: (seat: SeatData) => void;
  onContinue: () => void;
  onChangeSeat: () => void;
  onBook: () => void;
}

export const BottomBookingSheet: React.FC<BottomBookingSheetProps> = ({
  viewMode,
  selectedSeat,
  seats,
  onSeatSelect,
  onContinue,
  onChangeSeat,
  onBook,
}) => {
  // 3D View mode bottom sheet
  if (viewMode === 'view3d') {
    if (!selectedSeat) return null;

    const { distanceToScreen, fieldOfView, offsetFromCenter, offsetSide } = selectedSeat.metrics;
    const sideLabel = offsetSide === 'centre' ? 'centred' : `${offsetSide} of centre`;

    return (
      <div className="w-full bg-[#121318]/95 backdrop-blur-xl border-t border-white/10 rounded-t-[32px] px-6 pt-3 pb-6 z-30 shadow-2xl animate-in slide-in-from-bottom duration-300">
        {/* Drag Handle */}
        <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-4" />

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

