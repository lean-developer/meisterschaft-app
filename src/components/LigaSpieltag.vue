<template>
  <b-container>
    <div v-if="loading">
      <div class="mt-4 mb-3">
        <b-button variant="light" @click="onClickPrev()"><b-icon-chevron-left></b-icon-chevron-left></b-button>
        <div class="caption" style="display: inline">
            <h4 style="display: inline; padding-top: 3rem">Spieltag {{spieltag.nr}}</h4>
        </div>
        <b-button variant="light" @click="onClickNext()"><b-icon-chevron-right></b-icon-chevron-right></b-button>
        <div style="display: inline; float: right">
          <b-button v-if="!isModeBearbeiten" variant="outline-success" @click="onClickBearbeiten()">Bearbeiten</b-button>
          <b-button v-if="isModeBearbeiten" variant="outline-danger" @click="onClickSave()">Speichern</b-button>
          <b-button v-if="isModeBearbeiten" variant="light" @click="onClickCancel()">Abbrechen</b-button>
        </div>
      </div>
      <div v-for="m in spieltag.matches" :key="m.id">
          <team-match :match=m :isModeBearbeiten=isModeBearbeiten @changeMatch="onChangeMatch"></team-match>
      </div>
    </div>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import SpieltagService from '@/domain/api/spieltag.service'
import { Liga } from '@/domain/models/liga'
import { Saison } from '@/domain/models/saison'
import { DeleteResult } from '@/domain/models/deleteResult'
import { Spieltag } from '@/domain/models/spieltag'
import TeamService from '../domain/api/team.service'
import MatchService from '../domain/api/match.service'
import { Team } from '@/domain/models/team'
import TeamMatch from '@/components/TeamMatch.vue'
import { Match } from '@/domain/models/match'

@Component({
  components: {
    TeamMatch
  }
})
export default class LigaSpieltag extends Vue {
  private ligaId = 0
  private saisonId = 0
  private spieltagNr = 0
  private spieltage: Spieltag[] = []
  private loading = false
  private isModeBearbeiten = false
  private changedMatches = new Map()

  async created () {
    this.ligaId = +this.$route.params.ligaId
    this.saisonId = +this.$route.params.saisonId
    this.spieltagNr = +this.$route.params.spieltagNr
    await this.loadSpieltage()
  }

  get nrLastSpieltag (): number {
    if (this.spieltage) {
      return this.spieltage[this.spieltage.length - 1].nr
    }
    return 0
  }

  get spieltag (): Spieltag {
    return this.getSpieltag(this.spieltagNr)
  }

  onChangeMatch (changedMatch: Match) {
    this.changedMatches.set(changedMatch.id, changedMatch)
  }

  onClickBearbeiten () {
    this.isModeBearbeiten = true
  }

  async onClickSave () {
    console.log('SAVE MATCHES', this.changedMatches)
    const matches = Array.from(this.changedMatches.values())
    this.loading = false
    for (const m of matches) {
      await MatchService.saveMatch(m)
    }
    this.isModeBearbeiten = false
    this.loading = true
  }

  onClickCancel () {
    this.changedMatches = new Map()
    this.isModeBearbeiten = false
  }

  onClickPrev () {
    if (this.spieltagNr <= 1) {
      return
    }
    this.onClickCancel()
    const prev: string = (--this.spieltagNr).toString()
    console.log('toPrev', prev)
    this.$router.push({ name: 'LigaSpieltag', params: { spieltagNr: prev } })
  }

  getSpieltag (nr: number): Spieltag {
    for (const s of this.spieltage) {
      if (s.saisonId === this.saisonId && s.nr === nr) {
        return s
      }
    }
    this.spieltagNr = 1
    return this.spieltage[0]
  }

  onClickNext () {
    if (this.spieltagNr >= this.nrLastSpieltag) {
      return
    }
    this.onClickCancel()
    const next: string = (++this.spieltagNr).toString()
    console.log('toNext', next)
    this.$router.push({ name: 'LigaSpieltag', params: { spieltagNr: next } })
  }

  async loadSpieltage () {
    console.log('loadSpieltage ...')
    if (!this.saisonId) {
      console.error('SaisonId darf nicht null sein!')
      return
    }
    this.loading = false
    try {
      const resp = await SpieltagService.getSpieltageBySaison(this.saisonId)
      if (resp) {
        this.spieltage = resp
      }
    } catch (e) {
      console.error(e)
    }
    this.loading = true
  };
}
</script>

<style scoped>
  .caption {
    margin-top: 2rem;
  }
</style>
