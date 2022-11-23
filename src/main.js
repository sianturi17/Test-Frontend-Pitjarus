import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import VueApexCharts from "vue3-apexcharts";
createApp(App)
.component('v-select', vSelect)
.component('Datepicker', Datepicker)
.use(VueApexCharts)
.mount('#app')
