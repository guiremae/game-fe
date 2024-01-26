import { Platforms } from './platforms.interface';
import { Genres } from './genres.interface';
import { Cover } from './cover.interface';

export interface Game {
  id: number;
  cover: Cover;
  name: string;
  genres: Genres[];
  platforms: Platforms[];
  features: any;
  first_release_date: number;
  summary: string;
  videos: any[];
  artworks: any[];
  screenshots: any[];
}
