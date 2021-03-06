<template>
  <b-container>
    <div v-if="liga">
    <b-form @submit.stop.prevent="onSubmit" @reset.stop.prevent="onReset">
                <b-form-row>
                    <b-col cols="8">
                        <div class="ml-3" v-if="!edit">
                            <div style="cursor: pointer; display: inline" @click="onEdit()">
                                <b-icon-pencil></b-icon-pencil>
                            </div>
                            <h4 class="ml-3" style="display: inline">{{name}}</h4>
                        </div>
                        <div class="ml-3" v-if="edit">
                            <b-row>
                                <b-col class="mr-2" cols="1">
                                    <div style="cursor: pointer; display: inline" @click="onEdit()">
                                        <b-icon-x></b-icon-x>
                                    </div>
                                </b-col>
                                <b-cols>
                                    <b-form-group id="input-group-name" label="" label-for="input-name">
                                        <b-form-input id="input-name" v-model="name" required placeholder="Name der Liga" @focus="onFocusInput()" :state="validateName()"></b-form-input>
                                        <b-form-invalid-feedback :state="validateName()">
                                            min 3 / max 25 Zeichen
                                        </b-form-invalid-feedback>
                                        <div v-if="serviceError">
                                            {{serviceError}}
                                        </div>
                                    </b-form-group>
                                </b-cols>
                                <b-col class="mt-1">
                                    <b-button size="sm" variant="light" type="submit" v-if="showSubmit()">Ok</b-button>
                                    <b-button size="sm" variant="light" type="reset" v-if="showReset()">Cancel</b-button>
                                </b-col>
                            </b-row>
                        </div>
                    </b-col>
                </b-form-row>
            </b-form>
            <div v-if="teams">
              <div v-for="t in teams" :key="t.id">
                {{t.name}}, {{t.country}} ({{t.id}})
              </div>
            </div>
    </div>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model } from 'vue-property-decorator'
import { Liga } from '@/domain/models/liga'
import { Team } from '@/domain/models/team'
import LigaService from '../domain/api/liga.service'
import teamService from '@/domain/api/team.service'

@Component({
  components: {
  }
})
export default class LigaStatistik extends Vue {
  private ligaId = 0
  private saisonId = 0
  @Model() private liga: Liga | undefined
  private teams: Team[] | undefined
  private edit = false
  private serviceError = ''
  @Model() private name = ''

  async created () {
    this.ligaId = +this.$route.params.ligaId
    this.saisonId = +this.$route.params.saisonId
    await this.loadLiga()
    await this.loadTeams()
  }

  mounted () {
    if (this.liga) { this.name = this.liga.name }
  }

  async loadLiga () {
    this.liga = await LigaService.getLiga(this.ligaId)
  }

  async loadTeams () {
    this.teams = await teamService.getTeamsBySaison(this.saisonId)
  }

  async onSubmit () {
    if (!this.liga) {
      return
    }
    if (!this.changed()) {
      return
    }
    if (!this.validateName()) {
      return
    }
    console.log('Submit ', this.liga.name, this.name)
    this.liga.name = this.name
    const changedLiga: Liga | undefined = await LigaService.saveLigaName(this.liga)
    if (changedLiga) {
      this.liga = changedLiga
      this.edit = false
    }
  }

  onEdit () {
    this.edit = !this.edit
  }

  onFocusInput () {
    this.serviceError = ''
  }

  onReset () {
    if (!this.liga) {
      return
    }
    this.name = this.liga.name
    this.serviceError = ''
  }

  changed (): boolean {
    if (!this.liga) {
      return false
    }
    return this.name !== this.liga.name
  }

  showSubmit (): boolean {
    if (!this.changed()) {
      return false
    }
    return this.validateName()
  }

  showReset (): boolean {
    return this.changed()
  }

  validateName (): boolean {
    if (!this.name) {
      return false
    }
    return this.name.length > 3 && this.name.length < 25
  }
}
</script>
