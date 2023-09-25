<script setup>
import Sidebar from '../components/Sidebar.vue';
</script>

<template>
  <div class="w-full h-full relative">
    <div class="fixed top-0 bottom-0 w-[281px] shadow-sm bg-white z-10">
      <sidebar />
    </div>
    <div class="bg-layout pl-[281px] relative min-h-screen z-0">
      <router-view />
    </div>
  </div>
</template>



