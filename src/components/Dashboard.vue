<template>
    <div class="container">
        <div class="filter-dashboard">
            <form @submit.prevent="$emit('showContent')" class="d-flex justify-content-between">
                <div class="mb-2 form-group d-flex">
                    <label class="p-2">Area</label>
                    <v-select 
                        multiple :options="area" 
                        label="label_name" 
                        v-model="selectedArea.wilayah" 
                        :reduce="label_name =>label_name.code" 
                        class="select-area">
                    </v-select>
                </div>
                <div class="mb-2 form-group d-flex">
                    <label class="p-2">Date From</label>
                    <datepicker v-model="dateFrom.valueDate"></datepicker>
                </div>
                <div class="mb-2 form-group d-flex">
                    <label class="p-2">Date To</label>
                    <datepicker v-model="dateTo.valueDate"></datepicker>
                </div>
                <button type="submit" :disabled="selectedArea.wilayah === '' ||dateFrom.valueDate === '' || dateTo.valueDate === '' " class="btn btn-primary">View</button>
            </form>
        </div>

        <div class="card-contend-chart">
            <apexchart width="800" type="bar" :options="(dataChart.options)" :series="(dataChart.series)"></apexchart>
        </div>
        <div class="card-content-table mt-3">
            <div class="content-table p-2">

                <div v-if="!isShowContent" class="notFilter">Filter Data Terlebih Dahulu</div>
                <table v-if="isShowContent" class="table">
                    <thead>
                        <tr>
                            <th>Brand</th>
                            <th v-for="(items,index) in headingTable" :key="index">{{dataArea[items].label_header}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Roti Tawar</td>
                            <td v-for="(items,index) in headingTable" :key="index">{{ dataArea[items].roti_tawar }}</td>
                        </tr>
                        <tr>
                            <td>Susu Kaleng</td>
                            <td v-for="(items,index) in headingTable" :key="index">{{ dataArea[items].susu_kaleng }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Dashboard',
        props:['dataArea','area','selectedArea','headingTable','isShowContent','dateFrom','dateTo','dataChart'],
        emits:['showContent'],
        
    }
</script>


<style scoped>
    .notFilter{
        display: flex;
        justify-content: center;
    }
    .select-area{
        width: 350px;
    }
    .card-contend-chart{
       box-shadow: 10px 10px 5px 0px rgba(209,193,209,1);
       display: flex; 
       justify-content: center;
    }
    .card-content-table{
        box-shadow: 10px 10px 5px 0px rgba(209,193,209,1);
    }
    .content-table{
        background-color: #ffffff;
    }
</style>