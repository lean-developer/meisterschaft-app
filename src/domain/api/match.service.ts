import http from './server/http'
import { Match } from '../models/match'

class MatchService {
  async saveMatch (match: Match): Promise<Match | undefined> {
    try {
      const api = 'match'
      const resp = await http.post(api, match)
      console.log('RESP', resp)
      return resp.data as Match
    } catch (e) {
      console.error(e)
    }
  }
}

export default new MatchService()
