export const ROW_INDEX_MAP: Record<string, number> = {
  'A': 0,
  'B': 1,
  'C': 2,
  'D': 3,
  'E': 4,
  'F': 5,
  'G': 6,
  'H': 7,
  'I': 8,
};

// Seat column X positions matching reference video aisles
export function getSeatX(seatNum: number): number {
  switch (seatNum) {
    // Left Block (3 seats)
    case 1: return -4.1;
    case 2: return -3.45;
    case 3: return -2.8;
    // Center Block (7 seats)
    case 4: return -1.95; // Row B, Seat 4 is here (~2.2m left of center)
    case 5: return -1.30;
    case 6: return -0.65;
    case 7: return 0.0;
    case 8: return 0.65;  // Row F, Seat 8 is here (~0.3m right of center)
    case 9: return 1.30;
    case 10: return 1.95;
    // Right Block (3 seats)
    case 11: return 2.8;
    case 12: return 3.45; // Row I, Seat 12 is here (~3.3m right of center)
    case 13: return 4.1;
    default: return (seatNum - 7) * 0.65;
  }
}

// Seat Y (elevation) and Z (depth) by row
export function getSeat3DPosition(row: string, seatNum: number): [number, number, number] {
  const rowIndex = ROW_INDEX_MAP[row] ?? 4;
  const x = getSeatX(seatNum);
  const y = rowIndex * 0.40;
  const z = -2.8 + rowIndex * 1.40;
  return [x, y, z];
}

// Camera POV position when user is sitting in this seat
export function getSeatCameraPosition(row: string, seatNum: number): [number, number, number] {
  const [x, y, z] = getSeat3DPosition(row, seatNum);
  // Seated eye height: 1.22m above tier floor, positioned at front edge of seat
  return [x, y + 1.22, z - 0.20];
}

// Camera Auditorium / Behind-the-seat overview position (showing the seat in foreground and hall descending)
export function getSeatAuditoriumCameraPosition(row: string, seatNum: number): [number, number, number] {
  const rowIndex = ROW_INDEX_MAP[row] ?? 4;
  const x = getSeatX(seatNum);
  // Positioned elevated behind the selected row looking down the stadium rake (matches reference video f_0043.jpg & f_0076.jpg)
  const targetRowIndex = Math.min(8.7, rowIndex + 1.8);
  const camY = targetRowIndex * 0.40 + 1.55;
  const camZ = -2.8 + targetRowIndex * 1.40;
  return [x, camY, camZ];
}

