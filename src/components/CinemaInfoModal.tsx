import React from 'react';
import { X, Film, Volume2, Armchair, Eye } from 'lucide-react';

interface CinemaInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CinemaInfoModal: React.FC<CinemaInfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm rounded-[28px] bg-[#14151b] border border-white/10 p-5 shadow-2xl flex flex-col gap-4 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div>
            <h3 className="text-base font-bold text-white">Meridian Cinema</h3>
            <p className="text-xs text-white/50">Hall 3 · Premium IMAX Experience</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex flex-col gap-3 text-xs">
          <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/5">
            <Film size={20} className="text-mint shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white block">IMAX with 4K Laser</span>
              <p className="text-white/60 text-[11px] leading-relaxed mt-0.5">
                Dual 4K laser projection delivering hyper-vivid colors, deep contrast and stunning sharpness.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/5">
            <Volume2 size={20} className="text-mint shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white block">Dolby Atmos Immersive Audio</span>
              <p className="text-white/60 text-[11px] leading-relaxed mt-0.5">
                Precision-tuned multi-speaker acoustic array with ceiling transducers for full 3D spatial sound.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/5">
            <Armchair size={20} className="text-mint shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white block">Luxury Recliners (Rows H & I)</span>
              <p className="text-white/60 text-[11px] leading-relaxed mt-0.5">
                Power-reclining ergonomic seats with footrests, swivel side tables, and individual USB power.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/5">
            <Eye size={20} className="text-mint shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white block">3D Seat POV Preview</span>
              <p className="text-white/60 text-[11px] leading-relaxed mt-0.5">
                Click any seat and hit Continue to preview the exact sightline, distance, and screen view in 3D.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-full bg-white/10 hover:bg-white/15 text-white font-medium text-xs transition-all active:scale-[0.98]"
        >
          Got it
        </button>
      </div>
    </div>
  );
};

