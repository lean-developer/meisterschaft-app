<template>
  <div class="head">
      <b-row class="txt">
          <b-col>
            <div>
            </div>
        </b-col>
        <b-col>
            <div>
            </div>
        </b-col>
        <b-col>
            <div>
                Spiele
            </div>
        </b-col>
        <b-col>
            <div>
                Diff.
            </div>
        </b-col>
        <b-col>
            <div>
                Tore
            </div>
        </b-col>
        <b-col>
            <div>
                Punkte
            </div>
        </b-col>
      </b-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  components: {
  }
})
export default class TabelleRow extends Vue {
}
</script>

<style scoped>
    .head {
        color: rgb(77, 77, 77)
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
