<style scoped>
  #form-base1  { background-color: #dfffd3; padding:8px; margin:12px}
  #form-base2  { background-color: #f7d4ce; padding:8px; margin:12px; width:50%}
  #form-base1 :deep(.form-base1){ display:flex!important; flex-direction:column;  padding: 0.5rem;   }
  #form-base2 :deep(.form-base2){ display:flex!important; flex-direction:column;  padding: 0.5rem;   }
  #form-base1 :deep(.form-base1 label) { color:#41a51d; font-size:1rem; width:80px;    }
  #form-base2 :deep(.form-base2 label) { color:#bb3922; font-size:1rem; width:80px;    }
</style>

<template>
  <h4>Form-Base with Model</h4>
  <v-form-base
    id="form-base1" 
    :model="myModel"
    :schema="mySchema"
    col=8
    @update:form-base="log"
  />    
  <h4>Form-Base with partial Model</h4>
  <v-form-base
    id="form-base2" 
    :model="myModel.controls"
    :schema="mySchema.controls"
    col=24
    @update:form-base="log"
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
        name: 'Base',
        controls:{
          checkbox: true,
          switch:false,
          slider: 50
        }
      },     
      mySchema: {
        controls:{
          checkbox: { comp: 'checkbox', label:'Checkbox' },
          switch: { comp: 'switch', label:'Switch' },        
          slider: { comp: 'slider', label:'Slider' },        
        },
        name: { comp: 'input', placeholder:'Name' }, 
      }                    
  }),  
  methods: {
    log
  }
}
</script>
