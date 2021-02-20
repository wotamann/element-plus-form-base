<template>
  <v-form-base
    :model="myModel"
    :schema="mySchema"
    col=12
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
        name: 'Stoner',
        position: 'Admin',
        tasks: [
          { 
            done: true,
            title: 'make refactoring' 
          },
          { 
            done: false,
            title: 'write documentation'  
          },
          { 
            done: true,
            title: 'remove logs'  
          }        
        ]        
      },     
      mySchema: {
        name: { comp:'input', label:'Name' },
        position: { comp:'input', label:'Position' },
        tasks: { 
          comp: 'array',
          col:24,
          schema: { 
            done:{ comp:'checkbox', col:2}, 
            title:{ comp:'input', clearable:true, col:22 }
          } 
        }
      }                    
  }),  
  methods: {
    log
  }
}
</script>
