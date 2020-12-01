import http from './server/http'
import { Team } from './../models/team'

class TeamService {
  private teamsMap = new Map()

  async getClubTeams (): Promise<Team[] | undefined> {
    try {
      const api = 'mannschaft/club'
      const resp = await http.get(api)
      console.log('RESP', resp)
      return resp.data as Team[]
    } catch (e) {
      console.error(e)
    }
  }

  async getTeamsBySaison (saisonId: number): Promise<Team[] | undefined> {
    try {
      const api = 'mannschaft/saison/' + saisonId
      const resp = await http.get(api)
      const teams: Team[] = resp.data as Team[]
      for (const t of teams) {
        this.teamsMap.set(t.id, t)
      }
      return teams
    } catch (e) {
      console.error(e)
    }
  }

  async getTeamById (id: number): Promise<Team | undefined> {
    try {
      const api = 'mannschaft/' + id
      const resp = await http.get(api)
      return resp.data as Team
    } catch (e) {
      console.error(e)
    }
  }

  getTeam (id: number): Team | undefined {
    if (this.teamsMap.has(id)) {
      return this.teamsMap.get(id)
    }
  }
}

export default new TeamService()
