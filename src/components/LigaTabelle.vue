<template>
  <b-container>
    <div>
      <div class="mt-3 mb-3">
        <b-button variant="light" @click="onClickPrev()"><b-icon-chevron-left></b-icon-chevron-left></b-button>
         <div class="ml-3 mr-3" style="display: inline">
            <h4 style="display: inline">Spieltag {{spieltagNr}}</h4>
        </div>
        <b-button variant="light" @click="onClickNext()"><b-icon-chevron-right></b-icon-chevron-right></b-button>
      </div>
      <div v-if="loading">
        <div v-for="(score, index) in scores" :key="score.mannschaft.id">
          <tabelle-row :index=index :score=score></tabelle-row>
        </div>
      </div>
    </div>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model } from 'vue-property-decorator'
import LigaService from '../domain/api/liga.service'
import TabelleRow from '@/components/TabelleRow.vue'
import { Score } from '@/domain/models/score'

@Component({
  components: {
    TabelleRow
  }
})
export default class LigaTabelle extends Vue {
  private ligaId = 0
  private saisonId = 0
  private spieltagNr = 0
  private loading = false
  private scores!: Score[] | undefined

  async created () {
    this.ligaId = +this.$route.params.ligaId
    this.saisonId = +this.$route.params.saisonId
    this.spieltagNr = +this.$route.params.spieltagNr
    if (this.spieltagNr && this.spieltagNr > 0) {
      this.loading = false
      this.scores = await LigaService.getSaisonScoresBySpieltag(this.saisonId, this.spieltagNr)
      this.loading = true
    } else {
      this.loadTabelle()
    }
  }

  async loadTabelle () {
    this.loading = false
    this.scores = await LigaService.getSaisonScores(this.saisonId)
    this.loading = true
    console.log('SCORES', this.scores)
  }

  async onClickPrev () {
    if (this.spieltagNr <= 1) {
      return
    }
    const prev: string = (--this.spieltagNr).toString()
    console.log('toPrev', prev)
    this.loading = false
    this.scores = await LigaService.getSaisonScoresBySpieltag(this.saisonId, +prev)
    this.$router.push({ name: 'LigaTabelle', params: { spieltagNr: prev } })
    this.loading = true
  }

  async onClickNext () {
    const next: string = (++this.spieltagNr).toString()
    console.log('toNext', next)
    this.loading = false
    this.scores = await LigaService.getSaisonScoresBySpieltag(this.saisonId, +next)
    this.$router.push({ name: 'LigaTabelle', params: { spieltagNr: next } })
    this.loading = true
  }
}
</script>
