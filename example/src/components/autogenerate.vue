<style scoped>
/* CSS #form-base -> App.vue */
  #form-base :deep(.form-base input:hover) { border: 2px solid #a815d4;}
  #form-base :deep(.form-base ) { padding: 4px}
  
</style>
<template>

  <v-form-base
    :model="myModel"
    :col=8
    @update:form-base="log"
  />

  <infoline :model="myModel" :schema="{}"/>
</template>

<script>

import vFormBase from '../formbase/vFormBase.vue'
import Infoline from './infoline.vue'
import log from '../lib.js'


export default {
  name: 'AutogenerateSchema',
  components: { vFormBase, Infoline },
  data () {
    return {
      myModel: {
        person: {
          name: {
            prename:'Samuel',         
            surname: 'Stoner',
            nickname:'Sam'
          },          
          email: 'stoner@mail.com',          
          age:37,
          id:'ID2021'         
        },  
        todo: [
          {done: true, name: 'Jobs', work:'code'},
          {done: false, name: 'Taleb', work:'read'},
          {done: true, name: 'Musk', work:'work'},
        ]
      },
    }    
  },
  methods: {
    log
  }
}
</script>
