<script setup>
import { getIcon } from '@/methods/GeneralMethods';
import { ref,onMounted } from 'vue'
import AppDialog from '../components/AppDialog.vue';
import dayjs from 'dayjs'

const cards = ref([
  { status: 'Pending', total:'2.480,30', percentage:'2,15',isincrease:true,date:'Last Month'},
  { status: 'Paid', total:'84.310,0',percentage:'1,10',isincrease:false,date:'Last Month'},
  { status: 'Rejected', total:'12.155,0',percentage:'2,15',isincrease:true,date:'Last Month'}
])

const columns = ref([
  { label : 'ID'},
  { label : 'User'},
  { label : 'Date Of Birth'},
  { label : 'Email'},
  { label : 'Job'},
  { label : 'Country'},
  { label : 'Action'},
])

const rows = ref([])

const loading = ref(false)

const getData = async(url) => {
  try {
    const response = await fetch(url)
    return response.json()
  } catch (error) {
    return error
  }
}

onMounted(()=>{
  loading.value = true
  getData('https://api.slingacademy.com/v1/sample-data/users')
  .then(res=>{
    rows.value = res.users.map(el=> {
      return {
        ...el,
        fullname : el.first_name + el.last_name,
        date_of_birth: dayjs(el.date_of_birth).format('DD/MM/YYYY')
      }
    })
    loading.value = false
  })
  .catch(err=>{
    console.log('err',err)
    loading.value = false
  })
})

const rows2 = ref([])

const show = ref(false)
const dataDetail = ref(null)
const openDetail = row => {
  show.value = true
  dataDetail.value = row
  rows2.value = [
    { label:'Date Of Birth',value:row.date_of_birth},
    { label:'Gender',value:row.gender},
    { label:'Job',value:row.job},
    { label:'Address',value:`${row.street}, ${row.city}, ${row.zipcode}, ${row.state}`},
    { label:'Country',value:row.country},
  ]
}
</script>

<template>
  <div class="flex flex-col gap-y-[31px] py-[30px] px-9">
    <div class="flex gap-x-[23px]">
      <div class="grow rounded-[10px] shadow-sm card" 
      v-for="(card,index) in cards" :key="index">
        <div class="section-satu bg-white p-6">
          <div class="flex justify-between items-center">
            <div class="text-status-card text-xs font-semibold">{{ card.status}}</div>
            <div class="rounded bg-icon-card p-[6px]">
              <img :src="getIcon('status-card')" alt="">
            </div>
          </div>
          <div class="font-semibold text-xl text-black-300">{{card.total.split(',')[0]}}<span class="text-black-50" v-if="card.total.split(',')[1] > 0">,{{card.total.split(',')[1]}}</span></div>
        </div>
        <div class="bg-[#F9FAFC] py-[13px] px-[17px] flex justify-between items-center">
          <div class="flex items-center">
            <img :src="getIcon(card.isincrease ? 'ph_arrow-up-bold' : 'ph_arrow-down-bold')" alt="">
            <div class="font-semibold text-[10px] mx-1" :class="card.isincrease ? 'text-positive' : 'text-negative'"> 
              {{ card.percentage }}%
            </div>
            <div class="font-medium text-[10px] text-[#AAAAAA]"> {{ card.date }}</div>
          </div>
          <div class="text-[#6E6E6E] font-semibold text-[10px] p-2 hover:bg-icon-card hover:rounded cursor-pointer">
            View More
          </div>
        </div>
      </div>
    </div>
    <div class="rounded-[10px] card bg-white">
      <div class="bg-white pt-[25px] pb-[18px] pl-[28px] shadow-sm">
        <div class="font-semibold text-[17px] text-black-300">User List</div>
      </div>
      <table class="w-full table-auto">
        <thead class="bg-[#FAFBFC] shadow-sm">
          <tr>
            <th v-for="(column,index) in columns" :key="index"
            class="font-semibold text-xs text-[#7C7C7C] py-[18px]">{{ column.label }}</th>
          </tr>
        </thead>
        <tbody v-if="loading">
          <tr class="shadow-sm">
            <td class="text-center bg-white py-[18px] font-medium text-black-300" colspan="7">Loading..</td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr v-for="(row,index) in rows" :key="index" class="shadow-sm text-xs">
            <td class="text-center bg-white py-[18px] text-content-table px-4"> {{ row.id }}</td>
            <td class="text-center bg-white py-[18px] "> 
              <div class="flex gap-x-2 items-center">
                <img :src="row.profile_picture" class="rounded-full w-6 h-6">
                <div class="font-medium text-black-300">
                  {{ row.fullname }}
                </div>
              </div>
            </td>
            <td class="text-center bg-white py-[18px] text-content-table"> {{ row.date_of_birth }}</td>
            <td class="text-center bg-white py-[18px] font-medium text-black-300"> {{ row.email }}</td>
            <td class="text-center bg-white py-[18px] text-content-table"> {{ row.job }}</td>
            <td class="text-center bg-white py-[18px] font-medium text-black-300"> {{ row.country }}</td>
            <td class="text-center bg-white py-[18px]"> 
              <div class="rounded bg-white shadow-sm text-black-300 inline-flex py-1 px-4 font-medium cursor-pointer hover:bg-icon-card" @click="openDetail(row)">View Detail</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <AppDialog v-model:show-dialog="show" title-dialog="User Detail">
    <template #default>
      <div class="gap-x-8 px-9 py-[26px]">
          <div class="flex mb-8">
            <img :src="dataDetail.profile_picture" class="rounded-full w-[150px] h-[150px] mr-3">
            <div class="flex flex-col text-black-300 items-center">
              <div class="font-medium text-[40px]">{{dataDetail.fullname}}</div>
              <div class="font-medium text-xl">{{dataDetail.email}}</div>
              <div class="font-medium text-xl">{{dataDetail.phone}}</div>
            </div>
          </div>

          <table class="w-full border-separate border border-slate-400">
            <tbody>
              <tr v-for="(row,index) in rows2" :key="index" class="text-xs">
                <td class="text-center py-[18px] text-content-table bg-[#FAFBFC] w-[100px]"> 
                  {{ row.label }}
                </td>
                <td class="text-center bg-white py-[18px] text-content-table"> {{ row.value }}</td>
              </tr>
            </tbody>
          </table>
        </div>
    </template>
  </AppDialog>
</template>

