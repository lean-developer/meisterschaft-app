import { Team } from './team'

export interface Score {
    team: Team;
    spiele: number;
    siege: number;
    unentschieden: number;
    niederlagen: number;
    punkte: number;
    heimPunkte: number;
    gastPunkte: number;
    torePlus: number;
    heimTorePlus: number;
    gastTorePlus: number;
    toreMinus: number;
    heimToreMinus: number;
    gastToreMinus: number;
    torDiff: number;
    sortFaktor: number;
}
