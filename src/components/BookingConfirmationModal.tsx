import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { X, CheckCircle2, Ticket, Calendar, Clock, MapPin, Sparkles } from 'lucide-react';
import { SeatData, Showtime } from '../types';
import { soundFX } from '../utils/audio';

interface BookingConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSeat: SeatData | null;
  activeShowtime: Showtime;
}

export const BookingConfirmationModal: React.FC<BookingConfirmationModalProps> = ({
  isOpen,
  onClose,
  selectedSeat,
  activeShowtime,
}) => {
  useEffect(() => {
    if (isOpen) {
      soundFX.playSuccess();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3ddc97', '#5ff5b5', '#ffffff', '#e2b380']
      });
    }
  }, [isOpen]);

  if (!isOpen || !selectedSeat) return null;

  const bookingFee = 1.50;
  const total = selectedSeat.price + bookingFee;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm rounded-[32px] bg-[#14151b] border border-white/10 shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        {/* Header Movie Visual */}
        <div className="relative h-44 w-full overflow-hidden bg-black">
          <img
            src="/assets/movie-still.jpg"
            alt="Dune: Part Two"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14151b] via-[#14151b]/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all"
          >
            <X size={16} />
          </button>

          {/* Status badge */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-mint/20 border border-mint/40 backdrop-blur-md">
            <CheckCircle2 size={13} className="text-mint" />
            <span className="text-[11px] font-semibold text-mint tracking-wide">
              Reservation Confirmed
            </span>
          </div>

          {/* Movie Title */}
          <div className="absolute bottom-3 left-5 right-5">
            <h3 className="text-xl font-bold text-white tracking-tight">
              Dune: Part Two
            </h3>
            <p className="text-xs text-white/60">
              Directed by Denis Villeneuve · Sci-Fi / Adventure
            </p>
          </div>
        </div>

        {/* Ticket Details */}
        <div className="p-5 flex flex-col gap-4">
          {/* Cinema & Hall info */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
              <MapPin size={16} className="text-mint shrink-0" />
              <div>
                <span className="text-white/40 block text-[10px]">CINEMA</span>
                <span className="font-medium text-white truncate block">
                  {activeShowtime.cinema} · {activeShowtime.hall}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
              <Calendar size={16} className="text-mint shrink-0" />
              <div>
                <span className="text-white/40 block text-[10px]">DATE</span>
                <span className="font-medium text-white truncate block">
                  {activeShowtime.date}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
              <Clock size={16} className="text-mint shrink-0" />
              <div>
                <span className="text-white/40 block text-[10px]">SHOWTIME</span>
                <span className="font-medium text-white truncate block">
                  {activeShowtime.time} ({activeShowtime.format})
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
              <Ticket size={16} className="text-mint shrink-0" />
              <div>
                <span className="text-white/40 block text-[10px]">SEAT NUMBER</span>
                <span className="font-bold text-mint truncate block">
                  Row {selectedSeat.row}, Seat {selectedSeat.number}
                </span>
              </div>
            </div>
          </div>

          {/* Dotted ticket tear line */}
          <div className="relative flex items-center justify-between my-1">
            <div className="w-4 h-4 rounded-full bg-black -ml-7 border-r border-white/10" />
            <div className="flex-1 border-b border-dashed border-white/15 mx-2" />
            <div className="w-4 h-4 rounded-full bg-black -mr-7 border-l border-white/10" />
          </div>

          {/* Price Breakdown */}
          <div className="flex flex-col gap-1.5 text-xs">
            <div className="flex justify-between text-white/50">
              <span>{selectedSeat.type === 'recliner' ? 'VIP Recliner Ticket' : 'Standard Seat Ticket'}</span>
              <span className="text-white">€{selectedSeat.price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-white/50">
              <span>Online Booking & Service Fee</span>
              <span className="text-white">€{bookingFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
              <span>Total Paid</span>
              <span className="text-mint text-base font-extrabold">€{total.toFixed(2)}</span>
            </div>
          </div>

          {/* Barcode & Pass ID */}
          <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/[0.02] border border-white/5">
            {/* Barcode SVG illustration */}
            <div className="h-10 w-full flex items-center justify-center gap-1 opacity-70">
              {[4, 2, 6, 3, 5, 2, 7, 3, 2, 5, 3, 6, 2, 4, 7, 2, 3, 5, 2, 6, 4, 3, 2, 5].map((w, i) => (
                <div
                  key={i}
                  style={{ width: `${w}px` }}
                  className="h-full bg-white rounded-full"
                />
              ))}
            </div>
            <span className="text-[10px] tracking-[0.2em] font-mono text-white/40 mt-1.5">
              MRD-9482-IMX-{selectedSeat.id}
            </span>
          </div>

          {/* Action button */}
          <button
            onClick={onClose}
            className="w-full py-3.5 rounded-full bg-mint hover:bg-mint-light text-black font-semibold text-sm transition-all active:scale-[0.98] shadow-mint-glow flex items-center justify-center gap-2"
          >
            <Sparkles size={16} />
            Done & Save to Pass
          </button>
        </div>
      </div>
    </div>
  );
};

