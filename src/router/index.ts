import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import ClubTeams from '../views/ClubTeams.vue'
import ClubLiga from '../views/ClubLiga.vue'
import LigaTabelle from '../components/LigaTabelle.vue'
import LigaSpieltag from '../components/LigaSpieltag.vue'
import LigaUebersicht from '../components/LigaUebersicht.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/clubTeams',
    name: 'ClubTeams',
    component: ClubTeams
  },
  {
    path: '/clubLiga/:ligaId/:saisonId',
    name: 'ClubLiga',
    component: ClubLiga,
    children: [
      {
        path: 'tabelle/:spieltagNr',
        name: 'LigaTabelle',
        component: LigaTabelle
      },
      {
        path: 'spieltag/:spieltagNr',
        name: 'LigaSpieltag',
        component: LigaSpieltag
      },
      {
        path: 'uebersicht',
        name: 'LigaUebersicht',
        component: LigaUebersicht
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
