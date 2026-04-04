export interface Game {
  id?: number;
  title: string;
  slug?: string;
  developer: string;
  price: number;
  image: string;
  video?: string;
  genre: string[];
  rating: number;
  description: string;
  detailedDescription?: string;
  release_date?: string | Date;
  players?: string;
  platforms?: string[];
  storeLinks?: Record<string, string>;
}
