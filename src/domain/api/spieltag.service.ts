import http from './server/http'
import { Team } from './../models/team'
import { Saison } from '../models/saison'
import { Spieltag } from '../models/spieltag'

class SpieltagService {
  async getSpieltageBySaison (saisonId: number): Promise<Spieltag[] | undefined> {
    try {
      const api = 'spieltag/saison/' + saisonId
      const resp = await http.get(api)
      return resp.data as Spieltag[]
    } catch (e) {
      console.error(e)
    }
  }

  async getSpieltageBySaisonAndNr (saisonId: number, spieltagNr: number): Promise<Spieltag | undefined> {
    try {
      const api = 'spieltag/' + spieltagNr + '/saison/' + saisonId
      const resp = await http.get(api)
      return resp.data as Spieltag
    } catch (e) {
      console.error(e)
    }
  }
}

export default new SpieltagService()
