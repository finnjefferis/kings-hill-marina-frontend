import { Boat } from "./Boat";

export interface Berth {
  id: number;
  location: string;
  boatId?: number | null;
  boat?: Boat | null;
}
