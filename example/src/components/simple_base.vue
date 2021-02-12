<style scoped>
 /* password red on hover */
 #form-base :deep(.key-form-base-password input:hover) { color: #f02c0a;}
</style>

<template>
 <!--
      SET LABEL
      Attr: 
      :label = true // use prop keys as label 
      :label = "({key}) => `# ${key} #`"  // use destruct obj { key, value, schema } in function  
      Schema:
      User: { comp: 'input', label:'User'  },  
    -->
  <v-form-base
    :model="myModel"
    :schema="mySchema" 
    col=8
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
        name: 'Steve',
        password: '123456',
        number:50,
      },     
      mySchema: {
        name: { comp: 'input', placeholder:'Name', tooltip:'Name' }, 
        password: { comp: 'input', placeholder:'Password', showPassword:true, clearable:true  }, 
        number: { comp: 'number' }, 
      }                    
  }),  
  methods: {
    log
  }
}
</script>
