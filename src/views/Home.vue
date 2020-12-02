<template>
  <b-container>
    <div v-if="loading" class="lds-ripple"><div></div><div></div></div>
    <b-card-group deck>
      <liga-card v-for="l in ligen" :key="l.id" :liga=l @deleteLiga="onDeleteLiga"></liga-card>
    </b-card-group>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LigaService from '@/domain/api/liga.service'
import LigaCard from '@/components/LigaCard.vue'
import { Liga } from '@/domain/models/liga'
import { Saison } from '@/domain/models/saison'
import { DeleteResult } from '@/domain/models/deleteResult'

@Component({
  components: {
    LigaCard
  }
})
export default class Home extends Vue {
  private ligen: Liga[] = []
  private loading = false

  created () {
    this.loadLigen()
  }

  async loadLigen () {
    console.log('loadLigen ...')
    this.loading = true
    try {
      const resp = await LigaService.getLigen()
      if (resp) {
        this.ligen = resp
      }
    } catch (e) {
      console.error(e)
    }
    this.loading = false
  }

  async onDeleteLiga (isDeleted: boolean) {
    if (isDeleted) {
      await this.loadLigen()
    }
  }
}
</script>
