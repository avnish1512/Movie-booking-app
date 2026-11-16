import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Tag, Check, ShieldCheck, Sparkles, CreditCard, Smartphone } from 'lucide-react';
import { Movie, CinemaVenue, Showtime, SeatData, CartItem, PromoCode } from '../../types';
import { PROMO_CODES } from '../../data/districtData';
import { soundFX } from '../../utils/audio';

interface DistrictCheckoutViewProps {
  movie: Movie;
  cinema: CinemaVenue;
  showtime: Showtime;
  selectedSeats: SeatData[];
  cart: CartItem[];
  onBack: () => void;
  onConfirmPayment: (bookingDetails: {
    ticketTotal: number;
    fnbTotal: number;
    discountAmount: number;
    convenienceFee: number;
    finalTotal: number;
    appliedCode: string | null;
  }) => void;
}

export const DistrictCheckoutView: React.FC<DistrictCheckoutViewProps> = ({
  movie,
  cinema,
  showtime,
  selectedSeats,
  cart,
  onBack,
  onConfirmPayment,
}) => {
  const [timeLeft, setTimeLeft] = useState(599); // 9m 59s
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(PROMO_CODES[0]); // default DISTRICT50
  const [customCode, setCustomCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'apple_pay' | 'upi' | 'card'>('apple_pay');

  // Countdown timer for seat reservation lock
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Pricing calculations
  const ticketTotal = selectedSeats.reduce((sum, s) => sum + s.price, 0);
  const fnbTotal = cart.reduce((sum, ci) => sum + ci.item.price * ci.quantity, 0);
  const convenienceFee = 1.5;

  let discountAmount = 0;
  if (appliedPromo) {
    if (appliedPromo.type === 'flat') {
      discountAmount = appliedPromo.discount;
    } else {
      discountAmount = ((ticketTotal + fnbTotal) * appliedPromo.discount) / 100;
    }
  }

  const finalTotal = Math.max(0, ticketTotal + fnbTotal + convenienceFee - discountAmount);

  const handleApplyCustomCode = () => {
    const found = PROMO_CODES.find((p) => p.code.toLowerCase() === customCode.trim().toLowerCase());
    if (found) {
      soundFX.playSeatClick();
      setAppliedPromo(found);
      setCustomCode('');
    }
  };

  return (
    <div className="w-full flex-1 flex flex-col justify-between overflow-hidden bg-[#0c0d12] select-none">
      {/* Top Header */}
      <div className="w-full px-4 pt-4 pb-2.5 bg-[#12131a] border-b border-white/5 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            aria-label="Back"
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/80 active:scale-95"
          >
            <ArrowLeft size={16} />
          </button>
          <h2 className="text-base font-bold text-white tracking-tight">Order Summary</h2>
        </div>

        {/* Seat Lock Countdown Timer */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-950/40 border border-red-500/20 text-red-400 text-xs font-mono font-bold">
          <Clock size={12} className="animate-spin text-red-400" />
          <span>{formatTimer(timeLeft)}</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3.5">
        {/* Booking Card */}
        <div className="p-3.5 rounded-2xl bg-[#14151e] border border-white/5 shadow-md">
          <div className="flex items-start justify-between pb-3 border-b border-white/5">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black text-mint tracking-wider uppercase">
                  {showtime.format}
                </span>
                <span className="text-[10px] text-white/40">· {movie.certification}</span>
              </div>
              <h3 className="text-base font-extrabold text-white tracking-tight mt-0.5">
                {movie.title}
              </h3>
              <p className="text-xs text-white/60 mt-0.5">
                {cinema.name} · {showtime.hall}
              </p>
              <p className="text-[11px] text-white/40 mt-0.5">
                {showtime.date} · {showtime.time}
              </p>
            </div>

            <img
              src={movie.poster}
              alt={movie.title}
              className="w-12 h-16 rounded-lg object-cover border border-white/10 shrink-0"
            />
          </div>

          {/* Seats Tag */}
          <div className="pt-2.5 flex items-center justify-between text-xs">
            <span className="text-white/60">
              Seats ({selectedSeats.length}):{' '}
              <strong className="text-white">
                {selectedSeats.map((s) => `${s.row}${s.number}`).join(', ')}
              </strong>
            </span>
            <span className="font-bold text-white">€{ticketTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Selected Snacks (if any) */}
        {cart.length > 0 && (
          <div className="p-3.5 rounded-2xl bg-[#14151e] border border-white/5 shadow-md">
            <span className="text-[11px] font-bold text-white/40 uppercase tracking-wider block mb-2">
              Food & Beverages
            </span>
            <div className="space-y-1.5">
              {cart.map((ci) => (
                <div key={ci.item.id} className="flex items-center justify-between text-xs">
                  <span className="text-white/80">
                    {ci.quantity}x {ci.item.name}
                  </span>
                  <span className="font-semibold text-white">
                    €{(ci.item.price * ci.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Promo Codes & Offers */}
        <div className="p-3.5 rounded-2xl bg-[#14151e] border border-white/5 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-white/40 uppercase tracking-wider flex items-center gap-1">
              <Tag size={12} className="text-mint" />
              <span>Offers & Promo Codes</span>
            </span>
            {appliedPromo && (
              <button
                onClick={() => setAppliedPromo(null)}
                className="text-[10px] text-red-400 hover:underline"
              >
                Remove
              </button>
            )}
          </div>

          {appliedPromo ? (
            <div className="p-2.5 rounded-xl bg-mint/10 border border-mint/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Check size={16} className="text-mint font-bold" />
                <div>
                  <span className="text-xs font-bold text-mint font-mono block">
                    '{appliedPromo.code}' APPLIED
                  </span>
                  <span className="text-[10px] text-white/60">
                    You saved €{discountAmount.toFixed(2)} with this coupon!
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 pb-1">
                <input
                  type="text"
                  value={customCode}
                  onChange={(e) => setCustomCode(e.target.value)}
                  placeholder="Enter promo code..."
                  className="flex-1 bg-[#181922] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white uppercase placeholder-white/30 focus:outline-none focus:border-mint/50"
                />
                <button
                  onClick={handleApplyCustomCode}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-mint hover:text-black text-xs font-bold transition-colors"
                >
                  Apply
                </button>
              </div>
              {PROMO_CODES.map((promo) => (
                <div
                  key={promo.code}
                  onClick={() => {
                    soundFX.playSeatClick();
                    setAppliedPromo(promo);
                  }}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 cursor-pointer flex items-center justify-between transition-all"
                >
                  <div>
                    <span className="text-xs font-bold text-white font-mono">{promo.code}</span>
                    <p className="text-[10px] text-white/40">{promo.description}</p>
                  </div>
                  <span className="text-xs font-bold text-mint">Apply</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Detailed Price Breakdown */}
        <div className="p-3.5 rounded-2xl bg-[#14151e] border border-white/5 shadow-md space-y-2 text-xs">
          <div className="flex items-center justify-between text-white/60">
            <span>Ticket Subtotal</span>
            <span className="font-medium text-white">€{ticketTotal.toFixed(2)}</span>
          </div>
          {fnbTotal > 0 && (
            <div className="flex items-center justify-between text-white/60">
              <span>Food & Beverages</span>
              <span className="font-medium text-white">€{fnbTotal.toFixed(2)}</span>
            </div>
          )}
          <div className="flex items-center justify-between text-white/60">
            <span>District Convenience Fee & Taxes</span>
            <span className="font-medium text-white">€{convenienceFee.toFixed(2)}</span>
          </div>
          {discountAmount > 0 && (
            <div className="flex items-center justify-between text-mint font-semibold">
              <span>Promo Discount</span>
              <span>- €{discountAmount.toFixed(2)}</span>
            </div>
          )}
          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-sm font-black text-white">
            <span>Total Payable</span>
            <span className="text-base text-mint font-black">€{finalTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="p-3.5 rounded-2xl bg-[#14151e] border border-white/5 shadow-md">
          <span className="text-[11px] font-bold text-white/40 uppercase tracking-wider block mb-2.5">
            Select Payment Method
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setPaymentMethod('apple_pay')}
              className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                paymentMethod === 'apple_pay'
                  ? 'bg-mint/15 border-mint text-mint'
                  : 'bg-white/5 border-white/5 text-white/60'
              }`}
            >
              <Smartphone size={16} />
              <span className="text-[10px] font-bold">Apple / Google</span>
            </button>
            <button
              onClick={() => setPaymentMethod('upi')}
              className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                paymentMethod === 'upi'
                  ? 'bg-mint/15 border-mint text-mint'
                  : 'bg-white/5 border-white/5 text-white/60'
              }`}
            >
              <Sparkles size={16} />
              <span className="text-[10px] font-bold">Instant UPI</span>
            </button>
            <button
              onClick={() => setPaymentMethod('card')}
              className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                paymentMethod === 'card'
                  ? 'bg-mint/15 border-mint text-mint'
                  : 'bg-white/5 border-white/5 text-white/60'
              }`}
            >
              <CreditCard size={16} />
              <span className="text-[10px] font-bold">Credit/Debit</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Pay CTA */}
      <div className="w-full bg-[#12131a]/95 backdrop-blur-xl border-t border-white/10 px-5 py-3.5 shadow-2xl z-20">
        <div className="flex items-center justify-between mb-2 text-xs">
          <div className="flex items-center gap-1.5 text-white/50">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>100% Safe & Instant Confirmation</span>
          </div>
          <span className="text-base font-black text-white">€{finalTotal.toFixed(2)}</span>
        </div>

        <button
          onClick={() => {
            soundFX.playSuccess();
            onConfirmPayment({
              ticketTotal,
              fnbTotal,
              discountAmount,
              convenienceFee,
              finalTotal,
              appliedCode: appliedPromo?.code || null,
            });
          }}
          className="w-full py-3.5 rounded-full bg-mint hover:bg-mint-light text-black font-extrabold text-sm tracking-wide transition-all active:scale-[0.98] shadow-mint-glow flex items-center justify-center gap-2"
        >
          <span>Pay · €{finalTotal.toFixed(2)}</span>
        </button>
      </div>
    </div>
  );
};
