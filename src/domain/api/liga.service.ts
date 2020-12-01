import http from './server/http'
import { Saison } from './../models/saison'
import { Liga } from './../models/liga'
import { Team } from '../models/team'
import { DeleteResult } from '../models/deleteResult'
import { Score } from '../models/score'

class LigaService {
  async getLigen (): Promise<Liga[] | undefined> {
    try {
      const api = 'liga'
      const resp = await http.get(api)
      console.log('RESP', resp)
      return resp.data as Liga[]
    } catch (e) {
      console.error(e)
    }
  }

  async getLiga (ligaId: number): Promise<Liga | undefined> {
    try {
      const api = 'liga/' + ligaId
      const resp = await http.get(api)
      console.log('RESP', resp)
      return resp.data as Liga
    } catch (e) {
      console.error(e)
    }
  }

  async createLiga (ligaName: string): Promise<Liga | undefined> {
    try {
      const api = 'liga?name=' + ligaName
      const resp = await http.post(api)
      console.log('RESP', resp)
      return resp.data as Liga
    } catch (e) {
      console.error(e)
    }
  }

  async saveLigaName (liga: Liga): Promise<Liga | undefined> {
    try {
      const api = 'liga/' + liga.id + '?name=' + liga.name
      const resp = await http.post(api)
      console.log('RESP', resp)
      return resp.data as Liga
    } catch (e) {
      console.error(e)
    }
  }

  async deleteLiga (liga: Liga): Promise<DeleteResult | undefined> {
    try {
      const api = 'liga/' + liga.id
      const resp = await http.delete(api)
      console.log('RESP', resp)
      return resp.data as DeleteResult
    } catch (e) {
      console.error(e)
    }
  }

  async addLigaSaison (liga: Liga, saison: Saison): Promise<Liga | undefined> {
    try {
      const api = 'liga/' + liga.id + '/saison/' + saison.id
      const resp = await http.post(api)
      console.log('RESP', resp)
      return resp.data as Liga
    } catch (e) {
      console.error(e)
    }
  }

  async getSaisons (): Promise<Saison[] | undefined> {
    try {
      const api = 'saison'
      const resp = await http.get(api)
      console.log('RESP', resp)
      return resp.data as Saison[]
    } catch (e) {
      console.error(e)
    }
  }

  async getSaisonScores (saisonId: number): Promise<Score[] | undefined> {
    try {
      const api = 'saison/' + saisonId + '/tabelle'
      const resp = await http.get(api)
      return resp.data as Score[]
    } catch (e) {
      console.error(e)
    }
  }

  async getSaisonScoresBySpieltag (saisonId: number, spieltagNr: number): Promise<Score[] | undefined> {
    try {
      const api = 'saison/' + saisonId + '/tabelle/' + spieltagNr
      const resp = await http.get(api)
      return resp.data as Score[]
    } catch (e) {
      console.error(e)
    }
  }

  async createSaison (saisonName: string): Promise<Saison | undefined> {
    try {
      const api = 'saison?name=' + saisonName
      const resp = await http.post(api)
      console.log('RESP', resp)
      return resp.data as Saison
    } catch (e) {
      console.error(e)
    }
  }

  async addSaisonTeams (saison: Saison, teams: Team[]): Promise<Saison | undefined> {
    try {
      const api = 'saison/' + saison.id
      const resp = await http.post(api, teams)
      console.log('RESP', resp)
      return resp.data as Saison
    } catch (e) {
      console.error(e)
    }
  }
}

export default new LigaService()
