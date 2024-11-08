export interface Boat {
  id: number;
  name: string;
  length: number;
  make: string;
  type: string;
  ownerId: number;
  berthId?: number | null;
}
