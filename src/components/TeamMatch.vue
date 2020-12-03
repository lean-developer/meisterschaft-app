<template>
  <div class="match" v-if="match">
      <b-row>
        <b-col class="bg">
            <div class="team">
                <b-img v-if="match.heim.img" thumbnail :src=match.heim.img alt=""></b-img>
                <b-img v-if="!match.heim.img" thumbnail :src=imgDefault alt=""></b-img>
                {{match.heim.name}}
            </div>
        </b-col>
        <b-col class="bg">
            <div class="team">
                <b-img v-if="match.gast.img" thumbnail :src=match.gast.img alt=""></b-img>
                <b-img v-if="!match.gast.img" thumbnail :src=imgDefault alt=""></b-img>
                {{match.gast.name}}
            </div>
        </b-col>
        <b-col v-if="!isModeBearbeiten" class="bg">
            <div class="mt-3">
                {{match.heimTore}}:{{match.gastTore}}
            </div>
        </b-col>
        <b-col v-if="isModeBearbeiten" class="bg-1">
            <b-input-group>
                <b-input type="text"></b-input>
                <b-input type="text"></b-input>
            </b-input-group>
        </b-col>
      </b-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Match } from '@/domain/models/match'

@Component({
  components: {
  }
})
export default class TeamMatch extends Vue {
    @Prop({ required: false }) isModeBearbeiten = false
    @Prop({ required: true }) match!: Match

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
</style>
