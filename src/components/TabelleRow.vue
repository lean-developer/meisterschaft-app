<template>
  <div class="score" v-if="score">
      <b-row>
          <b-col>
            <div>
                {{position}}.
            </div>
        </b-col>
        <b-col>
            <div class="team">
                {{score.mannschaft.name}}
            </div>
        </b-col>
        <b-col>
            <div>
                {{score.spiele}}
            </div>
        </b-col>
        <b-col>
            <div>
                {{score.torDiff}}
            </div>
        </b-col>
        <b-col>
            <div>
                {{score.torePlus}} : {{score.toreMinus}}
            </div>
        </b-col>
        <b-col>
            <div>
                {{score.punkte}}
            </div>
        </b-col>
      </b-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Score } from '@/domain/models/score'

@Component({
  components: {
  }
})
export default class TabelleRow extends Vue {
    @Prop({ required: true }) index!: number
    @Prop({ required: true }) score!: Score

    get position (): number {
      return this.index + 1
    }
}
</script>

<style scoped>
    .score {
        padding-top: 0.5rem;
    }
    .team {
        text-align: left;
    }
</style>
