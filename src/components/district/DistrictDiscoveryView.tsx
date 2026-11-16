import React, { useState } from 'react';
import { Star, Sparkles, ChevronRight, Film, MapPin, Tag } from 'lucide-react';
import { Movie } from '../../types';
import { MOVIES, CINEMA_VENUES } from '../../data/districtData';

interface DistrictDiscoveryViewProps {
  onSelectMovie: (movie: Movie) => void;
  searchQuery: string;
}

export const DistrictDiscoveryView: React.FC<DistrictDiscoveryViewProps> = ({
  onSelectMovie,
  searchQuery,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const categories = ['All', 'IMAX', '4DX', 'Dolby Cinema', 'Action', 'Sci-Fi'];

  // Filter movies by search query and category
  const filteredMovies = MOVIES.filter((movie) => {
    const matchesSearch =
      searchQuery === '' ||
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.genres.some((g) => g.toLowerCase().includes(searchQuery.toLowerCase())) ||
      movie.formats.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'All' ||
      movie.formats.includes(selectedCategory as any) ||
      movie.genres.includes(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  const featuredMovie = MOVIES[0]; // Dune: Part Two

  return (
    <div className="w-full flex-1 overflow-y-auto pb-6 select-none">
      {/* Promotional Banner Strip */}
      <div className="px-4 pt-3 pb-2">
        <div className="w-full bg-gradient-to-r from-emerald-950/40 via-[#141d1a] to-[#12131a] border border-mint/20 rounded-2xl p-3 flex items-center justify-between shadow-lg relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-mint/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-mint/15 border border-mint/30 flex items-center justify-center text-mint shrink-0">
              <Tag size={15} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-mint uppercase tracking-wider">
                  DISTRICT EXCLUSIVE
                </span>
                <span className="text-[9px] px-1.5 py-0.2 bg-mint/20 text-mint font-mono rounded">
                  CODE: DISTRICT50
                </span>
              </div>
              <p className="text-xs font-semibold text-white/95 mt-0.5">
                Save €5.00 on all IMAX & 3D bookings today
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="px-4 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
              selectedCategory === cat
                ? 'bg-mint text-black font-bold shadow-mint-glow scale-[1.02]'
                : 'bg-[#15161f] text-white/60 hover:text-white hover:bg-white/10 border border-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Hero Featured Movie (Dune: Part Two) */}
      {selectedCategory === 'All' && !searchQuery && (
        <div className="px-4 pt-2 pb-4">
          <div className="relative w-full h-[230px] rounded-[28px] overflow-hidden border border-white/10 shadow-2xl group">
            {/* Backdrop Image */}
            <img
              src={featuredMovie.backdrop}
              alt={featuredMovie.title}
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            {/* Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0f] via-[#0a0b0f]/60 to-transparent" />

            {/* Top Badges */}
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold text-mint tracking-wider uppercase flex items-center gap-1">
                <Sparkles size={11} />
                IMAX 3D Experience
              </span>
              <span className="px-2 py-0.5 rounded-md bg-white/15 backdrop-blur-md text-[10px] font-bold text-white/90">
                {featuredMovie.certification}
              </span>
            </div>

            {/* Bottom Content & Booking Action */}
            <div className="absolute bottom-3.5 left-4 right-4">
              <h2 className="text-2xl font-black text-white tracking-tight leading-tight drop-shadow-md">
                {featuredMovie.title}
              </h2>
              <div className="flex items-center gap-2 text-xs text-white/70 mt-1">
                <div className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star size={13} fill="currentColor" />
                  <span>{featuredMovie.rating}</span>
                </div>
                <span>·</span>
                <span>{featuredMovie.duration}</span>
                <span>·</span>
                <span className="text-white/60">{featuredMovie.genres.join(', ')}</span>
              </div>

              <div className="flex items-center gap-2.5 mt-3">
                <button
                  onClick={() => onSelectMovie(featuredMovie)}
                  className="flex-1 py-2.5 px-4 rounded-full bg-mint hover:bg-mint-light text-black font-bold text-xs tracking-wide transition-all shadow-mint-glow active:scale-[0.98] flex items-center justify-center gap-1.5"
                >
                  <Film size={14} className="stroke-[2.5]" />
                  <span>Book Tickets (3D Auditorium)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Now Showing Section */}
      <div className="px-4 pt-1">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white tracking-tight">Now Showing</h3>
            <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/5 text-[10px] font-semibold text-white/50">
              {filteredMovies.length} movies
            </span>
          </div>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-2 gap-3.5">
          {filteredMovies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => onSelectMovie(movie)}
              className="group cursor-pointer flex flex-col bg-[#13141c] border border-white/5 rounded-2xl overflow-hidden hover:border-mint/30 transition-all active:scale-[0.98]"
            >
              {/* Poster Image */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-white/5">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Rating Badge */}
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md border border-white/10 flex items-center gap-1 text-[11px] font-bold text-amber-400">
                  <Star size={11} fill="currentColor" />
                  <span>{movie.rating}</span>
                </div>

                {/* Certification */}
                <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-md text-[9px] font-bold text-white/80 border border-white/10">
                  {movie.certification}
                </span>
              </div>

              {/* Title & Metadata */}
              <div className="p-2.5 flex flex-col flex-1 justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white line-clamp-1 group-hover:text-mint transition-colors">
                    {movie.title}
                  </h4>
                  <p className="text-[10px] text-white/45 mt-0.5 truncate">
                    {movie.genres.join(' · ')}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-white/5">
                  <span className="text-[10px] font-semibold text-mint/90">
                    {movie.formats[0]}
                  </span>
                  <span className="text-[10px] font-bold text-white group-hover:translate-x-0.5 transition-transform flex items-center">
                    Book <ChevronRight size={11} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Cinemas Spotlight */}
      <div className="px-4 pt-6">
        <h3 className="text-base font-bold text-white tracking-tight mb-2.5 flex items-center gap-2">
          <MapPin size={16} className="text-mint" />
          <span>Cinemas Near You</span>
        </h3>
        <div className="flex flex-col gap-2">
          {CINEMA_VENUES.map((cinema) => (
            <div
              key={cinema.id}
              onClick={() => onSelectMovie(featuredMovie)}
              className="p-3 rounded-2xl bg-[#13141c] border border-white/5 hover:border-mint/30 flex items-center justify-between cursor-pointer transition-all active:scale-[0.99]"
            >
              <div>
                <h4 className="text-xs font-bold text-white">{cinema.name}</h4>
                <p className="text-[10px] text-white/40 mt-0.5">{cinema.location} · {cinema.distance}</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  {cinema.amenities.slice(0, 2).map((am) => (
                    <span key={am} className="text-[9px] px-1.5 py-0.2 bg-white/5 text-white/60 rounded">
                      {am}
                    </span>
                  ))}
                </div>
              </div>
              <ChevronRight size={16} className="text-white/30" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
