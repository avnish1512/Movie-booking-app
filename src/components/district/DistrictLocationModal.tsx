import React, { useState } from 'react';
import { X, MapPin, Search, Check } from 'lucide-react';
import { DistrictCity } from '../../types';
import { DISTRICT_CITIES } from '../../data/districtData';

interface DistrictLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCity: DistrictCity;
  onSelectCity: (city: DistrictCity) => void;
}

export const DistrictLocationModal: React.FC<DistrictLocationModalProps> = ({
  isOpen,
  onClose,
  selectedCity,
  onSelectCity,
}) => {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filteredCities = DISTRICT_CITIES.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.state.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-[#12131a] border border-white/10 rounded-[28px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <MapPin size={18} className="text-mint" />
            <h3 className="text-base font-bold text-white tracking-tight">Select Location</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Search Input */}
        <div className="px-5 pt-3 pb-2">
          <div className="relative flex items-center">
            <Search size={14} className="absolute left-3 text-white/40" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your city..."
              className="w-full bg-[#181922] border border-white/10 rounded-full pl-9 pr-4 py-2 text-xs text-white placeholder-white/35 focus:outline-none focus:border-mint/50"
            />
          </div>
        </div>

        {/* Popular Cities Chips */}
        <div className="px-5 py-2">
          <span className="text-[10px] font-semibold text-white/40 uppercase tracking-wider block mb-2">
            Popular Cities
          </span>
          <div className="flex flex-wrap gap-1.5">
            {DISTRICT_CITIES.filter((c) => c.popular).map((city) => (
              <button
                key={city.id}
                onClick={() => {
                  onSelectCity(city);
                  onClose();
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedCity.id === city.id
                    ? 'bg-mint text-black font-bold shadow-mint-glow'
                    : 'bg-white/5 hover:bg-white/10 text-white/80'
                }`}
              >
                {city.name}
              </button>
            ))}
          </div>
        </div>

        {/* All Cities List */}
        <div className="px-3 py-2 max-h-56 overflow-y-auto">
          {filteredCities.map((city) => (
            <button
              key={city.id}
              onClick={() => {
                onSelectCity(city);
                onClose();
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors text-left"
            >
              <div>
                <span className="text-sm font-semibold text-white block">{city.name}</span>
                <span className="text-[11px] text-white/40">{city.state}</span>
              </div>
              {selectedCity.id === city.id && <Check size={16} className="text-mint font-bold" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
