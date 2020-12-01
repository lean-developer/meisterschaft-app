<template>
    <b-container>
        <b-row>
            <b-form inline>
                <b-form-group description="Mannschaft suchen">
                    <b-form-input class="mr-1" v-model="searchTeam"></b-form-input>
                    <b-button v-if="!isSearch" variant="outline-success" @click="onClickSearchTeam()">Suchen</b-button>
                    <b-button v-if="isSearch" variant="outline-danger" @click="onClickResetSearchTeam()">Reset</b-button>
                </b-form-group>
            </b-form>
            <b-form inline>
                <b-form-group description="Eigene Mannschaft erstellen">
                    <b-form-input class="ml-4 mr-1" v-model="ownTeam"></b-form-input>
                    <b-button v-if="showButtonCreateOwnTeam" variant="outline-success" @click="onClickOwnTeam()">OK</b-button>
                </b-form-group>
            </b-form>
        </b-row>
        <b-row class="mt-3">
            <b-col cols="8" v-if="loading">
                <b-list-group class="row" v-for="t in teams" :key="t.id">
                    <b-list-group-item @click="onClickTeam(t)" class="d-flex justify-content-between align-items-center">
                        <b-badge class="mr-3" pill>{{t.rank}}</b-badge>
                        <div class="team col">{{t.team}}</div>
                        <div class="col">{{t.country}}</div>
                        <b-badge variant="primary" pill>{{t.points}}</b-badge>
                    </b-list-group-item>
                </b-list-group>
            </b-col>
            <b-col>
                <div class="position-fixed">
                    <div class="ml-2 mb-3">
                        <small>Wähle mindestens 4 Mannschaften aus und starte deine Liga!</small><br>
                    </div>
                    <b-badge v-if="showTeamsCount" variant="warning" pill class="teamCount mb-3">{{teamsCount}}</b-badge>
                    <div class="selTeam" v-for="t in selectedTeams" :key="t.id">
                        <div class="mr-2" style="display: inline">{{t.team}} ({{t.country}})</div>
                        <button @click="onClickSelTeam(t)" type="button" class="close" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <b-button v-if="showButtonStarteLiga" class="mt-3" variant="outline-success" @click="onClickStarteLiga()">Liga starten</b-button>
                    <div class="mt-3">
                        {{ligaCreatedText}}
                    </div>
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>

<script lang="ts">
import { Component, Vue, Model } from 'vue-property-decorator'
import { Team } from '@/domain/models/team'
import TeamService from '@/domain/api/team.service'
import LigaService from '@/domain/api/liga.service'
import { Liga } from '@/domain/models/liga'
import { Saison } from '@/domain/models/saison'
import router from '@/router'

@Component({
  components: {
  }
})
export default class ClubTeams extends Vue {
    private loading = false
    private isSearch = false
    @Model() private ownTeam = ''
    @Model() private searchTeam = ''
    @Model() private ligaCreatedText = ''
    private teams: Team[] = []
    private clubTeams: Team[] = []
    private foundedTeams: Team[] = []
    private selectedTeams: Team[] = []

    created () {
      this.loadClubTeams()
    }

    get teamsCount (): number {
      return this.selectedTeams.length
    }

    get showTeamsCount (): boolean {
      return this.teamsCount > 0
    }

    get showButtonStarteLiga (): boolean {
      return this.teamsCount >= 4
    }

    async loadClubTeams () {
      console.log('loadClubTeams ...')
      this.loading = false
      try {
        const resp = await TeamService.getClubTeams()
        if (resp) {
          this.clubTeams = resp
          this.teams = this.clubTeams
          console.log('ClubTeams', resp)
          this.loading = true
        }
      } catch (e) {
        console.error(e)
        this.loading = false
      }
    };

    onClickTeam (team: Team) {
      this.addSelectedTeam(team)
    }

    async onClickSearchTeam () {
      if (this.searchTeam) {
        this.foundedTeams = this.searchTeamStr(this.searchTeam)
        this.teams = this.foundedTeams
        this.isSearch = true
      }
    }

    onClickResetSearchTeam () {
      this.searchTeam = ''
      this.teams = this.clubTeams
      this.isSearch = false
    }

    searchTeamStr (searchStr: string): Team[] {
      const myTeams: Team[] = []
      for (const t of this.clubTeams) {
        if (t.team) {
          if (t.team.toLowerCase().includes(searchStr.toLowerCase())) {
            myTeams.push(t)
          }
        }
      }
      return myTeams
    }

    addSelectedTeam (team: Team) {
      // nur aufnehmen, wenn noch nicht drinn
      const foundedTeam = this.selectedTeams.find(t => t.team === team.team)
      if (foundedTeam) {
        return
      }
      this.selectedTeams.push(team)
    }

    onClickSelTeam (team: Team) {
      const index = this.selectedTeams.indexOf(team)
      if (index > -1) {
        this.selectedTeams.splice(index, 1)
      }
    }

    get showButtonCreateOwnTeam (): boolean {
      return this.ownTeam.length >= 3
    }

    onClickOwnTeam () {
      const myTeam: Team = { team: this.ownTeam, country: 'selbst erstellt' }
      this.addSelectedTeam(myTeam)
    }

    async onClickStarteLiga () {
      // 1) Liga erzeugen
      const liga: Liga | undefined = await LigaService.createLiga('NeueLiga_' + new Date().toDateString())
      if (liga) {
        // 2) Saison erzeugen
        const saisonName: string = new Date().getFullYear().toString()
        const saison: Saison | undefined = await LigaService.createSaison(saisonName)
        if (saison) {
          // 3) Saison der Liga zuordnen
          const saisonLiga: Liga | undefined = await LigaService.addLigaSaison(liga, saison)
          if (saisonLiga) {
            this.ligaCreatedText = 'Liga erstellt: ' + saisonLiga.name + ', Saison ' + saison.name
            // 4) ausgewählte Teams der Saison zuordnen
            const saisonWithTeams: Saison | undefined = await LigaService.addSaisonTeams(saison, this.selectedTeams)
            if (saisonWithTeams) {
              this.navigateToClubLiga(liga, saison)
            } else {
              this.ligaCreatedText = 'Fehler beim Erstellen deiner Liga!'
            }
          } else {
            this.ligaCreatedText = 'Fehler beim Erstellen deiner Liga!'
          }
        }
      }
    }

    navigateToClubLiga (liga: Liga, saison: Saison) {
      router.push('/clubLiga/' + liga.id + '/' + saison.id)
    }
}
</script>

<style scoped>
    .team {
        text-align: left;
    }
    .selTeam {
        text-align: left;
        padding: 5px;
        margin-left: 1rem;
    }
    .teamCount {
        font-size: 20px;
    }
</style>
