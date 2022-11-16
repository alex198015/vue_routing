import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import TeamsList from './pages/TeamsList.vue';
import UsersList from './pages/UsersList.vue';
import TeamMember from './components/teams/TeamMembers.vue';
import NotFound from './pages/NotFound.vue';
import TeamsFooter from './pages/TeamsFooter.vue';
import UsersFooter from './pages/UsersFooter.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', redirect: '/teams' },
      // { path: '/teams', component: TeamsList , alias: '/'}, // our-domain.com/teams => TeamsList
      {
        name: 'teams',
        path: '/teams',
        meta: {needsAuth: true},
        components: { default: TeamsList, footer: TeamsFooter },
        children: [
          {
            name: 'team-members',
            path: ':teamId',
            component: TeamMember,
            props: true,
          },
        ],
      }, // our-domain.com/teams => TeamsList
      { path: '/users', components: { 
          default: UsersList,
          footer: UsersFooter 
        },
        beforeEnter(to, from, next){
          console.log('Users beforEnter', to, from);
          next()
        }
      },
      // { path: '/teams/:teamId', component: TeamMember, props: true },
      { path: '/:notFound(.*)', component: NotFound },
    ],
    linkExactActiveClass: 'active',
    scrollBehavior(_, _2, savedPosition) {
      // console.log(to, from, savedPosition);
      if (savedPosition) {
        return savedPosition
      }
      return {
        left: 0,
        top: 0,
      }
    }
  });
  
  router.beforeEach(function(to,from, next){
    console.log('Global beforEach ', to, from);
    if(to.meta.needsAuth) {
      console.log('Needs auth');
      next()
    } else {
      next()
    }
    // if(to.name === 'team-members') {
    //   next()
    // } else {
    //   next({name: 'team-members', params: {teamId: 't2'}})
  
    // }
    next()
  })
  
  router.afterEach((to,from) => {
    console.log('AfterEach', to, from);
  })
  

  export default router 