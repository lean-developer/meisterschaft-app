import { Saison } from './saison'

export interface Liga {
    id: number;
    name: string;
    saisons: Saison[];
}
