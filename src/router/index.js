import { createRouter, createWebHistory } from 'vue-router'
import login from '../views/login.vue'
import home from '../views/home.vue'
import editform from '@/views/editform.vue';
import adddata from '@/views/adddata.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem('token'); 
        if (!token) {
          next({ name: 'login' }); 
        } else {

          fetch('https://dummyjson.com/users', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(response => {
            if (response.ok) {

              next();
            } else {

              next({ name: 'login' });
            }
          })
          .catch(error => {
            console.error('Error checking token:', error);

            next({ name: 'login' });
          });
        }
      }

    },
    {
      path: '/edit/:userId',
      name: 'edit',
      component: editform
    },
    {
      path: '/add',
      name: 'add',
      component: adddata
    },

    
  ]
});



export default router;