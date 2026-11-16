import React from 'react';
import { Film, Ticket, PartyPopper, User } from 'lucide-react';
import { DistrictScreen } from '../../types';

interface DistrictBottomNavProps {
  currentScreen: DistrictScreen;
  onSelectScreen: (screen: DistrictScreen) => void;
  activePassesCount: number;
}

export const DistrictBottomNav: React.FC<DistrictBottomNavProps> = ({
  currentScreen,
  onSelectScreen,
  activePassesCount,
}) => {
  const navItems = [
    {
      id: 'discovery' as DistrictScreen,
      label: 'Movies',
      icon: Film,
      isActive: currentScreen === 'discovery' || currentScreen === 'movie_details',
    },
    {
      id: 'my_passes' as DistrictScreen,
      label: 'My Passes',
      icon: Ticket,
      isActive: currentScreen === 'my_passes',
      badge: activePassesCount > 0 ? activePassesCount : undefined,
    },
    {
      id: 'events' as DistrictScreen,
      label: 'Going Out',
      icon: PartyPopper,
      isActive: currentScreen === 'events',
    },
    {
      id: 'discovery' as DistrictScreen, // Or profile view
      label: 'District Club',
      icon: User,
      isActive: false,
      isSpecial: true,
    },
  ];

  return (
    <nav className="w-full bg-[#0d0e14]/95 backdrop-blur-xl border-t border-white/5 px-3 py-2 z-40 select-none">
      <div className="flex items-center justify-around">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={`${item.label}-${index}`}
              onClick={() => onSelectScreen(item.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-200 outline-none ${
                item.isActive
                  ? 'text-mint'
                  : 'text-white/50 hover:text-white/80 active:scale-95'
              }`}
            >
              <div className="relative">
                <Icon size={19} className={item.isActive ? 'stroke-[2.4]' : 'stroke-[1.8]'} />
                {item.badge !== undefined && (
                  <span className="absolute -top-1.5 -right-2 min-w-[15px] h-[15px] px-1 bg-mint text-black font-extrabold text-[9px] rounded-full flex items-center justify-center shadow-sm">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-1 tracking-tight ${item.isActive ? 'font-bold' : 'font-medium'}`}>
                {item.label}
              </span>
              {item.isActive && (
                <span className="absolute bottom-0 w-3 h-0.5 bg-mint rounded-full shadow-mint-glow" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
