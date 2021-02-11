<template>

  <v-form-base
    :model="myModel"
    :schema="mySchema"
    @update:form-base="log"
  />    
  
  <infoline :model="myModel" :schema="mySchema"/> 
</template>

<script>

import vFormBase from '../formbase/vFormBase.vue'
import Infoline from './infoline.vue'
import log from '../lib.js'

export default {
  name:'modifyvalues',
  components: { vFormBase, Infoline },
  data: ()=>({
      myModel: {          
          textUp: 'Upper',
          textLow: 'Lower',
          textJoin: ''
      },     
      mySchema: { 
          textUp: { 
            comp: 'input', 
            placeholder:'Upper Field',
            getVal: v => v && v?.toUpperCase(), 
            clearable:true,  
          }, 
          textLow: { 
            comp: 'input', 
            placeholder:'Lower Field',
            getVal: v => v && v?.toLowerCase(), 
            clearable:true 
          }, 
          textJoin: { 
            comp: 'input', 
            placeholder:'Join & Flip Case Field',
            getVal:(value, obj, model, schema) => model.textUp.toLowerCase() + model.textLow.toUpperCase() 
          }, 
      }
  }),  
  methods: {
    log
  }
}
</script>
