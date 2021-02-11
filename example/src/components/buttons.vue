<style scoped>
  /* <style scoped> with :deep()  or use <style> without scoped */
  #form-base :deep(.form-base) {  padding:4px}
  
  /* #form-base :deep(.form-base){ display:flex!important; flex-direction:row; justify-content:start!important; align-items: center; padding: 0.5rem;   } */
 </style>

<template>
  <v-form-base
    :model= "myModel"
    :schema= "mySchema"
    :col=6
    @update:form-base="log"
  />

  <infoline :model="myModel" :schema="mySchema"/> 
</template>

<script>

import vFormBase from '../formbase/vFormBase.vue'
import Infoline from './infoline.vue'
import log from '../lib.js'
import states from '../assets/states.js'

const fetchSuggestions = (search, cb) => cb( states.filter( ({text}) => text?.toUpperCase()?.includes(search?.toUpperCase())).map( i => ({ value: `[${i.value}] ${i.text}` }))) 

export default {
  name:'inputs',
  components: { vFormBase, Infoline },
  data: ()=>({
    myModel: { 
        buttonLabel:'Model-Label',                 
        button1:'mini-1',
        button2:'medium-2',
        button3:'large-3',
        button4:'round-4',
        control:{
          button5: 0,
          button6:'ctrl-btn-6',
          button7:'ctrl-btn-7',
          button8:'ctrl-btn-8',
        }
    },     
    mySchema: { 
      button1: { comp: 'button', size:'mini', type:'primary', text:'Mini' }, 
      button2: { comp: 'button', size:'medium', type:'warning', text:'Medium' }, 
      button3: { comp: 'button', size:'large', type:'danger', text:'Large' }, 
      button4: { comp: 'button', size:'large', type:'success', round:true, text:'Round'  }, 
      control:{
        button5: { comp: 'button', getVal:(v)=> v + 1 }, 
        // 
        button6: { comp: 'button', valueKey:'control.button6' }, 
        button7: { comp: 'button', valueKey:'control.button7', getVal:(v)=> v + ' #' }, 
        button8: { comp: 'button', valueKey:'buttonLabel' }, 
      }
    }
  }),  
  methods: {
    log
  }
}
</script>
