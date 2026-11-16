import React, { useState, useMemo } from 'react';
import { ViewMode, SeatData, Showtime, CameraPerspective } from './types';
import { SHOWTIMES, generateSeatingLayout } from './data/cinemaData';
import { CinemaHeader } from './components/CinemaHeader';
import { ShowtimeSelector } from './components/ShowtimeSelector';
import { CinemaScreenCurve } from './components/CinemaScreenCurve';
import { SeatMap } from './components/SeatMap';
import { BottomBookingSheet } from './components/BottomBookingSheet';
import { Cinema3DCanvas } from './components/canvas3d/Cinema3DCanvas';
import { BookingConfirmationModal } from './components/BookingConfirmationModal';
import { CinemaInfoModal } from './components/CinemaInfoModal';
import { soundFX } from './utils/audio';

export const App: React.FC = () => {
  const [activeShowtime, setActiveShowtime] = useState<Showtime>(SHOWTIMES[1]); // 19:45 IMAX default
  const [selectedSeatId, setSelectedSeatId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('map');
  const [cameraPerspective, setCameraPerspective] = useState<CameraPerspective>('pov');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  // Generate seats based on active showtime and selection
  const seats = useMemo(() => {
    return generateSeatingLayout(activeShowtime.id, selectedSeatId);
  }, [activeShowtime.id, selectedSeatId]);

  // Current selected seat object
  const selectedSeat = useMemo(() => {
    if (!selectedSeatId) return null;
    return seats.find((s) => s.id === selectedSeatId) || null;
  }, [seats, selectedSeatId]);

  // Handle seat click (supports 2D map, 3D auditorium seats, and mini radar)
  const handleSeatSelect = (seat: SeatData) => {
    if (seat.status === 'taken') return;
    soundFX.playSeatClick();
    if (selectedSeatId === seat.id) {
      // In 2D map mode, toggle off if already selected
      if (viewMode === 'map') {
        setSelectedSeatId(null);
      } else if (viewMode === 'view3d') {
        // In 3D view mode, tapping the active green seat smoothly toggles between Hall Overview and Seated POV
        setCameraPerspective((curr) => (curr === 'pov' ? 'auditorium' : 'pov'));
      }
    } else {
      setSelectedSeatId(seat.id);
    }
  };

  // Switch showtime
  const handleSelectShowtime = (st: Showtime) => {
    soundFX.playSeatClick();
    setActiveShowtime(st);
    // Deselect if seat is taken in new showtime
    const takenSeats = generateSeatingLayout(st.id, null)
      .filter((s) => s.status === 'taken')
      .map((s) => s.id);
    if (selectedSeatId && takenSeats.includes(selectedSeatId)) {
      setSelectedSeatId(null);
    }
  };

  // Two-Stage Cinematic Transition from 2D Map to 3D Auditorium View
  const handleContinue = () => {
    if (!selectedSeat) return;
    soundFX.playTransition();

    // Stage 1: Auditorium view behind the seat (reveals the glowing green seat & descending hall)
    setViewMode('transitioning');
    setCameraPerspective('auditorium');

    // Stage 2: Smooth swoop forward into Seated POV and slide bottom sheet up
    setTimeout(() => {
      setViewMode('view3d');
      setCameraPerspective('pov');
    }, 750);
  };

  // Toggle camera perspective between Seated POV and Auditorium Hall Overview
  const handleTogglePerspective = () => {
    soundFX.playTransition();
    setCameraPerspective((curr) => (curr === 'pov' ? 'auditorium' : 'pov'));
  };

  // Return from 3D Auditorium View back to 2D Map
  const handleChangeSeat = () => {
    soundFX.playTransition();
    setViewMode('map');
  };

  // Proceed to Booking Confirmation
  const handleBook = () => {
    if (!selectedSeat) return;
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen w-full bg-[#07070a] text-white flex items-center justify-center sm:py-6 overflow-hidden select-none font-sans">
      {/* Ambient background glow for desktop experience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 hidden sm:block">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-mint/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-red-950/10 rounded-full blur-[120px]" />
      </div>

      {/* Main Mobile App Container */}
      <main className="relative w-full max-w-[420px] h-[100dvh] sm:h-[844px] bg-[#0c0d11] sm:border sm:border-white/10 sm:rounded-[44px] shadow-2xl flex flex-col justify-between overflow-hidden z-10 sm:ring-1 sm:ring-white/5">
        
        {/* Dynamic 3D Cinema Canvas Layer */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            viewMode === 'view3d' || viewMode === 'transitioning'
              ? 'opacity-100 pointer-events-auto z-10'
              : 'opacity-0 pointer-events-none z-0'
          }`}
        >
          <Cinema3DCanvas
            seats={seats}
            selectedSeat={selectedSeat}
            viewMode={viewMode}
            cameraPerspective={cameraPerspective}
            onSeatSelect={handleSeatSelect}
          />
        </div>

        {/* 2D Map View Layer */}
        {viewMode === 'map' && (
          <div className="relative flex flex-col h-full justify-between z-20 animate-in fade-in duration-300">
            {/* Top Bar & Header */}
            <div className="w-full flex flex-col">
              <CinemaHeader
                viewMode="map"
                selectedSeat={selectedSeat}
                activeShowtime={activeShowtime}
                onBack={() => {}}
                onInfoClick={() => setIsInfoOpen(true)}
              />

              {/* Showtime Selection Pills */}
              <ShowtimeSelector
                showtimes={SHOWTIMES}
                activeShowtimeId={activeShowtime.id}
                onSelectShowtime={handleSelectShowtime}
              />
            </div>

            {/* Center Seating Chart & Curved Screen */}
            <div className="w-full flex-1 flex flex-col justify-center py-1">
              <CinemaScreenCurve />
              <SeatMap
                seats={seats}
                selectedSeatId={selectedSeatId}
                onSeatSelect={handleSeatSelect}
              />
            </div>

            {/* 2D Bottom Booking Sheet */}
            <BottomBookingSheet
              viewMode="map"
              selectedSeat={selectedSeat}
              seats={seats}
              onSeatSelect={handleSeatSelect}
              onContinue={handleContinue}
              onChangeSeat={handleChangeSeat}
              onBook={handleBook}
            />
          </div>
        )}

        {/* 3D View Overlays (Header & 3D Bottom Sheet) */}
        {viewMode === 'view3d' && (
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none z-30 animate-in fade-in duration-300">
            {/* 3D Header with back button & perspective toggle */}
            <div className="pointer-events-auto w-full">
              <CinemaHeader
                viewMode="view3d"
                selectedSeat={selectedSeat}
                activeShowtime={activeShowtime}
                cameraPerspective={cameraPerspective}
                onBack={handleChangeSeat}
                onInfoClick={() => setIsInfoOpen(true)}
                onTogglePerspective={handleTogglePerspective}
              />
            </div>

            {/* 3D Bottom Sheet with metrics, mini radar & perspective pills */}
            <div className="pointer-events-auto w-full">
              <BottomBookingSheet
                viewMode="view3d"
                selectedSeat={selectedSeat}
                seats={seats}
                cameraPerspective={cameraPerspective}
                onSeatSelect={handleSeatSelect}
                onContinue={handleContinue}
                onChangeSeat={handleChangeSeat}
                onBook={handleBook}
                onTogglePerspective={handleTogglePerspective}
              />
            </div>
          </div>
        )}

        {/* Booking Confirmation Pass Modal */}
        <BookingConfirmationModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          selectedSeat={selectedSeat}
          activeShowtime={activeShowtime}
        />

        {/* Cinema & Sound System Info Modal */}
        <CinemaInfoModal
          isOpen={isInfoOpen}
          onClose={() => setIsInfoOpen(false)}
        />
      </main>
    </div>
  );
};

export default App;
