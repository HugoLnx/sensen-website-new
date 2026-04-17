export interface Game {
  _id?: string | number; // Aceita ID do banco (MongoDB)
  id?: string | number;  // Aceita ID numérico (SQL)
  slug?: string;
  title: string;
  image?: string;
  video?: string;
  description?: string;
  short_description?: string;
  genre: string[];
  rating: number;
  platforms?: string[];
  storeLinks?: Record<string, string>;
  publisher?: string;
  developer?: string;
}