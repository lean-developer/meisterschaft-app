<template>
  <div class="score txt" :style="{ 'background-color': bgColor, 'color': color }" v-if="score">
      <b-row>
         <b-col cols="1">
            <div class="pos">
                {{position}}.
            </div>
        </b-col>
        <b-col cols="3">
            <b-img v-if="score.mannschaft.img" thumbnail :src=score.mannschaft.img alt=""></b-img>
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

    get color (): string {
      if (this.position === 1) {
        return 'blue'
      }
      return 'gray'
    }

    get bgColor (): string {
      if (this.position === 1) {
        return 'rgb(255, 255, 140)'
      }
      if (this.position > 1 && this.position <= 4) {
        return 'rgb(255, 230, 230)'
      }
      if (this.position > 4 && this.position <= 6) {
        return 'rgba(255, 255, 140, 0.384)'
      }
      if (this.position === 16) {
        return 'rgb(206, 234, 255)'
      }
      if (this.position > 16) {
        return 'rgb(230, 244, 255)'
      }
      return 'white'
    }
}
</script>

<style scoped>
    .score {
        padding-top: 0.5rem;
    }
    .pos {
        min-width: 15px;
        text-align: right;
    }
    .bg {
        background-color:lightblue
    }
    .team {
        text-align: left;
    }
    .txt {
        white-space: nowrap;
        font-size: 9px;
    }

    /* Small devices (portrait tablets and large phones, 600px and up) */
    @media only screen and (min-width: 600px) {
      .txt {
        font-size: 12px;
      }
    }

    /* Medium devices (landscape tablets, 768px and up) */
    @media only screen and (min-width: 768px) {
      .txt {
        font-size: 14px;
      }
    }

    /* Large devices (laptops/desktops, 992px and up) */
    @media only screen and (min-width: 992px) {
      .txt {
        font-size: 16px;
      }
    }
</style>
