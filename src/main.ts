import { createApp } from 'vue';
import App from './App/index.vue'; // 可使用tsx方式
import store from './store';
import router from './router/index';
import './assets/less/common.less';
import './index.less';

// 异步函数可先获取全局数据
(async () => {
    const app = createApp(App);
    app.use(router);
    app.use(store);
    app.mount('#app');
})();

