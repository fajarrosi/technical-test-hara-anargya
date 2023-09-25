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
</script>

<template>
  <div class="flex flex-col gap-y-[31px]">
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
            <td class="text-center bg-white py-[18px] font-medium text-black-300"> {{ row.user }}</td>
            <td class="text-center bg-white py-[18px] text-content-table"> {{ row.date }}</td>
            <td class="text-center bg-white py-[18px] font-medium text-black-300"> {{ row.email }}</td>
            <td class="text-center bg-white py-[18px] text-content-table"> {{ row.job }}</td>
            <td class="text-center bg-white py-[18px] font-medium text-black-300"> {{ row.country }}</td>
            <td class="text-center bg-white py-[18px]"> 
              <div class="rounded bg-white shadow-sm text-black-300 inline-flex py-1 px-4 font-medium cursor-pointer hover:bg-icon-card">View Detail</div>
            </td>
            
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>