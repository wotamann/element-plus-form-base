<style scoped>
 #form-base  { border: 1px solid #5698e4c9; background-color: #5698e42f; padding:1rem }
 /* style labels */
 #form-base :deep(.type-form-base-native){ display:flex!important; flex-direction:column-reverse;margin-bottom: 0.6rem; }
 #form-base :deep(label) { color:#5698e470; font-weight: 400; font-size: 0.8rem;  }
      

</style>
<template>
  <v-form-base
    :model="myModel"
    :schema="mySchema"
    :col=12      
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
        text: 'Steve',
        number: 17,
        password: '123456',
        range:33,
        button:'Ok Button',
        color: '#56B688'
      },     
      mySchema: {
        text: { comp: 'native', type:'text', placeholder:'Text', label:'Text'}, 
        number: { comp: 'native', type:'number', placeholder:'Number', label:'Number' }, 
        password: { comp: 'native', type:'password', placeholder:'Password', label:'Password' }, 
        range: { comp: 'native', type:'range', placeholder:'Range', label:'Range' }, 
        button: { comp: 'native', type:'Button',label:'Button' }, 
        color: { comp: 'native', type:'Color', label:'Color' }, 
      }                    
  }),  
  methods: {
    log
  }
}
</script>
