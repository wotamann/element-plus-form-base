<style>
  #form-base-icon .custom-icon-1 { font-size: 1rem }
  #form-base-icon .custom-icon-2 { font-size: 1.75rem }
  #form-base-icon .custom-icon-3 { font-size: 2.5rem }
  #form-base-icon .custom-icon-disabled { color:#ccc }
  #form-base-icon .custom-icon-color { color:#d22 }
</style>

<template>

  <v-form-base
    id="form-base-icon" 
    :model="myModel"
    :schema="mySchema"
    :col="{span:24,sm:8 }"
    @update:form-base-icon="log"
  />    

  <infoline :model="myModel" :schema="mySchema"/> 
</template>

<script>

import vFormBase from '../formbase/vFormBase.vue'
import Infoline from './infoline.vue'
import log from '../lib.js'

export default {
  components: { vFormBase, Infoline },
  data: ()=>({
    myModel: {
      btn1:'info',
      btn2:'warn',
      btn3:'err'
    },     
    mySchema: { 
      btn1: { comp: 'button', type:'primary', icon:'el-icon-edit' },
      btn2: {comp: 'button', type:'warning', icon:'custom-icon-2 el-icon-check', text:'Warning'  },
      btn3: {comp: 'button', type:'danger', icon:'custom-icon-3 el-icon-warning', text:'Danger'  },
      icon3: { comp: 'icon', class:'custom-icon-3 custom-icon-color el-icon-delete' },
      icon2: { comp: 'icon', class:'custom-icon-2 custom-icon-disabled el-icon-share' },
      icon1: { comp: 'icon', class:'custom-icon-1 el-icon-edit' },
    }
  }),  
  methods: {
    log
  }
}
</script>
