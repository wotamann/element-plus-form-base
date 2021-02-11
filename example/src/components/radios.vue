<style>
  /* INFO-SCOPED: Don't use '<style scoped>' because scoped CSS is inside a child-component not accessable */
  /* CSS Item --- set all items  */
  #form-base-radio .form-base-radio { margin:0px -6px 6px -6px; padding:10px;  border:1px dotted #999; background-color: #eee;}
  /* #form-base-radio h5.slot { width: 98%; padding:2px; font-size: 0.9rem; font-weight: 400; color:#0061bd; background-color: #0062bd1e; border: 1px dotted #0061bd}
  #form-base-radio h5.small { font-size: 0.75rem!important; } */
</style>

<template>
     
  <v-form-base
    id="form-base-radio"
    :model="myModel"
    :schema="mySchema"
    :col=8
    @update:form-base-radio="log"       
  />
   
  <!-- Stuff  -->    
  <infoline :model="myModel" :schema="mySchema"/>
  
</template>

<script>
import vFormBase from '../formbase/vFormBase.vue'
import Infoline from './infoline.vue'
import log from '../lib.js'


const optionsStr = ['A', 'B', 'C']
const options = [
  { name: 'Musk', nolabel:'Label 1', novalue: 1, id: 1 }, 
  { name: 'Taleb', nolabel:'Label 2', novalue: 2, id: 4 },
  { name: 'Harari', nolabel:'Label 3', novalue: 3, id: 6, disabled:true },
] 
const optionsLabel = [
  { name: 'Musk', label:'Label 1', novalue: 1, id: 1 }, 
  { name: 'Taleb', label:'Label 2', novalue: 2, id: 4 },
  { name: 'Harari', label:'Label 3', novalue: 3, id: 6, disabled:true },
] 
const optionsValue = [
  { name: 'Musk', nolabel:'Label 1', value: 1, id: 1 }, 
  { name: 'Taleb', nolabel:'Label 2', value: 2, id: 4 },
  { name: 'Harari', nolabel:'Label 3', value: 3, id: 6, disabled:true },
] 
const optionsValueLabel = [
  { name: 'Musk', label:'Label 1', value: 1, id: 1 }, 
  { name: 'Taleb', label:'Label 2', value: 2, id: 4 },
  { name: 'Harari', label:'Label 3', value: 3, id: 6, disabled:true },
] 


export default {
  components: { vFormBase, Infoline },
  data () {
    return {
      myModel: {
        radio: 'A',
        radioBorder:'B',
        radioBtn:'C',
        radioObjLabel1:'Label 1',
        radioObjLabel2:'Taleb',
        radioObjLabel3:'Harari',
        radioObjValue1:1,
        radioObjValue2:2,
        radioObjValue3:3,
        radioObjBorder1:'Label 1',
        radioObjBorder2: 2,
        radioObjBorder3:'Label 3',
        radioObjBtn1: 1,
        radioObjBtn2: 'Taleb',
        radioObjBtn3: 3,
         },    
      mySchema: {     
          radio: { comp: 'radio', options:optionsStr },
          radioBorder: { comp: 'radio', options:optionsStr, size:'mini', border:true },
          radioBtn: { comp: 'radioButton', options:optionsStr },

          radioObjLabel1: { comp: 'radio', options:optionsLabel},
          radioObjLabel2: { comp: 'radio', options:optionsLabel, valueKey:'name', size:'medium', border:true },          
          radioObjLabel3: { comp: 'radio', options:optionsLabel, labelKey:'name'},

          radioObjValue1: { comp: 'radio', options:optionsValue},
          radioObjValue2: { comp: 'radio', options:optionsValue, size:'large', border:true },          
          radioObjValue3: { comp: 'radio', options:optionsValue},

          radioObjBorder1: { comp: 'radio', options, labelKey:'nolabel'},
          radioObjBorder2: { comp: 'radio', options, valueKey:'novalue'},          
          radioObjBorder3: { comp: 'radio', options, valueKey:'nolabel'},
          
          radioObjBtn1: { comp: 'radioButton', options:optionsValueLabel, textColor:'#fff', fill:'#D00' },
          radioObjBtn2: { comp: 'radioButton', options:optionsValueLabel, valueKey:'name', fill:'#0B0' },
          radioObjBtn3: { comp: 'radioButton', options:optionsValueLabel, labelKey:'name'  },
          
          
      }
    }
  },
  methods: {
    log      
  }
}
</script>
