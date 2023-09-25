<script setup>
import { getIcon } from '@/methods/GeneralMethods';
import { ref } from 'vue'
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

const rows = ref([
  { id:1,user: 'User A',date:'17/02/2023',email:'email0',job:'job0',country:'country0',action:'act0'},
  { id:1,user: 'User B',date:'17/02/2023',email:'email0',job:'job0',country:'country0',action:'act0'},
  { id:1,user: 'User C',date:'17/02/2023',email:'email0',job:'job0',country:'country0',action:'act0'},
])
const columns2 = ref([
  { label : 'Date Of Birth'},
  { label : 'Job'},
  { label : 'Country'},
])

const rows2 = ref([
  { label:'Date Of Birth',value:'value0'},
  { label:'value',value:'value0'},
  { label:'Country',value:'value0'},
])

const show = ref(true)
const openDetail = row => {
  show.value = true
  console.log('row',row)
}

const getImage = name => {
  return new URL(`../assets/${name}`, import.meta.url).href
}
</script>

<template>
  <div class="flex flex-col gap-y-[31px] pt-[30px] px-9">
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
        <tbody>
          <tr v-for="(row,index) in rows" :key="index" class="shadow-sm text-xs">
            <td class="text-center bg-white py-[18px] text-content-table"> {{ index + 1 }}</td>
            <td class="text-center bg-white py-[18px] "> 
              <div class="flex gap-x-2 items-center justify-center">
                <img :src="getImage('test.png')" class="rounded-full w-6 h-6">
                <div class="font-medium text-black-300">
                  {{ row.user }}
                </div>
              </div>
            </td>
            <td class="text-center bg-white py-[18px] text-content-table"> {{ row.date }}</td>
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

  <div class="fixed top-0 bottom-0 left-0 right-0 z-20 bg-dialog p-6 flex items-center justify-center" :class="show ? '' : 'hidden'">
    <Transition name="bounce">
      <div class="bg-white rounded shadow-sm card" v-if="show">
        <div class="flex justify-end pr-2 pt-3">
          <Icon icon="material-symbols:close" class="cursor-pointer font-medium text-red-500" @click.stop="show = false"/>
        </div>
        <div class="gap-x-8 px-9 py-[26px]">
          <div class="flex mb-8">
            <img :src="getImage('test.png')" class="rounded-full w-[150px] h-[150px]">
            <div class="flex flex-col text-black-300 items-center">
              <div class="font-medium text-[40px]">Nama User</div>
              <div class="font-medium text-xl">user@gmaill.com</div>
              <div class="font-medium text-xl">08123456789</div>
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
      </div>
    </Transition>
  </div>
</template>

<style>
.bg-dialog {
  background: rgba(217, 217, 217, 0.50);
}
</style>