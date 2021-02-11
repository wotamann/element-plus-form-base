<style scoped>
   /* <style scoped> with :deep()  or use <style> without scoped */

  /* CSS #form-base -> App.vue */
  #form-base :deep(.form-base label) { text-transform: capitalize; color: #0e6ce7; user-select:none;}
  #form-base :deep(.form-base label::before) { content: "Label "; }
  #form-base :deep(.form-base label::after) { content: ":"; }

  #form-base :deep(input) { margin: 0.3rem 0 0.3rem;}
  #form-base :deep(.key-form-base-password input:hover) { border: 2px solid #0e6ce7c2;}

</style>

<template>

  <v-form-base
    :model= "myModel"
    :schema= "mySchema"
    :label= true
    @update:form-base= "log"
  />    
  <!-- 
    --- SET LABEL --- 
    1)
    Attr:
    :label= "({key}) => `Label ${key}:`"
    or
    2)
    CSS: 
    #form-base :deep(.form-base label::before) { content: "Label "; }
    #form-base :deep(.form-base label::after) { content: ":"; }
    Attr:
    :label= true 
  -->

  <infoline :model="myModel" :schema="mySchema"/>
</template>

<script>

import vFormBase from '../formbase/vFormBase.vue'
import Infoline from './infoline.vue'
import log from '../lib.js'

export default {
  name:'simple',
  components: { vFormBase, Infoline },
  data: ()=>({
    myModel: {
      user:'Jobs',
      password:'12345678',
      date:''
    }, 
    mySchema: {
      user:{ comp: 'input', placeholder:'User', clearable:true }, 
      password:{ comp: 'input', placeholder:'Password', showPassword:true }, 
      date: { comp: 'datePicker', placeholder:'Select Date' }, 
    }
  }),  
  methods: {
    log   
  }
}
</script>
