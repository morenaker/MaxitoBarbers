export interface Variant {
  id: string;
  title: string;
  description: string;
  durability: string;
  realism: string;
  image: string;
}

export interface Benefit {
  title: string;
  description: string;
  icon: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface BookingSlot {
  date: string;
  time: string;
}