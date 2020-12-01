<template>
    <b-card>
        <template #header>
            <b-row>
                <b-col cols="10" class="head">
                    <h6>{{liga.name}}</h6>
                </b-col>
                <b-col>
                    <b-icon-trash @click="onDelete(true, liga)" class="trash"></b-icon-trash>
                </b-col>
            </b-row>
        </template>
      <b-card-text v-for="s in liga.saisons" :key="s.id">
          <b-row>
              <b-col style="text-align: left" @click="onLigaSaison(liga, s)">
                  <b-icon-arrow-right class="saison"></b-icon-arrow-right>
                  <span class="saison ml-2">Saison {{s.name}}</span>
              </b-col>
          </b-row>
      </b-card-text>
      <template #footer>
        <small class="text-muted">Last updated 3 mins ago</small>
      </template>
    </b-card>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import TeamService from '@/domain/api/team.service'
import { Team } from '@/domain/models/team'
import { Liga } from '@/domain/models/liga'
import { Saison } from '@/domain/models/saison'
import ligaService from '../domain/api/liga.service'
import { DeleteResult } from '../domain/models/deleteResult'

@Component({
  components: {
  }
})
export default class LigaCard extends Vue {
    @Prop({ required: true }) liga!: Liga
    private doDeleteLiga = false

    onLigaSaison (liga: Liga, saison: Saison) {
      this.navigateToClubLiga(liga, saison)
    }

    navigateToClubLiga (liga: Liga, saison: Saison) {
      this.$router.push('/clubLiga/' + liga.id + '/' + saison.id)
    }

    @Emit('deleteLiga')
    async onDelete (showConfirmBox: boolean, liga: Liga): Promise<boolean | undefined> {
      this.doDeleteLiga = await this.$bvModal.msgBoxConfirm('Liga wirklich löschen?')
      console.log(this.doDeleteLiga)
      if (this.doDeleteLiga) {
        const deleteResult: DeleteResult | undefined = await ligaService.deleteLiga(liga)
        console.log('DeleteLigaResult', deleteResult)
        if (deleteResult) {
          if (deleteResult.affected && deleteResult.affected > 0) {
            return true
          }
        }
      }
      return false
    }
}
</script>

<style scoped>
    .saison {
        color:rgb(93, 60, 255);
        cursor: pointer;
    }
    .trash {
        color: lightgray;
        cursor: pointer;
    }
    .head {
        color: rgb(80, 78, 78);
        font-weight: bolder;
        display: flex;
        justify-content: left;
        align-items: center;
        height: 25px;
        border: 0px solid green;
        padding-left: 10px;
        padding-top: 10px;
    }
</style>
