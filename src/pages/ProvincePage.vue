<script setup>
import city from '@/assets/js/city.js'
import province from '@/assets/js/province.js'
import { computed,ref } from 'vue';

const idProvince = ref('')
const idCity = ref('')

/**
 * fungsi yang menerima id provinsi dan mengembalikan daftar kota berdasarkan id provinsi tersebut
 */
const getCityBasedProvince = computed(() => {
  return idProvince.value ? city.filter(el=> el.provinsi_id == idProvince.value) : city
})

/**
 * fungsi untuk mengembalikan nama provinsi berdasakrkan id kota
 */
const getProvinceBasedCity = computed(() => {
  if(idCity.value){
    const idprov = city.find(el=> el.id == idCity.value)
    return province.filter(el=> el.id == idprov.provinsi_id)[0].name
  }else {
    return null
  }
})

const columns = ref([
  { label : 'ID'},
  { label : 'City'},
])
const columnsProvinsi = ref([
  { label : 'ID',sort:''},
  { label : 'Province',sort:''},
])

const show = ref('Daftar Provinsi')
const methodSort = ref({})

/**
 * fungsi untuk meng assign method sort data province
 */
const onSort = column => {
  columnsProvinsi.value.map(el => {
    if(el.label == column.label){
      if(column.sort == '') {
        el.sort = 'up'
      }else if (column.sort == "up"){
        el.sort = 'down'
      }else {
        el.sort = ''
      }
    }else {
      el.sort = ''
    }
  })
  methodSort.value = column
}

/**
 * fungsi untuk mengurutkan array provinsi berdasarkan id & nama provinsi (asc/desc)
 */
const sortProvince = computed(()=> {
  if(Object.keys(methodSort.value).length > 0){ // is method exist
    if(methodSort.value.sort == 'up'){ //ascending
      if (methodSort.value.label == 'ID') { //sort ID

        return [...province].sort((a,b) => a.id - b.id)
      } else { // sort Name
        return [...province].sort((a,b) => {
          const provA = a.name.toUpperCase(); // ignore upper and lowercase
          const provB = b.name.toUpperCase(); // ignore upper and lowercase
          if (provA < provB) {
            return -1;
          }
          if (provA > provB) {
            return 1;
          }

          // names must be equal
          return 0;
        })
      }
    }else if(methodSort.value.sort == 'down'){ //descending
      if (methodSort.value.label == 'ID') { //sort ID
        return [...province].sort((a,b) => a.id - b.id).reverse()
      } else { // sort Name
        return [...province].sort((a,b) => {
          const provA = a.name.toUpperCase(); // ignore upper and lowercase
          const provB = b.name.toUpperCase(); // ignore upper and lowercase
          if (provA < provB) {
            return -1;
          }
          if (provA > provB) {
            return 1;
          }

          // names must be equal
          return 0;
        }).reverse()
      }

    }else { //normal
      return province
    }
  }
  return province
})



</script>
<template>
  <div class="py-[30px] px-9">
    <div class="flex gap-x-2 mb-3 justify-center">
      <div class="font-medium text-lg cursor-pointer underline hover:bg-blue-50 p-4 inline-flex rounded-lg" 
      :class="show == 'Daftar Kota' ? 'text-black-300' : 'text-blue-700'" 
      @click="show = 'Daftar Kota'">Daftar Kota</div>
      <div class="font-medium text-lg cursor-pointer underline hover:bg-blue-50 p-4 inline-flex rounded-lg"
      :class="show == 'Daftar Provinsi' ? 'text-black-300' : 'text-blue-700'" 
      @click="show = 'Daftar Provinsi'">Daftar Provinsi</div>
    </div>
    <div v-show="show == 'Daftar Kota'">
      <div class="text-bold text-black-300 text-lg text-center">Daftar Kota Berdasarkan Id Provinsi</div>
      <div class="flex flex-col justify-center items-center">
        <select v-model="idProvince" class="p-6">
          <option disabled value="">Please select one</option>
          <option v-for="(prov,index) in province" :key="index" :value="prov.id"> {{ prov.name }}</option>
        </select>
        <div class="mt-6">
          <table class="w-[200px] table-auto">
            <thead class="bg-[#FAFBFC] shadow-sm">
              <tr>
                <th v-for="(column,index) in columns" :key="index"
                class="font-semibold text-xs text-[#7C7C7C] py-[18px]">{{ column.label }}</th>
              </tr>
            </thead>
            <tbody>
            <tr v-for="(row,index) in getCityBasedProvince" :key="index" class="shadow-sm text-xs">
              <td class="text-center bg-white py-[18px] text-content-table px-4"> {{ row.id }}</td>
              <td class="text-center bg-white py-[18px] text-content-table px-4"> {{ row.name }}</td>
            </tr>
          </tbody>
          </table>
        </div>
      </div>
    </div>
    <div v-show="show == 'Daftar Provinsi'">
      <div class="text-bold text-black-300 text-lg text-center">Nama Provinsi Berdasarkan Id Kota</div>
      <div class="flex flex-col justify-center items-center">
        <select v-model="idCity" class="p-6">
          <option disabled value="">Please select one</option>
          <option v-for="(cit,index) in city" :key="index" :value="cit.id"> {{ cit.name }}</option>
        </select>
  
        <table class="w-full border-separate border border-slate-400 mt-6">
          <tbody>
            <tr>
              <td class="text-center py-[18px] text-content-table bg-[#FAFBFC] w-[100px]"> 
                Nama Provinsi
              </td>
              <td class="text-center bg-white py-[18px] text-content-table"> {{ getProvinceBasedCity }}</td>
            </tr>
          </tbody>
        </table>

        <div class="text-bold text-black-300 text-lg text-center mt-4">Daftar Provinsi</div>
          <table class="w-[200px] table-auto mt-4">
              <thead class="bg-[#FAFBFC] shadow-sm">
                <tr>
                  <th v-for="(column,index) in columnsProvinsi" :key="index"
                  class="font-semibold text-xs text-[#7C7C7C] py-[18px] cursor-pointer px-4" @click="onSort(column)">
                    <div class="flex gap-x-2 justify-center items-center">
                      <div class="text"> {{ column.label }}</div>
                      <Icon icon="iconamoon:arrow-up-2" class="text-xl" v-if="column.sort == 'up'"/>
                      <Icon icon="iconamoon:arrow-down-2" class="text-xl" v-else-if="column.sort == 'down'"/>
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(row,index) in sortProvince" :key="index" class="shadow-sm text-xs">
                  <td class="text-center bg-white py-[18px] text-content-table px-4"> {{ row.id }}</td>
                  <td class="text-center bg-white py-[18px] text-content-table px-4"> {{ row.name }}</td>
                </tr>
              </tbody>
          </table>
      </div>
    </div>
  </div>
</template>