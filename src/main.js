import Vue from 'vue';

import {
  InputNumber,
  Dropdown,
  Table,
  TableColumn,
  Slider,
  Rate,
  Button,
  Carousel,
  CarouselItem,
  Upload,
  Dialog,
  Tabs,
  TabPane,
  Input,
  Form,
  FormItem,
  Radio,
  RadioGroup,
  Select,
  Option
} from 'element-ui';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/assets/css/reset.css';
// eslint-disable-next-line import/order
// eslint-disable-next-line no-unused-vars
import VueJsonp from 'vue-jsonp';
// eslint-disable-next-line max-len

Vue.use(Button).use(Carousel).use(CarouselItem).use(Upload)
  .use(Dialog).use(Tabs).use(TabPane).use(Input).use(Form).use(FormItem);
Vue.use(Rate).use(Slider).use(Table).use(TableColumn).use(VueJsonp).
use(InputNumber).use(Dropdown).use(Radio).use(RadioGroup).use(Select).use(Option);
// Vue.config.productionTip = false;
//require('./mock');

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
