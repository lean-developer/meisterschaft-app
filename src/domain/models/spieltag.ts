import { Match } from './match'

export interface Spieltag {
    id: number;
    nr: number;
    saisonId: number;
    matches: Match[];
}
