<template>
  <b-container>
    <div>
      <b-row>
        <b-button size="sm" variant="light" @click="onClickPrev()"><b-icon-chevron-left></b-icon-chevron-left></b-button>
        <b-button size="sm" variant="light" @click="onClickNext()"><b-icon-chevron-right></b-icon-chevron-right></b-button>
      </b-row>
      <tabelle-head></tabelle-head>
      <div class="line"></div>
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
import TabelleHead from '@/components/TabelleHead.vue'
import { Score } from '@/domain/models/score'

@Component({
  components: {
    TabelleRow,
    TabelleHead
  }
})
export default class LigaTabelle extends Vue {
  private ligaId = 0
  private saisonId = 0
  private spieltagNr = 1
  private loading = false
  private scores!: Score[] | undefined

  async created () {
    this.ligaId = +this.$route.params.ligaId
    this.saisonId = +this.$route.params.saisonId
    if (this.$route.params.spieltagNr) {
      this.spieltagNr = +this.$route.params.spieltagNr
    }
    console.log('SP', this.spieltagNr)
    if (!Number.isNaN(this.spieltagNr) && this.spieltagNr > 0) {
      await this.loadScores(this.spieltagNr)
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

  async loadScores (spieltagNr: number) {
    this.loading = false
    this.scores = await LigaService.getSaisonScoresBySpieltag(this.saisonId, spieltagNr)
    this.$router.push({ name: 'LigaTabelle', params: { spieltagNr: spieltagNr.toString() } })
    this.loading = true
  }

  async onClickPrev () {
    if (this.spieltagNr <= 1) {
      return
    }
    await this.loadScores(--this.spieltagNr)
  }

  async onClickNext () {
    this.loadScores(++this.spieltagNr)
  }
}
</script>

<style scoped>
   .line {
    width: 100%;
    border-bottom: 2px solid black;
    position: relative;
   }
</style>
