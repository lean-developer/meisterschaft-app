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
        </div>
      </div>
      <div v-for="m in spieltag.matches" :key="m.id">
          <team-match :match=m :isModeBearbeiten=isModeBearbeiten></team-match>
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
import teamService from '../domain/api/team.service'
import { Team } from '@/domain/models/team'
import TeamMatch from '@/components/TeamMatch.vue'

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

  async created () {
    this.ligaId = +this.$route.params.ligaId
    this.saisonId = +this.$route.params.saisonId
    this.spieltagNr = +this.$route.params.spieltagNr
    await this.loadSpieltage()
  }

  get spieltag (): Spieltag {
    return this.getSpieltag(this.spieltagNr)
  }

  onClickBearbeiten () {
    this.isModeBearbeiten = true
  }

  onClickSave () {
    this.isModeBearbeiten = false
  }

  onClickPrev () {
    if (this.spieltagNr <= 1) {
      return
    }
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
        console.log('Spieltage', resp)
        this.loading = true
      }
    } catch (e) {
      console.error(e)
      this.loading = false
    }
  };
}
</script>

<style scoped>
  .caption {
    margin-top: 2rem;
  }
</style>
