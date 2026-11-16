# MASTER PROMPT — RECREATE THE CINEMA SEAT BOOKING APPLICATION

## ROLE AND OBJECTIVE

Act as a senior full-stack developer, UI/UX designer, 3D graphics engineer and professional motion designer.

Your task is to build a complete, production-quality, fully interactive cinema seat-booking application by carefully studying the attached reference video.

The reference video is the primary visual and interaction specification.

Do not create a generic cinema booking website. Recreate the actual experience, layout, visual language, seat-selection behaviour, 3D perspective transitions and animations demonstrated in the reference video.

The final result must be a working application, not a static mockup, screenshot or non-interactive prototype.

**Primary objective: achieve the closest possible visual and behavioural match to the reference video.**

---

# 1. FIRST: ANALYSE THE REFERENCE VIDEO

Before writing any code:

1. Inspect the complete reference video.
2. Examine every important frame.
3. Identify all screens, UI components and visual elements.
4. Identify every user interaction.
5. Understand how the seating chart changes when a seat is selected.
6. Study the transition between the 2D seating map and 3D auditorium preview.
7. Identify camera movements, animation timing, easing and transitions.
8. Identify the colours, typography, spacing, borders, shadows and corner radii.
9. Identify the exact order of the user journey.

Create a clear implementation plan based on this analysis.

Do not invent additional screens or unnecessary features that change the original experience.

If a detail cannot be established from the video, make a reasonable, consistent design decision without pretending it was visible in the reference.

# 2. DESIGN AND VISUAL STYLE

Reproduce the premium, modern cinema-booking aesthetic.

### Colour palette

- Main background: deep black / charcoal.
- Secondary surfaces: dark grey.
- Primary text: white.
- Secondary text: muted grey.
- Selected seat: mint green.
- Available seat: neutral grey.
- Unavailable seat: muted red.
- Premium/recliner seat: visually distinct from standard seats.
- Primary action button: mint green.

Avoid unnecessary gradients, excessive bright colours or distracting decorations.

### Overall appearance

- Premium dark interface.
- Minimal and elegant layout.
- Rounded components.
- Smooth transitions.
- Consistent spacing.
- Clear typography hierarchy.
- Subtle shadows and lighting.
- Professional mobile-first design.

The result should feel like a professionally designed cinema-booking product.

# 3. MAIN APPLICATION SCREEN

Build the primary seat-selection screen.

### Header

Include:

- Cinema name: Meridian.
- Hall information: Hall 3.
- Date information: Fri 14 Nov.
- Appropriate back/navigation control.

### Showtime selector

Display three selectable showtimes:

- 17:30 2D
- 19:45 IMAX
- 22:15 2D

The selected showtime must have a clear highlighted state.

When the user changes the showtime:

- Animate the selection indicator.
- Update the active showtime.
- Preserve the overall layout.
- Update seat availability when the underlying showtime data differs.

### Cinema screen indicator

Display a curved cinema screen at the top of the seating chart.

It should visually communicate the direction in which the audience faces.

### Seating chart

Create an interactive seating layout with rows A to I.

Requirements:

- Display row labels.
- Display individual seat positions.
- Use consistent seat dimensions and spacing.
- Include realistic aisle spacing.
- Differentiate available, occupied and premium seats.
- Allow users to select available seats.
- Prevent selection of occupied seats.
- Clearly highlight the currently selected seat.

Include a legend for:

- Available.
- Taken.
- Recliner.
- Selected.

Use realistic seating arrangements rather than a basic rectangular grid.

# 4. SEAT SELECTION ANIMATION

This is a critical feature.

When the user clicks an available seat:

1. Detect the click.
2. Show a subtle touch/ripple effect.
3. Scale the seat slightly.
4. Change its colour to mint green.
5. Add a subtle selection glow.
6. Display the selected seat number.
7. Update the booking information panel.
8. Update the seat price.
9. Activate the Continue button.

When a different seat is selected:

- Remove the previous seat highlight.
- Return the previous seat to its original state.
- Highlight the newly selected seat.
- Update all relevant information.
- Update the 3D preview position.

Do not allow multiple selections unless the reference explicitly supports them.

The animation must feel smooth, responsive and natural.

# 5. BOTTOM BOOKING INFORMATION PANEL

Create a premium bottom information panel.

It must display:

- Selected row.
- Selected seat number.
- Seat category.
- Ticket price.
- Continue button.

Example initial selection:

Row B · Seat 4

Price: €12.50

The panel should slide upwards smoothly when a seat is selected.

When the selected seat changes, animate the text and price updates without unnecessarily recreating the entire panel.

The Continue button must:

- Remain disabled when no seat is selected.
- Become active when a valid seat is selected.
- Show a pressed state.
- Navigate to the next booking stage when clicked.

# 6. MAIN FEATURE — 2D TO 3D CINEMA TRANSITION

This is the most important visual feature of the application.

Do not replace this feature with a simple image or a basic fade transition.

Create an actual 3D cinema auditorium preview.

### 3D auditorium environment

Build a realistic cinema auditorium containing:

- Large movie screen.
- Cinema walls.
- Auditorium floor.
- Multiple rows of cinema chairs.
- Realistic red cinema seats.
- Appropriate lighting.
- Depth and perspective.
- Shadows and spatial separation.

### Selected seat

The selected seat must:

- Correspond to the seat chosen in the 2D map.
- Be highlighted in mint green.
- Be positioned correctly within its row.
- Remain visually distinguishable from surrounding seats.

### Camera animation

When the user opens the 3D preview:

1. Begin with the current 2D seating map.
2. Preserve the selected seat information.
3. Smoothly transition to the auditorium perspective.
4. Reveal the rows of cinema chairs.
5. Highlight the selected chair.
6. Move the camera towards the appropriate viewing position.
7. Settle into a realistic viewing angle.
8. Display the final seat preview.

The camera should not jump suddenly.

Use smooth interpolation and appropriate easing.

### Camera synchronisation

When the user selects another seat:

- Recalculate the camera position.
- Update the selected seat.
- Move the camera smoothly.
- Show the correct viewing perspective.
- Avoid sudden changes in camera orientation.

The selected seat and 3D camera must always correspond to the same seat.

# 7. SEAT VIEW PREVIEW

The 3D preview must help users understand what they will see from their selected position.

Display:

- The movie screen.
- The selected seat.
- Surrounding cinema chairs.
- The viewing direction.
- The auditorium perspective.

The selected seat must remain the primary visual focus.

The preview must be generated from the actual 3D scene, not a collection of unrelated static pictures.

# 8. ANIMATION AND MOTION DESIGN

Use professional motion design throughout the application.

Suggested animation timings:

| Interaction | Duration |
|---|---:|
| Initial header appearance | 300 ms |
| Showtime selection | 300 ms |
| Seating chart entrance | 400 ms |
| Seat selection | 250 ms |
| Seat touch feedback | 300 ms |
| Information update | 200 ms |
| Bottom panel entrance | 400 ms |
| 2D to 3D transition | 800–1200 ms |
| Camera movement | 800–1200 ms |
| Button interaction | 200–250 ms |

These are target timings, not mandatory fixed values. Adjust them to match the reference video.

Use appropriate easing functions such as ease-out, ease-in-out and smooth interpolation.

Avoid:

- Abrupt screen changes.
- Flickering.
- Unnecessary bouncing.
- Excessive scaling.
- Inconsistent animation speeds.
- Layout shifting.
- Animation conflicts.
- Unnatural camera movements.

# 9. COMPLETE USER JOURNEY

Implement the following workflow:

STEP 1: User opens the application.

STEP 2: Cinema information and showtimes appear.

STEP 3: User views the seating chart.

STEP 4: User selects an available seat.

STEP 5: The selected seat turns green.

STEP 6: The booking information panel updates.

STEP 7: User opens the 3D seat preview.

STEP 8: The 2D seating map transitions into the 3D auditorium.

STEP 9: The camera moves towards the selected seat's viewing position.

STEP 10: User can change the seat.

STEP 11: The seat selection, price and 3D camera update together.

STEP 12: User confirms the selected seat.

STEP 13: The application proceeds to the booking confirmation stage.

Every step must be functional.

# 10. TECHNICAL IMPLEMENTATION

Choose a suitable technology stack based on the existing project.

Preferred stack if starting from scratch:

- React.
- TypeScript.
- Vite.
- Three.js.
- React Three Fiber.
- Drei.
- Framer Motion.
- CSS or Tailwind CSS.

Use Three.js or React Three Fiber for the actual 3D auditorium.

Use Framer Motion or an equivalent animation library for UI transitions.

Use reusable React components.

Recommended component structure:

- App
- CinemaHeader
- ShowtimeSelector
- CinemaScreen
- SeatMap
- Seat
- SeatLegend
- BookingBottomSheet
- Cinema3DPreview
- Auditorium
- AuditoriumSeat
- CameraController
- BookingConfirmation
- AnimationController

Keep the code modular, readable and maintainable.

# 11. APPLICATION STATE MANAGEMENT

Use a single reliable source of truth for seat selection.

Maintain the following information:

- Selected showtime.
- Selected seat.
- Seat availability.
- Seat category.
- Seat price.
- Current application screen.
- 3D preview visibility.
- Current camera position.
- Booking status.

When the user selects a seat, all connected components must update automatically.

Never allow the following inconsistencies:

- A different seat highlighted in the map and 3D view.
- Incorrect price.
- Incorrect row or seat number.
- A taken seat being selectable.
- An active Continue button without a valid selection.
- A camera position unrelated to the selected seat.

# 12. RESPONSIVE DESIGN

The application must work properly on:

- Desktop computers.
- Laptops.
- Tablets.
- Mobile phones.

On mobile:

- Keep the seating chart readable.
- Make seats large enough to tap.
- Prevent horizontal overflow.
- Keep the bottom booking panel accessible.
- Ensure the 3D preview fits the screen.
- Preserve the premium design.

Do not simply shrink the desktop interface.

# 13. PERFORMANCE AND QUALITY

The application must:

- Load without errors.
- Render smoothly.
- Avoid unnecessary React re-renders.
- Use efficient 3D geometry.
- Avoid excessive polygon counts.
- Optimise textures and lighting.
- Dispose of unused 3D resources.
- Handle resizing correctly.
- Avoid memory leaks.
- Support touch and mouse interactions.

Aim for smooth 60 FPS rendering on reasonably capable devices, while degrading gracefully on less powerful hardware.

Respect reduced-motion accessibility preferences.

# 14. TESTING REQUIREMENTS

Before completing the project, test every interaction.

### Seat-selection tests

- Select an available seat.
- Change the selected seat.
- Select a premium seat.
- Attempt to select a taken seat.
- Remove the current selection.

### 3D tests

- Open the 3D preview.
- Verify that the correct seat is highlighted.
- Verify camera positioning.
- Change seats.
- Verify camera updates.
- Return to the seating map.

### Booking tests

- Verify the displayed price.
- Verify the selected seat details.
- Verify Continue button states.
- Complete the booking demonstration flow.

### Responsive tests

- Test desktop.
- Test tablet.
- Test mobile.

Fix all discovered errors before delivery.

# 15. FINAL VISUAL QUALITY CHECK

Compare the finished application against the supplied reference video.

Check:

1. Overall layout.
2. Cinema header.
3. Showtime selector.
4. Seat-map geometry.
5. Seat colours.
6. Typography.
7. Bottom information panel.
8. Seat-selection animation.
9. 2D to 3D transition.
10. Auditorium appearance.
11. Camera movement.
12. Selected-seat highlighting.
13. Overall animation smoothness.

Do not declare the work complete merely because the application runs.

The result must be visually and functionally close to the reference.

# 16. STRICT DEVELOPMENT RULES

- Do not deliver only a design description.
- Do not deliver screenshots instead of a working application.
- Do not replace 3D functionality with static images.
- Do not use fake buttons.
- Do not leave interactions unfinished.
- Do not use placeholder elements for core functionality.
- Do not remove important features to simplify development.
- Do not introduce unrelated features.
- Do not break existing project functionality.
- Do not claim that something works unless it has been tested.

If the project already contains code, inspect it before making changes and preserve useful existing functionality.

If you encounter an error, debug and fix it rather than hiding it.

If a feature cannot be implemented exactly, explain the limitation and provide the closest functional implementation.

# 17. FINAL DELIVERABLE

Deliver:

1. Complete working source code.
2. Fully interactive cinema seat-selection interface.
3. Real 3D auditorium preview.
4. Smooth 2D-to-3D transitions.
5. Synchronized seat and camera selection.
6. Functional booking workflow.
7. Responsive desktop and mobile layouts.
8. Instructions to install and run the application.

Start by analysing the attached reference video. Then plan the architecture, implement the application, run it, test every interaction and refine the visuals.

**FINAL PRIORITY: RECREATE THE REFERENCE EXPERIENCE AS ACCURATELY AS POSSIBLE. VISUAL FIDELITY, FUNCTIONAL INTERACTIONS AND SMOOTH ANIMATIONS ARE ALL EQUALLY IMPORTANT.**