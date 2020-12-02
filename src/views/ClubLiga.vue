<template>
  <b-container>
    <!--
      <b-button variant="outline-primary" @click="onShowTabelle()">Tabelle</b-button>
      <b-button variant="outline-primary" @click="onShowSpieltage()">Spieltage</b-button>
      <b-button variant="outline-primary" @click="onShowUebersicht()">Uebersicht</b-button>
    -->
      <div>
        <b-nav tabs fill>
          <b-nav-item :active=isTabelleActive @click="onShowTabelle()">Tabelle</b-nav-item>
          <b-nav-item :active=isSpieltagActive @click="onShowSpieltage()">Spieltage</b-nav-item>
          <b-nav-item :active=isUebersichtActive @click="onShowUebersicht()">Übersicht</b-nav-item>
        </b-nav>
      </div>
      <div class="mt-3">
          <router-view></router-view>
      </div>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue, Model, Emit } from 'vue-property-decorator'
import TeamService from '@/domain/api/team.service'
import { Team } from '@/domain/models/team'
import { Liga } from '@/domain/models/liga'
import LigaService from '../domain/api/liga.service'
import LigaSpieltag from '@/components/LigaSpieltag.vue'
import LigaUebersicht from '@/components/LigaUebersicht.vue'
import LigaTabelle from '@/components/LigaTabelle.vue'

@Component({
  components: {
    LigaSpieltag,
    LigaUebersicht,
    LigaTabelle
  }
})
export default class ClubLiga extends Vue {
    private loading = false
    private ligaId = 0
    private liga!: Liga
    private saisonId = 0
    private spieltagNr = 0
    private teams: Team[] = []
    private isTabelleActive = false
    private isSpieltagActive = false
    private isUebersichtActive = false

    async mounted () {
      this.ligaId = +this.$route.params.ligaId
      this.saisonId = +this.$route.params.saisonId
      await this.loadLiga()
      this.onShowTabelle()
    }

    onShowTabelle () {
      this.isTabelleActive = true
      this.isSpieltagActive = false
      this.isUebersichtActive = false
      this.$router.push({ name: 'LigaTabelle', params: { spieltagNr: '1' } })
    }

    onShowSpieltage () {
      this.isSpieltagActive = true
      this.isTabelleActive = false
      this.isUebersichtActive = false
      this.$router.push({ name: 'LigaSpieltag', params: { spieltagNr: '1' } })
    }

    onShowUebersicht () {
      this.isUebersichtActive = true
      this.isTabelleActive = false
      this.isUebersichtActive = false
      this.$router.push({ name: 'LigaUebersicht' })
    }

    async loadLiga () {
      this.loading = false
      try {
        const resp = await LigaService.getLiga(this.ligaId)
        console.log('LIGA-NAME', resp)
        if (resp) {
          this.liga = resp
          this.loading = true
        }
      } catch (e) {
        console.error(e)
        this.loading = false
      }
    }

  /*
    async loadTeams () {
      console.log('loadTeams ...')
      this.loading = false
      try {
        const resp = await TeamService.getTeamsBySaison(this.saisonId)
        if (resp) {
          this.teams = resp
          console.log('Teams', resp)
          this.loading = true
        }
      } catch (e) {
        console.error(e)
        this.loading = false
      }
    }
    */
}
</script>
