import { createApp } from 'vue'
import { createPinia } from 'pinia'
import persistedState from 'pinia-plugin-persistedstate'
import App from './App.vue'
import './style.css'

const pinia = createPinia()
pinia.use(persistedState)

const app = createApp(App)

app.directive('scroll-reveal', {
  mounted: (el) => {
    el.classList.add('scroll-hidden');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          el.classList.add('scroll-visible');
        } else {
          el.classList.remove('scroll-visible');
        }
      });
    }, { threshold: 0.1 });
    observer.observe(el);
  }
});

app.use(pinia)
app.mount('#app')