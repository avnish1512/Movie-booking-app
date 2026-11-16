import React, { useState } from 'react';
import { Ticket, Share2, Download, CheckCircle2 } from 'lucide-react';
import { BookingPass } from '../../types';

interface DistrictMyPassesViewProps {
  passes: BookingPass[];
  onBookMore: () => void;
}

export const DistrictMyPassesView: React.FC<DistrictMyPassesViewProps> = ({
  passes,
  onBookMore,
}) => {
  const [activeTab, setActiveTab] = useState<'active' | 'past'>('active');

  const activePasses = passes.filter((p) => p.status === 'confirmed');

  return (
    <div className="w-full flex-1 flex flex-col justify-between overflow-hidden bg-[#0c0d12] select-none">
      {/* Top Header */}
      <div className="w-full px-4 pt-4 pb-2.5 bg-[#12131a] border-b border-white/5 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <Ticket size={18} className="text-mint" />
          <h2 className="text-base font-bold text-white tracking-tight">My Digital Passes</h2>
        </div>

        <div className="flex items-center gap-1 p-0.5 bg-white/5 rounded-full border border-white/5 text-xs">
          <button
            onClick={() => setActiveTab('active')}
            className={`px-3 py-1 rounded-full font-bold transition-all ${
              activeTab === 'active' ? 'bg-mint text-black shadow-sm' : 'text-white/50 hover:text-white'
            }`}
          >
            Active ({activePasses.length})
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`px-3 py-1 rounded-full font-medium transition-all ${
              activeTab === 'past' ? 'bg-mint text-black font-bold shadow-sm' : 'text-white/50 hover:text-white'
            }`}
          >
            Past (0)
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {activePasses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white/30 mb-3">
              <Ticket size={28} />
            </div>
            <h3 className="text-base font-bold text-white">No active movie passes</h3>
            <p className="text-xs text-white/40 mt-1 max-w-[220px]">
              Explore movies in IMAX 3D and book your preferred seats
            </p>
            <button
              onClick={onBookMore}
              className="mt-4 px-6 py-2.5 rounded-full bg-mint text-black font-bold text-xs tracking-wide shadow-mint-glow"
            >
              Browse Movies
            </button>
          </div>
        ) : (
          activePasses.map((pass) => (
            <div
              key={pass.id}
              className="relative w-full rounded-[28px] bg-gradient-to-b from-[#181a24] to-[#12131a] border border-white/10 shadow-2xl overflow-hidden p-4"
            >
              {/* Confirmed Banner */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold">
                  <CheckCircle2 size={12} />
                  <span>BOOKING CONFIRMED</span>
                </div>
                <span className="text-[10px] text-white/40 font-mono tracking-wider">
                  REF: {pass.bookingRef}
                </span>
              </div>

              {/* Movie Details */}
              <div className="flex items-start gap-3 py-3 border-b border-dashed border-white/10">
                <img
                  src={pass.movie.poster}
                  alt={pass.movie.title}
                  className="w-14 h-20 rounded-xl object-cover border border-white/10 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-black text-white tracking-tight line-clamp-1">
                    {pass.movie.title}
                  </h3>
                  <p className="text-xs text-white/60 mt-0.5">
                    {pass.cinema.name} · {pass.showtime.hall}
                  </p>
                  <p className="text-[11px] text-mint font-semibold mt-0.5">
                    {pass.showtime.format} Experience
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-white/40 mt-1">
                    <span>{pass.showtime.date}</span>
                    <span>·</span>
                    <span className="font-bold text-white/80">{pass.showtime.time}</span>
                  </div>
                </div>
              </div>

              {/* Seats & Snacks Summary */}
              <div className="grid grid-cols-2 gap-2 py-3 border-b border-white/10">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-[9px] text-white/40 uppercase tracking-wider block">
                    SEAT NUMBER(S)
                  </span>
                  <span className="text-sm font-extrabold text-white mt-0.5 block">
                    {pass.seats.map((s) => `${s.row}${s.number}`).join(', ')}
                  </span>
                  <span className="text-[9px] text-mint font-semibold">
                    {pass.seats[0]?.type || 'Standard'}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-[9px] text-white/40 uppercase tracking-wider block">
                    SNACKS & F&B
                  </span>
                  <span className="text-xs font-bold text-white mt-0.5 block truncate">
                    {pass.fnbItems.length > 0
                      ? `${pass.fnbItems.reduce((acc, c) => acc + c.quantity, 0)} Items Added`
                      : 'None Added'}
                  </span>
                  <span className="text-[9px] text-white/40">Seat Delivery</span>
                </div>
              </div>

              {/* Barcode & Auditorium Scan Strip */}
              <div className="py-3 flex flex-col items-center justify-center">
                <div className="flex items-center gap-1.5 opacity-85 py-1">
                  {/* Generated Simulated Barcode Lines */}
                  {[3, 1, 4, 1, 2, 5, 2, 1, 3, 2, 4, 1, 2, 3, 1, 4, 2, 1, 3, 2].map((w, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-sm h-9"
                      style={{ width: `${w * 2.2}px` }}
                    />
                  ))}
                </div>
                <span className="text-[10px] text-white/40 font-mono tracking-widest mt-1">
                  {pass.bookingRef}
                </span>
                <span className="text-[9px] text-white/30 mt-0.5">
                  Show barcode at auditorium entrance gate
                </span>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => alert(`Ticket reference ${pass.bookingRef} saved to Apple / Google Wallet!`)}
                  className="flex-1 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Download size={13} />
                  <span>Save to Wallet</span>
                </button>
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: pass.movie.title,
                        text: `Movie tickets for ${pass.movie.title} at ${pass.cinema.name}! Seats: ${pass.seats.map((s) => `${s.row}${s.number}`).join(', ')}`,
                      });
                    }
                  }}
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/15 text-white flex items-center justify-center transition-colors shrink-0"
                >
                  <Share2 size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Book More Button */}
      {activePasses.length > 0 && (
        <div className="w-full p-4 bg-[#12131a]/95 border-t border-white/5">
          <button
            onClick={onBookMore}
            className="w-full py-3 rounded-full bg-mint text-black font-extrabold text-xs tracking-wide shadow-mint-glow active:scale-95 transition-all"
          >
            Explore More Movies
          </button>
        </div>
      )}
    </div>
  );
};
