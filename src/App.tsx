import React, { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  ViewMode,
  SeatData,
  Showtime,
  CameraPerspective,
  DistrictScreen,
  Movie,
  CinemaVenue,
  DistrictCity,
  FoodItem,
  CartItem,
  BookingPass,
} from './types';
import { generateSeatingLayout } from './data/cinemaData';
import {
  DISTRICT_CITIES,
  MOVIES,
  CINEMA_VENUES,
  INITIAL_BOOKING_PASSES,
} from './data/districtData';

// District Super-App Components
import { DistrictTopBar } from './components/district/DistrictTopBar';
import { DistrictBottomNav } from './components/district/DistrictBottomNav';
import { DistrictDiscoveryView } from './components/district/DistrictDiscoveryView';
import { DistrictMovieDetailsView } from './components/district/DistrictMovieDetailsView';
import { DistrictFnbView } from './components/district/DistrictFnbView';
import { DistrictCheckoutView } from './components/district/DistrictCheckoutView';
import { DistrictMyPassesView } from './components/district/DistrictMyPassesView';
import { DistrictEventsView } from './components/district/DistrictEventsView';
import { DistrictLocationModal } from './components/district/DistrictLocationModal';

// Signature 3D Cinema Seating Components
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
  // Navigation & City state
  const [currentScreen, setCurrentScreen] = useState<DistrictScreen>('discovery');
  const [selectedCity, setSelectedCity] = useState<DistrictCity>(DISTRICT_CITIES[0]); // Mumbai
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);

  // Active movie & venue selections
  const [selectedMovie, setSelectedMovie] = useState<Movie>(MOVIES[0]);
  const [selectedCinema, setSelectedCinema] = useState<CinemaVenue>(CINEMA_VENUES[0]);
  const [activeShowtime, setActiveShowtime] = useState<Showtime>(CINEMA_VENUES[0].showtimes[1]); // 19:45 IMAX
  const [selectedSeatId, setSelectedSeatId] = useState<string | null>('F8');

  // 3D Cinema View states
  const [viewMode, setViewMode] = useState<ViewMode>('map');
  const [cameraPerspective, setCameraPerspective] = useState<CameraPerspective>('pov');
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  // F&B Cart & Digital Wallet Passes
  const [cart, setCart] = useState<CartItem[]>([]);
  const [bookingPasses, setBookingPasses] = useState<BookingPass[]>(INITIAL_BOOKING_PASSES);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

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
      if (viewMode === 'map') {
        setSelectedSeatId(null);
      } else if (viewMode === 'view3d') {
        // In 3D view mode, tapping the active green seat toggles between Hall Overview and Seated POV
        setCameraPerspective((curr) => (curr === 'pov' ? 'auditorium' : 'pov'));
      }
    } else {
      setSelectedSeatId(seat.id);
    }
  };

  // Cinematic Transition from 2D Map to 3D Cinema View
  const handleContinueTo3D = (targetSeat?: SeatData) => {
    const seatToUse = targetSeat || selectedSeat;
    if (!seatToUse) return;

    if (targetSeat && targetSeat.id !== selectedSeatId) {
      setSelectedSeatId(targetSeat.id);
    }
    soundFX.playTransition();

    // Direct cinematic swoop into Seated POV matching reference image
    setViewMode('transitioning');
    setCameraPerspective('pov');

    setTimeout(() => {
      setViewMode('view3d');
    }, 400);
  };

  // Dedicated seat selection from 2D Map: clicking any seat triggers the cinema 3D effect!
  const handleSeatSelectFromMap = (seat: SeatData) => {
    if (seat.status === 'taken') return;
    setSelectedSeatId(seat.id);
    soundFX.playSeatClick();

    // Smooth swoop into the 3D cinema effect matching reference image
    setTimeout(() => {
      handleContinueTo3D(seat);
    }, 240);
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

  // Proceed from Seating to F&B Snacks Screen
  const handleProceedToFnb = () => {
    if (!selectedSeat) return;
    soundFX.playTransition();
    setCurrentScreen('fnb');
  };

  // F&B Cart item update
  const handleUpdateCart = (item: FoodItem, delta: number) => {
    setCart((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id);
      if (!existing && delta > 0) {
        return [...prev, { item, quantity: 1 }];
      }
      if (existing) {
        const nextQty = existing.quantity + delta;
        if (nextQty <= 0) {
          return prev.filter((ci) => ci.item.id !== item.id);
        }
        return prev.map((ci) =>
          ci.item.id === item.id ? { ...ci, quantity: nextQty } : ci
        );
      }
      return prev;
    });
  };

  // Proceed to Checkout
  const handleProceedToCheckout = () => {
    soundFX.playTransition();
    setCurrentScreen('checkout');
  };

  // Confirm Payment & Complete Booking
  const handleConfirmPayment = (details: {
    ticketTotal: number;
    fnbTotal: number;
    discountAmount: number;
    convenienceFee: number;
    finalTotal: number;
    appliedCode: string | null;
  }) => {
    if (!selectedSeat) return;

    // Fire Celebratory Confetti!
    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3ddc97', '#ffffff', '#ffd700', '#ff3366'],
      });
    } catch (e) {
      // safe fallback
    }

    const newPass: BookingPass = {
      id: `pass-${Date.now()}`,
      bookingRef: `DST-${Math.floor(10000 + Math.random() * 90000)}-${activeShowtime.format}`,
      movie: selectedMovie,
      cinema: selectedCinema,
      showtime: activeShowtime,
      seats: [selectedSeat],
      fnbItems: [...cart],
      ticketTotal: details.ticketTotal,
      fnbTotal: details.fnbTotal,
      discountAmount: details.discountAmount,
      convenienceFee: details.convenienceFee,
      finalTotal: details.finalTotal,
      bookingTimestamp: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      qrCodeData: `DISTRICT-TICKET-${selectedMovie.id}-${selectedSeat.id}`,
      status: 'confirmed',
    };

    setBookingPasses((prev) => [newPass, ...prev]);
    setIsConfirmationOpen(true);
    setCurrentScreen('confirmation');
  };

  return (
    <div className="min-h-screen w-full bg-[#07070a] text-white flex items-center justify-center sm:py-6 overflow-hidden select-none font-sans">
      {/* Ambient background glow for desktop experience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 hidden sm:block">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-mint/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-red-950/10 rounded-full blur-[120px]" />
      </div>

      {/* Main District Mobile Chassis */}
      <main className="relative w-full max-w-[420px] h-[100dvh] sm:h-[844px] bg-[#0c0d11] sm:border sm:border-white/10 sm:rounded-[44px] shadow-2xl flex flex-col justify-between overflow-hidden z-10 sm:ring-1 sm:ring-white/5">
        
        {/* District Global Top Bar (Shown on Discovery, Passes, and Events screens) */}
        {(currentScreen === 'discovery' || currentScreen === 'my_passes' || currentScreen === 'events') && (
          <DistrictTopBar
            selectedCity={selectedCity}
            onOpenCityModal={() => setIsCityModalOpen(true)}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            showSearchBar={showSearchBar}
            onToggleSearchBar={() => setShowSearchBar(!showSearchBar)}
            activePassesCount={bookingPasses.filter((p) => p.status === 'confirmed').length}
            onOpenPasses={() => setCurrentScreen('my_passes')}
          />
        )}

        {/* SCREEN 1: Discovery Screen (Home Hub) */}
        {currentScreen === 'discovery' && (
          <DistrictDiscoveryView
            onSelectMovie={(movie) => {
              soundFX.playSeatClick();
              setSelectedMovie(movie);
              setCurrentScreen('movie_details');
            }}
            searchQuery={searchQuery}
          />
        )}

        {/* SCREEN 2: Movie Details & Theaters Screen */}
        {currentScreen === 'movie_details' && (
          <DistrictMovieDetailsView
            movie={selectedMovie}
            onBack={() => setCurrentScreen('discovery')}
            onSelectShowtimeAndCinema={(cinema, showtime) => {
              soundFX.playTransition();
              setSelectedCinema(cinema);
              setActiveShowtime(showtime);
              setSelectedSeatId('F8');
              setViewMode('map');
              setCurrentScreen('seating');
            }}
          />
        )}

        {/* SCREEN 3: The Signature 3D Cinema Seating Experience */}
        {currentScreen === 'seating' && (
          <div className="relative w-full h-full flex flex-col justify-between overflow-hidden">
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
                    onBack={() => setCurrentScreen('movie_details')}
                    onInfoClick={() => setIsInfoOpen(true)}
                  />

                  {/* Showtime Selector Pills */}
                  <ShowtimeSelector
                    showtimes={selectedCinema.showtimes}
                    activeShowtimeId={activeShowtime.id}
                    onSelectShowtime={(st) => {
                      soundFX.playSeatClick();
                      setActiveShowtime(st);
                    }}
                  />
                </div>

                {/* Center Seating Chart & Curved Screen */}
                <div className="w-full flex-1 flex flex-col justify-center py-1">
                  <CinemaScreenCurve />
                  <SeatMap
                    seats={seats}
                    selectedSeatId={selectedSeatId}
                    onSeatSelect={handleSeatSelectFromMap}
                  />
                </div>

                {/* 2D Bottom Booking Sheet */}
                <BottomBookingSheet
                  viewMode="map"
                  selectedSeat={selectedSeat}
                  seats={seats}
                  onSeatSelect={handleSeatSelectFromMap}
                  onContinue={() => handleContinueTo3D()}
                  onChangeSeat={handleChangeSeat}
                  onBook={handleProceedToFnb}
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
                    onContinue={handleContinueTo3D}
                    onChangeSeat={handleChangeSeat}
                    onBook={handleProceedToFnb}
                    onTogglePerspective={handleTogglePerspective}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* SCREEN 4: District F&B Concessions Screen */}
        {currentScreen === 'fnb' && (
          <DistrictFnbView
            cart={cart}
            onUpdateCart={handleUpdateCart}
            onProceed={handleProceedToCheckout}
            onSkip={handleProceedToCheckout}
          />
        )}

        {/* SCREEN 5: District Order Summary & Instant Checkout */}
        {currentScreen === 'checkout' && (
          <DistrictCheckoutView
            movie={selectedMovie}
            cinema={selectedCinema}
            showtime={activeShowtime}
            selectedSeats={selectedSeat ? [selectedSeat] : []}
            cart={cart}
            onBack={() => setCurrentScreen('fnb')}
            onConfirmPayment={handleConfirmPayment}
          />
        )}

        {/* SCREEN 6: My Passes (Digital Ticket Wallet) */}
        {currentScreen === 'my_passes' && (
          <DistrictMyPassesView
            passes={bookingPasses}
            onBookMore={() => setCurrentScreen('discovery')}
          />
        )}

        {/* SCREEN 7: Going Out & Events Feed */}
        {currentScreen === 'events' && <DistrictEventsView />}

        {/* District Bottom Navigation Bar */}
        {(currentScreen === 'discovery' || currentScreen === 'my_passes' || currentScreen === 'events') && (
          <DistrictBottomNav
            currentScreen={currentScreen}
            onSelectScreen={(screen) => {
              soundFX.playSeatClick();
              setCurrentScreen(screen);
            }}
            activePassesCount={bookingPasses.filter((p) => p.status === 'confirmed').length}
          />
        )}

        {/* Booking Confirmation Pass Modal */}
        <BookingConfirmationModal
          isOpen={isConfirmationOpen}
          onClose={() => {
            setIsConfirmationOpen(false);
            setCurrentScreen('my_passes');
          }}
          selectedSeat={selectedSeat}
          activeShowtime={activeShowtime}
        />

        {/* Cinema & Sound System Info Modal */}
        <CinemaInfoModal
          isOpen={isInfoOpen}
          onClose={() => setIsInfoOpen(false)}
        />

        {/* District Location Picker Modal */}
        <DistrictLocationModal
          isOpen={isCityModalOpen}
          onClose={() => setIsCityModalOpen(false)}
          selectedCity={selectedCity}
          onSelectCity={(city) => {
            soundFX.playSeatClick();
            setSelectedCity(city);
          }}
        />
      </main>
    </div>
  );
};

export default App;
