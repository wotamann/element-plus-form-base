<style scoped>
  /* <style scoped> with :deep()  or use <style> without scoped */
  #form-base-inp :deep(.type-form-base-inp-input .el-input:hover) {border:1px solid #29ac60c5}
  
  /* set align of components in col */
  #form-base-inp.align-component { text-align: start}
  /* set align of components in row as attribut  :row= "{ justify:'start'}"  */
  
  #form-base-inp :deep(.form-base-inp){ display:flex!important; flex-direction:column; justify-content:first baseline!important; align-items: start; padding: 0.5rem;   }
  #form-base-inp :deep(.form-base-inp label) { color:#29ac60c5; font-weight: 500; width:140px; text-transform: capitalize;   }
 </style>

<template>
  <v-form-base
    id="form-base-inp" 
    class= "align-component"
    :model= "myModel"
    :schema= "mySchema"
    :col=14
    :label="({key}) => key + ':' "
    @update:form-base-inp="log"
  />    
  
  <infoline :model="myModel" :schema="mySchema"/> 
</template>

<script>

import vFormBase from '../formbase/vFormBase.vue'
import Infoline from './infoline.vue'
import log from '../lib.js'

export default {
  name:'inputs',
  components: { vFormBase, Infoline },
  data: ()=>({
    myModel: {                  
        color:'#22CC66',
        datetime: null,
    },     
    mySchema: { 
      time: { comp: 'timePicker', placeholder:'Select time' }, 
      date: { comp: 'datePicker', placeholder:'Select date'}, 
      datetime: { comp: 'datePicker', type:'datetime', placeholder:'Select date and time'}, 
      color: { comp: 'colorPicker' }, 
     }
  }),  
  methods: {
    log
  }
}
</script>
