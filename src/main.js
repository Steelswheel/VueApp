import { createApp } from 'vue'
import App from './App'
import components from '@/components/UI';
import directives from '@/directives';
import router from '@/router/router';
import store from '@/store';

const app = createApp(App);

components.forEach(component => {//глобальная регистрация компонентов
    app.component(component.name, component);
});

directives.forEach(directive => {//глобальная регистрация директив
    app.directive(directive.name, directive);
});

app.use(router).use(store).mount('#app');