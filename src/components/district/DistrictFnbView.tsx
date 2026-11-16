import React, { useState } from 'react';
import { ArrowLeft, Plus, Minus, ShoppingBag, ChevronRight } from 'lucide-react';
import { FoodItem, CartItem } from '../../types';
import { FNB_ITEMS } from '../../data/districtData';
import { soundFX } from '../../utils/audio';

interface DistrictFnbViewProps {
  cart: CartItem[];
  onUpdateCart: (item: FoodItem, delta: number) => void;
  onProceed: () => void;
  onSkip: () => void;
}

export const DistrictFnbView: React.FC<DistrictFnbViewProps> = ({
  cart,
  onUpdateCart,
  onProceed,
  onSkip,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'combos', label: 'Combos' },
    { id: 'popcorn', label: 'Popcorn' },
    { id: 'snacks', label: 'Snacks' },
    { id: 'beverages', label: 'Drinks' },
  ];

  const filteredItems = FNB_ITEMS.filter((item) =>
    selectedCategory === 'all' ? true : item.category === selectedCategory
  );

  const totalFnbPrice = cart.reduce((sum, ci) => sum + ci.item.price * ci.quantity, 0);
  const totalItemCount = cart.reduce((sum, ci) => sum + ci.quantity, 0);

  const getItemQuantity = (id: string) => {
    return cart.find((ci) => ci.item.id === id)?.quantity || 0;
  };

  const handleAdd = (item: FoodItem) => {
    soundFX.playSeatClick();
    onUpdateCart(item, 1);
  };

  const handleRemove = (item: FoodItem) => {
    soundFX.playSeatClick();
    onUpdateCart(item, -1);
  };

  return (
    <div className="w-full flex-1 flex flex-col justify-between overflow-hidden bg-[#0c0d12] select-none">
      {/* Top Header */}
      <div className="w-full px-4 pt-4 pb-2.5 bg-[#12131a] border-b border-white/5 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <button
            onClick={onSkip}
            aria-label="Back"
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/80 active:scale-95"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">Grab a Bite</h2>
            <p className="text-[10px] text-white/40">Delivered directly to your seat</p>
          </div>
        </div>

        <button
          onClick={onSkip}
          className="text-xs font-semibold text-white/50 hover:text-white px-2.5 py-1 rounded-full bg-white/5 transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Category Pills */}
      <div className="px-4 py-2 bg-[#0c0d12] border-b border-white/5 flex items-center gap-2 overflow-x-auto no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-mint text-black font-bold shadow-mint-glow'
                : 'bg-[#15161f] text-white/60 hover:text-white border border-white/5'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Food Items List */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {filteredItems.map((item) => {
          const qty = getItemQuantity(item.id);
          return (
            <div
              key={item.id}
              className="p-3 rounded-2xl bg-[#13141c] border border-white/5 flex items-center justify-between gap-3 hover:border-white/10 transition-all shadow-md"
            >
              {/* Item Image with Veg/Non-Veg Tag */}
              <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-white/5 shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                {/* Veg/Non-Veg Dot */}
                <div className="absolute top-1.5 left-1.5 w-3.5 h-3.5 bg-black/70 backdrop-blur-sm rounded flex items-center justify-center border border-white/20">
                  <div className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-emerald-400' : 'bg-red-500'}`} />
                </div>
                {item.badge && (
                  <span className="absolute bottom-1 right-1 px-1.5 py-0.2 bg-mint text-black font-bold text-[8px] rounded uppercase tracking-wide">
                    {item.badge}
                  </span>
                )}
              </div>

              {/* Title & Description */}
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-white line-clamp-1">{item.name}</h4>
                <p className="text-[10px] text-white/45 line-clamp-2 mt-0.5 leading-tight">
                  {item.description}
                </p>
                <span className="text-xs font-black text-white mt-1.5 block">
                  €{item.price.toFixed(2)}
                </span>
              </div>

              {/* Quantity Counter / Add Button */}
              <div className="shrink-0">
                {qty === 0 ? (
                  <button
                    onClick={() => handleAdd(item)}
                    className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-mint hover:text-black border border-white/15 text-white font-bold text-xs tracking-wide transition-all active:scale-95"
                  >
                    + ADD
                  </button>
                ) : (
                  <div className="flex items-center gap-2 p-1 rounded-full bg-mint text-black font-extrabold shadow-mint-glow">
                    <button
                      onClick={() => handleRemove(item)}
                      className="w-6 h-6 rounded-full bg-black/15 flex items-center justify-center hover:bg-black/25 active:scale-90"
                    >
                      <Minus size={12} className="stroke-[3]" />
                    </button>
                    <span className="text-xs px-1 min-w-[14px] text-center">{qty}</span>
                    <button
                      onClick={() => handleAdd(item)}
                      className="w-6 h-6 rounded-full bg-black/15 flex items-center justify-center hover:bg-black/25 active:scale-90"
                    >
                      <Plus size={12} className="stroke-[3]" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Sticky Bottom Checkout Action Bar */}
      <div className="w-full bg-[#12131a]/95 backdrop-blur-xl border-t border-white/10 px-5 py-3.5 shadow-2xl z-20">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <ShoppingBag size={16} className="text-mint" />
            <span className="text-xs text-white/60">
              {totalItemCount === 0 ? 'No snacks added' : `${totalItemCount} snacks selected`}
            </span>
          </div>
          <span className="text-sm font-black text-white">
            €{totalFnbPrice.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onSkip}
            className="flex-1 py-3 px-4 rounded-full bg-[#1b1c24] hover:bg-[#23242e] border border-white/10 text-white font-semibold text-xs transition-all active:scale-95"
          >
            Skip F&B
          </button>
          <button
            onClick={onProceed}
            className="flex-1 py-3 px-4 rounded-full bg-mint hover:bg-mint-light text-black font-bold text-xs tracking-wide transition-all active:scale-95 shadow-mint-glow flex items-center justify-center gap-1.5"
          >
            <span>Continue to Pay</span>
            <ChevronRight size={14} className="stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
};
