import { Boat } from "./Boat"; // Adjust the path if needed

export interface Berth {
  id: number;
  location: string;
  boat?: Boat | null;
}
