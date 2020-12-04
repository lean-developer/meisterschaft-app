<template>
  <div class="match" v-if="match">
      <b-row>
        <b-col class="bg">
            <div class="team">
                <b-img v-if="match.heim.img" thumbnail :src=match.heim.img alt=""></b-img>
                <b-img v-if="!match.heim.img" thumbnail :src=imgDefault alt=""></b-img>
                <div class="team-name">{{match.heim.name}}</div>
            </div>
        </b-col>
        <b-col class="bg">
            <div class="team">
                <b-img v-if="match.gast.img" thumbnail :src=match.gast.img alt=""></b-img>
                <b-img v-if="!match.gast.img" thumbnail :src=imgDefault alt=""></b-img>
                <div class="team-name">{{match.gast.name}}</div>
            </div>
        </b-col>
        <b-col v-if="!isModeBearbeiten" class="bg">
            <div class="mt-3">
                {{heimTore}}:{{gastTore}}
            </div>
        </b-col>
        <b-col v-if="isModeBearbeiten" class="bg-1">
            <b-input-group>
                <b-input type="text" @change="onChangeMatch()" v-model="inputHeimTore"></b-input>
                <b-input type="text" @change="onChangeMatch()" v-model="inputGastTore"></b-input>
            </b-input-group>
        </b-col>
      </b-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { Match } from '@/domain/models/match'

@Component({
  components: {
  }
})
export default class TeamMatch extends Vue {
    @Prop({ required: false }) isModeBearbeiten = false
    @Prop({ required: true }) match!: Match
    private inputHeimTore!: number;
    private inputGastTore!: number;

    created () {
      if (this.match && this.match.heimTore > -1) {
        this.inputHeimTore = this.match.heimTore
      }
      if (this.match && this.match.gastTore > -1) {
        this.inputGastTore = this.match.gastTore
      }
    }

    get heimTore () {
      if (this.match && this.match.heimTore > -1) {
        return this.match.heimTore
      }
      return ''
    }

    get gastTore () {
      if (this.match && this.match.gastTore > -1) {
        return this.match.gastTore
      }
      return ''
    }

    @Emit('changeMatch')
    onChangeMatch () {
      this.match.heimTore = this.inputHeimTore
      this.match.gastTore = this.inputGastTore
      return this.match
    }

    get imgDefault () {
      return 'https://www.clubworldranking.com/modules/images/teams/small/_434.png'
    }
}
</script>

<style scoped>
    .bg {
        background-color: whitesmoke
    }
    .bg-1 {
        background-color: whitesmoke;
        padding-top: 6px;
    }
    .match {
        padding-top: 0.5rem;
    }
    .team {
        text-align: left;
    }

    /* Extra small devices (phones, 600px and down) */
    [class="team-name"] {
        font-size: 10px;
    }

    /* Small devices (portrait tablets and large phones, 600px and up) */
    @media only screen and (min-width: 600px) {
      .team-name {
        font-size: 14px;
      }
    }

    /* Medium devices (landscape tablets, 768px and up) */
    @media only screen and (min-width: 768px) {
      .team-name {
        white-space: nowrap;
        padding-top: 5px;
        font-size: 16px;
      }
    }

    /* Large devices (laptops/desktops, 992px and up) */
    @media only screen and (min-width: 992px) {
      .team-name {
        padding-left: 1rem;
        font-size: 16px;
        display: inline;
      }
    }
</style>
