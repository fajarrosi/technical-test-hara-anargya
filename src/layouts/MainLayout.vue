<script setup>
import AppSidebar from '../components/AppSidebar.vue';
</script>

<template>
  <div class="w-full h-full relative">
    <div class="fixed top-0 bottom-0 w-[281px] shadow-sm bg-white z-10">
      <app-sidebar />
    </div>
    <div class="bg-layout pl-[281px] relative min-h-screen z-0">
      <div class="pt-[26px] pl-9 pb-[13px] shadow-sm bg-white">
        <div class="font-semibold text-[17px] text-black-300">Conversion</div>
      </div>
      <router-view class="pt-[30px] px-9"/>
    </div>
  </div>
</template>



