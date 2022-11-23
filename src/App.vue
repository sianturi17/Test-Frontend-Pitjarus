<template>
  <Dashboard 
  :dataArea="dataArea" 
  :area="area" 
  :selectedArea="selectedArea"
   @showContent="showContent"
  :headingTable="headingTable"
  :isShowContent="isShowContent" 
  :dateFrom="dateFrom"
  :dateTo="dateTo"
  :dataChart="dataChart"/>
</template>

<script>
import Dashboard from './components/Dashboard.vue'
import {reactive,ref} from 'vue'
export default {
  name: 'App',
  components: {Dashboard},

    setup(){
      const dateTo = reactive ({valueDate:''})
      const dateFrom = reactive ({valueDate:''})
      const isShowContent = ref(false)
      const headingTable = ref([])
      const chart = ref([])
      const selectedArea = reactive({wilayah:''})
      const area = reactive([
        {id:1,code:'dki_jakarta',label_name:'DKI Jakarta'},
        {id:2,code:'jawa_tengah',label_name:'Jawa Tengah'},
        {id:3,code:'jawa_barat',label_name:'Jawa Barat'},
        {id:4,code:'kalimantan',label_name:'Kalimantan'},
        {id:5,code:'bali',label_name:'Bali'},
      ])
      const dataArea = reactive ({
          'jawa_tengah':{
              'susu_kaleng': '80%',
              'roti_tawar' : '30%',
              'label_header': 'Jawa Tengah',
          },
          'bali':{
              'susu_kaleng':'30%',
              'roti_tawar' :'40%',
              'label_header': 'Bali',
          },
          'jawa_barat':{
              'susu_kaleng': '20%',
              'roti_tawar' : '10%',
              'label_header': 'Jawa Barat',
          },
          'kalimantan':{
              'susu_kaleng': '50%',
              'roti_tawar' : '30%',
              'label_header': 'Kalimantan',
          },
          'dki_jakarta':{
              'susu_kaleng': '70%',
              'roti_tawar' : '50%',
              'label_header': 'DKI Jakarta',
          },
      })
      const dataChart = reactive ({
          options: {
              chart: {
                id: 'chart data'
              },
              xaxis: {
                categories:chart
              }
          },
          series: []
      })

      const updateChart =()=>{
        const newData = chart.value.map((i) => {
            return i
        })
        dataChart.options = {
          categories: newData
        }
        const seriesRoti = chart.value.map((i) => {
            return dataArea[i].roti_tawar
        })
        const seriesSusu = chart.value.map((i) => {
            return dataArea[i].susu_kaleng
        })

        let dataUpdateSeries = [{
          name: 'Roti Tawar',
          data: seriesRoti,
        },
        {
          name: 'Susu Kaleng',
          data: seriesSusu,
        }]
        dataChart.series = dataUpdateSeries
      }
      const showContent = () =>{
        headingTable.value = selectedArea.wilayah
          if (selectedArea.wilayah.length > chart.value.length) {
            chart.value.push(selectedArea.wilayah[selectedArea.wilayah.length-1])
            }else{
              chart.value.forEach(i => {
                let x = selectedArea.wilayah.find(e => e == i)
                  if(typeof x === 'undefined'){
                    chart.value.splice(chart.value.findIndex(e => e === i),1);
                  }
                })
            }         
            isShowContent.value = true
            updateChart()
      }
        return{dataArea,area,selectedArea,showContent,headingTable,chart,isShowContent,dateTo,dateFrom,dataChart}
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  box-sizing: border-box;
}
</style>
