# Meridian Cinema — 3D Interactive Seat Booking Application

A production-quality cinema seat-booking web application faithfully recreating the exact layout, visual aesthetics, tactile interactions, and 3D auditorium preview demonstrated in the reference video.

---

## 🌟 Key Features

1. **Exact Visual & Layout Fidelity**
   - **Header**: Cinema name (*Meridian*), auditorium (*Hall 3 · Fri 14 Nov*), back navigation, and hall acoustics/specifications info modal.
   - **Showtime Pill Bar**: Interactive selector (`17:30 2D`, `19:45 IMAX`, `22:15 2D`) with animated sliding capsule and dynamic showtime seat availability.
   - **Curved Screen Crest**: Glowing SVG screen curve communicating viewing orientation with ambient projection beam.
   - **Interactive 2D Seating Chart**: 9 rows (A through I) arranged in realistic 3-block geometry (3 left seats, 7 center seats, 3 right seats) with aisles.
   - **Seat States**:
     - *Available*: Dark slate rounded box (`#33353e`)
     - *Taken*: Dark outlined box (`border: #2d2f38`)
     - *Recliner*: Burgundy velvet (`#7a3344`, Rows H & I)
     - *Selected*: Glowing mint green (`#3ddc97`) with seat number rendered inside.

2. **2D-to-3D Auditorium Transition**
   - When user clicks **Continue**, the interface smoothly transitions from the flat 2D seating map to a real **3D Cinema Auditorium**.
   - The camera starts from an overhead perspective, displaying all rows and highlighting the chosen seat in mint green among the audience chairs.
   - The camera glides down into the exact first-person **eye-level point-of-view (POV)** of the chosen seat.

3. **3D First-Person Seat Preview**
   - Built with **Three.js** and **React Three Fiber**.
   - **Giant Curved IMAX Screen**: Displays the high-resolution cinematic film still and looping video from the reference video (*Dune: Part Two*).
   - **Tiered Auditorium Architecture**: Realistic stepped risers, dark carpet, acoustic wall panels, and step edge LED guide lights.
   - **Plush Cinema Chairs**: Realistic 3D chairs with backrests, rounded headrests, armrests, and cushions.
   - **Interactive Lookaround**: Drag / touch / swipe to pan your view slightly within the auditorium.

4. **Accurate Seat Metrics & Mini Seat Radar**
   - Dynamically calculates real-world metrics calibrated to the reference video:
     - **Distance to screen**: e.g., `6.3 m` (Row B) → `9.8 m` (Row F) → `13.3 m` (Row I)
     - **Field of view (FOV)**: e.g., `86°` → `60°` → `45°`
     - **Offset from centre**: e.g., `2.2 m left of centre` (Seat 4), `0.3 m right of centre` (Seat 8), `3.3 m right of centre` (Seat 12)
   - **Interactive Mini Seat Radar**: Live miniature overview in the 3D sheet allowing users to tap any seat dot to fly the 3D camera to that seat.

5. **Tactile Sound & Checkout Experience**
   - **Web Audio API**: Synthesized tactile clicks for seat selection, smooth whooshes for 3D transitions, and pleasant chimes for reservation.
   - **Digital Ticket Confirmation Pass**: Complete pass with movie title, hall, date, seat number, price breakdown (€12.50 / €16.00 + €1.50 fee), barcode, and confetti celebration.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation
```bash
# Install dependencies
npm install

# Start the Vite local development server
npm run dev

# Or build for production
npm run build
npm run preview
```

Open `http://localhost:3000` in your web browser.

