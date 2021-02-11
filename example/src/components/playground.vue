<style>
  #form-base { border: 1px solid #008}
</style>

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
import states from '../assets/states.js'

const fetchSuggestions = (search, cb) => cb( states.filter( ({text}) => text?.toUpperCase()?.includes(search?.toUpperCase())).map( i => ({ value: `[${i.value}] ${i.text}` }))) 

const select = [{label:'Anton', value:'A',  }, {label:'Berta', name:'B', value:'2' }, {label:'Cäsar', name:'C',value:'3'}]
const options = [{label:'A', name:'Anton', border:false }, {label:'B', name:'Berta' }, {label:'C', name:'Cäsar'}]

export default {
  components: { vFormBase, Infoline },
  data: ()=>({
    options,
      row:{ gutter:0, justify:'start', type:'flex' },
      myModel: {
        rate:3,
        color:'#f22',
        name: 'Base',
        number:56,
        password: 'abcdefgh',
        controls:{
          select:{
            select:['Berta'], 
            auto:'al',
          }          
        }
      },     
      mySchema: {
        rate: { comp:'rate'},
        color: { comp:'colorPicker'},
        name: { comp: 'input', label:'name', col:{ span:8, xs: { span:10, offset:2}, class:'hidden-sm-and-down'  }, clearable:true, tooltip:'Bitte den Namen', maxlength:10, showWordLimit:true }, 
        number: { comp: 'number', col:{ span:8 }, clearable:true, tooltip:{ effect:'light', content:'Please give me an Number', placement:'bottom'} }, 
        password: {comp: 'input', type:'text', showPassword:true, col:{ span:8 }, maxlength:10, showWordLimit:true },            
        controls:{
          select:{
            select: {comp: 'select', options:select, valueKey:'label', multiple:true, filterable:true, allowCreate:true, col:{ span:4 } },
            auto: {comp: 'autocomplete', fetchSuggestions, col:{ span:4 } },
          }
        }      
      }
  }),  
  methods: {
    log
  }
}
</script>
