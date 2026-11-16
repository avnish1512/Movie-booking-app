import React, { useState } from 'react';
import { ArrowLeft, Star, Clock, Share2 } from 'lucide-react';
import { Movie, CinemaVenue, Showtime } from '../../types';
import { CINEMA_VENUES, DATES_LIST } from '../../data/districtData';

interface DistrictMovieDetailsViewProps {
  movie: Movie;
  onBack: () => void;
  onSelectShowtimeAndCinema: (cinema: CinemaVenue, showtime: Showtime) => void;
}

export const DistrictMovieDetailsView: React.FC<DistrictMovieDetailsViewProps> = ({
  movie,
  onBack,
  onSelectShowtimeAndCinema,
}) => {
  const [selectedDateId, setSelectedDateId] = useState<string>(DATES_LIST[0].id);
  const [selectedFormat, setSelectedFormat] = useState<string>('All');

  const formats = ['All', 'IMAX', '2D', '4DX', 'Dolby Cinema'];

  return (
    <div className="w-full flex-1 overflow-y-auto pb-8 select-none">
      {/* Hero Backdrop with Navigation Controls */}
      <div className="relative w-full h-[260px] overflow-hidden bg-black">
        <img
          src={movie.backdrop}
          alt={movie.title}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d12] via-[#0c0d12]/50 to-black/60" />

        {/* Top Header Controls */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <button
            onClick={onBack}
            aria-label="Back"
            className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white active:scale-95 transition-all"
          >
            <ArrowLeft size={18} />
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: movie.title, text: `Check out ${movie.title} on District!` });
                }
              }}
              aria-label="Share Movie"
              className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white active:scale-95 transition-all"
            >
              <Share2 size={16} />
            </button>
          </div>
        </div>

        {/* Movie Info Overlay on Backdrop */}
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 rounded-full bg-mint text-black font-extrabold text-[10px] tracking-wider uppercase">
                {movie.formats[0]} EXPERIENCE
              </span>
              <span className="px-2 py-0.5 rounded-md bg-white/15 backdrop-blur-md text-[10px] font-bold text-white/90">
                {movie.certification}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight drop-shadow-md">
              {movie.title}
            </h1>
            <p className="text-xs text-white/70 italic mt-0.5">{movie.tagline}</p>
          </div>
        </div>
      </div>

      {/* Ratings & Metadata Bar */}
      <div className="px-4 py-3 bg-[#13141c] border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-amber-400 font-extrabold text-sm">
            <Star size={16} fill="currentColor" />
            <span>{movie.rating}/10</span>
          </div>
          <span className="text-[11px] text-white/45 font-medium">({movie.votes})</span>
        </div>

        <div className="flex items-center gap-2.5 text-xs text-white/60">
          <span className="flex items-center gap-1">
            <Clock size={13} className="text-white/40" />
            {movie.duration}
          </span>
          <span>·</span>
          <span>{movie.languages.join(', ')}</span>
        </div>
      </div>

      {/* Synopsis & Genres */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex flex-wrap gap-1.5 mb-2.5">
          {movie.genres.map((g) => (
            <span
              key={g}
              className="px-2.5 py-1 rounded-full bg-white/5 border border-white/5 text-[11px] font-medium text-white/80"
            >
              {g}
            </span>
          ))}
        </div>
        <p className="text-xs leading-relaxed text-white/65 line-clamp-3">
          {movie.synopsis}
        </p>
      </div>

      {/* Cast & Director Carousel */}
      <div className="px-4 pt-3 pb-4">
        <span className="text-[11px] font-bold text-white/40 uppercase tracking-wider block mb-2.5">
          Top Cast & Director
        </span>
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
          {movie.cast.map((c) => (
            <div key={c.name} className="flex flex-col items-center shrink-0 w-16 text-center">
              <img
                src={c.image}
                alt={c.name}
                className="w-13 h-13 rounded-full object-cover border border-white/10 shadow-md mb-1"
              />
              <span className="text-[10px] font-bold text-white line-clamp-1 w-full">{c.name}</span>
              <span className="text-[9px] text-white/40 line-clamp-1 w-full">{c.role}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Horizontal Date Picker Strip */}
      <div className="px-4 pt-2 pb-3 border-t border-white/5">
        <span className="text-[11px] font-bold text-white/40 uppercase tracking-wider block mb-2">
          Select Date
        </span>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {DATES_LIST.map((d) => {
            const isSelected = selectedDateId === d.id;
            return (
              <button
                key={d.id}
                onClick={() => setSelectedDateId(d.id)}
                className={`flex flex-col items-center justify-center min-w-[58px] py-2 px-1 rounded-2xl border transition-all duration-200 ${
                  isSelected
                    ? 'bg-mint text-black font-extrabold border-mint shadow-mint-glow scale-105'
                    : 'bg-[#15161f] text-white/70 border-white/5 hover:border-white/20'
                }`}
              >
                <span className="text-[9px] tracking-wide uppercase">{d.day}</span>
                <span className="text-base font-black tracking-tight">{d.dateNum}</span>
                <span className="text-[9px] font-medium opacity-80">{d.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Format Filter Bar */}
      <div className="px-4 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar">
        {formats.map((fmt) => (
          <button
            key={fmt}
            onClick={() => setSelectedFormat(fmt)}
            className={`px-3 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all ${
              selectedFormat === fmt
                ? 'bg-white text-black font-bold'
                : 'bg-white/5 text-white/60 hover:text-white border border-white/5'
            }`}
          >
            {fmt}
          </button>
        ))}
      </div>

      {/* Cinemas & Showtimes Listing */}
      <div className="px-4 pt-3 flex flex-col gap-3">
        <span className="text-[11px] font-bold text-white/40 uppercase tracking-wider block">
          Available Theaters & Showtimes
        </span>

        {CINEMA_VENUES.map((cinema) => {
          // Filter showtimes by selected format if not 'All'
          const relevantShowtimes = cinema.showtimes.filter((st) =>
            selectedFormat === 'All' ? true : st.format.includes(selectedFormat as any)
          );

          if (relevantShowtimes.length === 0) return null;

          return (
            <div
              key={cinema.id}
              className="p-4 rounded-[24px] bg-[#13141c] border border-white/5 hover:border-white/15 transition-all shadow-lg"
            >
              {/* Cinema Header */}
              <div className="flex items-start justify-between mb-2.5">
                <div>
                  <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
                    {cinema.name}
                  </h3>
                  <p className="text-[11px] text-white/45 mt-0.5">
                    {cinema.location} · <span className="text-mint/80">{cinema.distance}</span>
                  </p>
                </div>
              </div>

              {/* Amenities tags */}
              <div className="flex items-center gap-1.5 mb-3 flex-wrap">
                {cinema.amenities.map((am) => (
                  <span
                    key={am}
                    className="text-[9px] px-2 py-0.5 rounded-full bg-white/5 border border-white/5 text-white/50"
                  >
                    {am}
                  </span>
                ))}
              </div>

              {/* Showtimes Pills Grid */}
              <div className="flex items-center gap-2 flex-wrap">
                {relevantShowtimes.map((st) => {
                  const isImax = st.format === 'IMAX';
                  return (
                    <button
                      key={st.id}
                      onClick={() => onSelectShowtimeAndCinema(cinema, st)}
                      className={`group relative flex flex-col items-center justify-center px-4 py-2 rounded-2xl border transition-all active:scale-95 ${
                        isImax
                          ? 'bg-[#18231e] border-mint/40 text-mint hover:bg-mint hover:text-black shadow-sm'
                          : 'bg-[#1a1b24] border-white/10 text-white hover:border-white/30'
                      }`}
                    >
                      <span className="text-xs font-black tracking-tight">{st.time}</span>
                      <span className="text-[9px] font-semibold opacity-75 mt-0.5 uppercase">
                        {st.format}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
