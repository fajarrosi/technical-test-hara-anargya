<script setup>
const props = defineProps({
  showDialog : {
    type:Boolean,
    default: false
  },
  titleDialog:{
    type:String,
  }
})

const emits = defineEmits(['update:showDialog'])

const onCloseDialog = () => {
  emits('update:showDialog',false)
}
</script>

<template>
  <div class="fixed top-0 bottom-0 left-0 right-0 z-20 bg-dialog p-6 flex items-center justify-center" :class="showDialog ? '' : 'hidden'">
    <Transition name="bounce">
      <div class="bg-white rounded shadow-sm card" v-if="showDialog">
        <div class="flex justify-between px-2 pt-3">
          <div class="text-bold text-lg text-black-300">{{ titleDialog }}</div>
          <Icon icon="material-symbols:close" class="cursor-pointer font-medium text-red-500" @click.stop="onCloseDialog"/>
        </div>
        <slot></slot>
      </div>
    </Transition>
  </div>
</template>

<style>
.bg-dialog {
  background: rgba(217, 217, 217, 0.50);
}
</style>