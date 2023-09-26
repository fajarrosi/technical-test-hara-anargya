<script setup>
import { ref } from 'vue'
import { getIcon } from '@/methods/GeneralMethods';

const menus = ref([
  { label: 'Dashboard', icon:'dashboard' },
  { label: 'Overview', icon:'overview' },
  { label: 'Province', icon:'overview' },
])

</script>

<template>
  <div class="flex flex-col gap-y-8 ml-9 mr-[11px] mt-8">
    <div class="font-extrabold text-3xl text-black-100">heylink.</div>
    <div class="flex flex-col ml-[5px]">
      <div class="py-[13px] pl-2 rounded-lg flex gap-x-[10px] cursor-pointer hover:bg-btn-active" 
      v-for="(menu,index) in menus" :key="index" 
      :class="$route.name == menu.label ? 'bg-btn-active' : ''"
      @click="$router.push({ name : menu.label})">
        <img :src="getIcon(menu.icon)" alt="dashboard-icon">
        <div class="font-normal text-sm text-black-200">{{ menu.label }}</div>
      </div>
    </div>
  </div>
</template>