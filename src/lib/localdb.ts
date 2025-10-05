// src/lib/localdb.ts
export type User = {
  id: number;
  name: string;
  email: string;
  role: "user" | "admin";
  createdAt?: string;
};

export type Room = {
  id: number;
  name: string;
  capacity: number;
  price: number;
  type: string;
};

export type Booking = {
  id: number;
  name: string;
  date: string;
  time: string;
  room?: string;
  status: "Confirmed" | "Cancelled";
};

const K = {
  users: "users",
  rooms: "rooms",
  bookings: "bookings",
} as const;

// สร้าง id โอกาสชนต่ำกว่าการใช้ Date.now() ล้วน ๆ
const makeId = () => Date.now() * 1000 + Math.floor(Math.random() * 1000);

// อ่าน/เขียน localStorage แบบ SSR-safe
function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, data: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(data));
}

export const localdb = {
  /* ---------- Users ---------- */
  listUsers(): User[] {
    return read<User[]>(K.users, []);
  },

  addUser(u: Omit<User, "id" | "createdAt">): User {
    const list = read<User[]>(K.users, []);
    const user: User = {
      ...u,
      id: makeId(),
      createdAt: new Date().toISOString(),
    };
    list.push(user);
    write(K.users, list);
    return user;
  },

  patchUser(id: number, patch: Partial<User>): User | null {
    const list = read<User[]>(K.users, []);
    const i = list.findIndex((x) => x.id === id);
    if (i === -1) return null;
    list[i] = { ...list[i], ...patch, id };
    write(K.users, list);
    return list[i];
  },

  deleteUser(id: number): boolean {
    const list = read<User[]>(K.users, []);
    const next = list.filter((x) => x.id !== id);
    write(K.users, next);
    return next.length !== list.length;
  },

  /* ---------- Rooms ---------- */
  listRooms(): Room[] {
    return read<Room[]>(K.rooms, []);
  },

  addRoom(r: Omit<Room, "id">): Room {
    const list = read<Room[]>(K.rooms, []);
    const room: Room = { ...r, id: makeId() };
    list.push(room);
    write(K.rooms, list);
    return room;
  },

  patchRoom(id: number, patch: Partial<Room>): Room | null {
    const list = read<Room[]>(K.rooms, []);
    const i = list.findIndex((x) => x.id === id);
    if (i === -1) return null;
    list[i] = { ...list[i], ...patch, id };
    write(K.rooms, list);
    return list[i];
  },

  deleteRoom(id: number): boolean {
    const list = read<Room[]>(K.rooms, []);
    const next = list.filter((x) => x.id !== id);
    write(K.rooms, next);
    return next.length !== list.length;
  },

  /* ---------- Bookings ---------- */
  listBookings(): Booking[] {
    return read<Booking[]>(K.bookings, []);
  },

  addBooking(b: Omit<Booking, "id" | "status">): Booking {
    const list = read<Booking[]>(K.bookings, []);
    const booking: Booking = { ...b, id: makeId(), status: "Confirmed" };
    list.push(booking);
    write(K.bookings, list);
    return booking;
  },

  patchBooking(id: number, patch: Partial<Booking>): Booking | null {
    const list = read<Booking[]>(K.bookings, []);
    const i = list.findIndex((x) => x.id === id);
    if (i === -1) return null;
    list[i] = { ...list[i], ...patch, id };
    write(K.bookings, list);
    return list[i];
  },

  deleteBooking(id: number): boolean {
    const list = read<Booking[]>(K.bookings, []);
    const next = list.filter((x) => x.id !== id);
    write(K.bookings, next);
    return next.length !== list.length;
  },
};
