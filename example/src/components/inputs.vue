<style scoped>
  /* <style scoped> with :deep()  or use <style> without scoped */
  #form-base :deep(.form-base .el-input input:hover) {border:1px solid #29ac60c5}
  #form-base :deep(.key-form-base-mini .el-input input ) {background-color: #d5f1e115; color:#29ac60}
  
  /* set align of components in col */
  #form-base.align-component { text-align: start}
  /* set align of components in row as attribut  :row= "{ justify:'start'}"  */
  
  /* set Label */
  #form-base :deep(.form-base){ display:flex!important; flex-direction:row; justify-content:start!important; align-items: center; padding: 0.5rem;   }
  #form-base :deep(.form-base label) { color:#2a87d3; font-size:0.85rem; width:140px; font-weight: 400;text-transform: capitalize;   }
 </style>

<template>
  <v-form-base
    id="form-base" 
    class= "align-component"
    :model= "myModel"
    :schema= "mySchema"
    :col=8
    :row= "{ justify:'start'}"
    :label="({key}) => key + ':' "
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
        large: '',
        medium: '',
        small:'',
        mini:'',
        number: 0,
        textarea:''
    },     
    mySchema: { 
      large: { comp: 'input', placeholder:'Large', size:'large', maxlength:'10', showWordLimit:true }, 
      medium: { comp: 'input', autocomplete:'on', placeholder:'Medium', size:'medium' }, 
      small: { comp: 'input', placeholder:'Small', prefixIcon:'el-icon-search', clearable:true, size:'small' }, 
      mini: {comp: 'input', placeholder:'Mini Green', size:'mini'},            
      
      autocomplete: {comp: 'autocomplete', placeholder:'Autocomplete',  fetchSuggestions, defaultFirstOption:true },
      select: {comp: 'select', placeholder:'Select', options:states, valueKey:'text' },
     
      textarea: { comp: 'input', type:'textarea',  placeholder:'Textarea', autosize:{ minRows: 3, maxRows: 6} }, 
      number: { comp: 'number'}, 
    }
  }),  
  methods: {
    log
  }
}
</script>
