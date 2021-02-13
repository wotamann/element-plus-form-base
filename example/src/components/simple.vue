<template>

  <v-form-base
    :model= "myModel"
    :schema= "mySchema"
    @update:form-base= "log"
  />    

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
      color:'#BB0022'
    }, 
    mySchema: {
      user:{ comp: 'input', placeholder:'User', clearable:true }, 
      password:{ comp: 'input', placeholder:'Password', showPassword:true }, 
      color: { comp: 'colorPicker' }, 
    }
  }),  
  methods: {
    log   
  }
}
</script>
