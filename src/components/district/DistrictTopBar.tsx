import React from 'react';
import { MapPin, Search, Bell, Sparkles, ChevronDown } from 'lucide-react';
import { DistrictCity } from '../../types';

interface DistrictTopBarProps {
  selectedCity: DistrictCity;
  onOpenCityModal: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  showSearchBar?: boolean;
  onToggleSearchBar: () => void;
  activePassesCount: number;
  onOpenPasses: () => void;
}

export const DistrictTopBar: React.FC<DistrictTopBarProps> = ({
  selectedCity,
  onOpenCityModal,
  searchQuery,
  onSearchChange,
  showSearchBar = false,
  onToggleSearchBar,
  activePassesCount,
  onOpenPasses,
}) => {
  return (
    <div className="w-full bg-[#0c0d12]/95 backdrop-blur-md border-b border-white/5 px-4 pt-3 pb-2.5 z-40 select-none">
      {/* Top Header Row */}
      <div className="flex items-center justify-between">
        {/* Left: District Brand & Location Selector */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <span className="text-lg font-black tracking-tighter text-white">
              district<span className="text-mint text-xl leading-none">.</span>
            </span>
          </div>

          <div className="h-4 w-[1px] bg-white/15 mx-0.5" />

          {/* Location Picker Button */}
          <button
            onClick={onOpenCityModal}
            aria-label="Select City"
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 active:scale-95 transition-all text-left"
          >
            <MapPin size={13} className="text-mint shrink-0" />
            <span className="text-xs font-semibold text-white/90 max-w-[90px] truncate">
              {selectedCity.name}
            </span>
            <ChevronDown size={12} className="text-white/40" />
          </button>
        </div>

        {/* Right: Search, District Pass Badge & Alerts */}
        <div className="flex items-center gap-1.5">
          {/* Search Toggle */}
          <button
            onClick={onToggleSearchBar}
            aria-label="Search Movies & Cinemas"
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              showSearchBar
                ? 'bg-mint text-black font-bold'
                : 'bg-white/5 hover:bg-white/10 text-white/80 active:scale-95'
            }`}
          >
            <Search size={15} />
          </button>

          {/* District Club Gold Pill */}
          <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500/15 to-yellow-500/15 border border-amber-500/20 text-[10px] font-semibold text-amber-300">
            <Sparkles size={11} className="text-amber-400" />
            <span>CLUB</span>
          </div>

          {/* Active Passes Quick Button */}
          <button
            onClick={onOpenPasses}
            aria-label="View Active Passes"
            className="relative w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/80 active:scale-95 transition-all"
          >
            <Bell size={15} />
            {activePassesCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-mint text-black font-bold text-[9px] rounded-full flex items-center justify-center shadow-mint-glow animate-pulse">
                {activePassesCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Expandable Search Input */}
      {showSearchBar && (
        <div className="mt-2.5 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="relative flex items-center">
            <Search size={14} className="absolute left-3 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search movies, cinemas, formats (IMAX, 4DX)..."
              autoFocus
              className="w-full bg-[#161720] border border-white/10 rounded-full pl-9 pr-8 py-1.5 text-xs text-white placeholder-white/35 focus:outline-none focus:border-mint/50 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 text-white/40 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

