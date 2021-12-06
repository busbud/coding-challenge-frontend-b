export interface Destination {
  city: string;
  location: string;
  time: Date;
}

export interface Departure {
  id: string;
  operator: string;
  origin: Destination;
  arrival: Destination;
  availableSeats: number;
  price: number;
  currency: string;
}
