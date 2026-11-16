import React from 'react';
import { PartyPopper, Calendar, MapPin } from 'lucide-react';
import { DISTRICT_EVENTS } from '../../data/districtData';

export const DistrictEventsView: React.FC = () => {
  return (
    <div className="w-full flex-1 overflow-y-auto px-4 py-4 space-y-4 select-none">
      {/* Header Banner */}
      <div className="p-4 rounded-[24px] bg-gradient-to-r from-purple-950/40 via-indigo-950/30 to-[#12131a] border border-purple-500/20 shadow-xl">
        <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider mb-1">
          <PartyPopper size={14} />
          <span>District Going Out</span>
        </div>
        <h2 className="text-xl font-black text-white tracking-tight">Live Events & Nightlife</h2>
        <p className="text-xs text-white/50 mt-0.5">
          Concerts, comedy shows, and curated experiences in your city
        </p>
      </div>

      {/* Events List */}
      <div className="space-y-3.5">
        {DISTRICT_EVENTS.map((event) => (
          <div
            key={event.id}
            className="group cursor-pointer rounded-[24px] bg-[#14151e] border border-white/5 overflow-hidden hover:border-purple-500/30 transition-all shadow-md active:scale-[0.99]"
          >
            {/* Event Image */}
            <div className="relative w-full h-36 overflow-hidden bg-white/5">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#14151e] via-transparent to-transparent" />
              {event.badge && (
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-purple-600/80 backdrop-blur-md text-[10px] font-bold text-white shadow-sm uppercase tracking-wide">
                  {event.badge}
                </span>
              )}
              <span className="absolute bottom-2 right-3 text-xs font-black text-mint bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-lg border border-white/10">
                From €{event.price.toFixed(2)}
              </span>
            </div>

            {/* Event Info */}
            <div className="p-3.5">
              <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">
                {event.category}
              </span>
              <h3 className="text-base font-extrabold text-white tracking-tight mt-0.5 group-hover:text-purple-300 transition-colors">
                {event.title}
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-white/60 mt-1.5">
                <Calendar size={13} className="text-white/40" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-white/45 mt-1">
                <MapPin size={13} className="text-white/40" />
                <span className="truncate">{event.venue}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
