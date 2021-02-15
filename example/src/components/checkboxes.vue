<style >
  /* INFO-SCOPED: Don't use '<style scoped>' because scoped CSS is inside a child-component not accessable */
  #form-base-check .form-base-check { margin:0px -6px 6px -6px; padding:10px;  border:1px dotted #999; background-color: #eee;}
  
  /* Button Colored */
  #form-base-check .key-form-base-check-checkboxBtn2 .el-checkbox-button__inner { background-color: #cacaca2a!important;color: #6d6d6d; border:0px!important}
  #form-base-check .key-form-base-check-checkboxBtn2 .el-checkbox-button__inner:hover { background-color: #1dff0917!important;color: #00a824; border:0px!important}
  #form-base-check .key-form-base-check-checkboxBtn2 .is-checked .el-checkbox-button__inner { background-color: #1eff093d!important;color: #00a824!important; border:0px!important}
  
</style>

<template>

  <v-form-base
    id="form-base-check"
    :model="myModel"
    :schema="mySchema"
    :col=8
    @update:form-base-check="log"       
  />

  <!-- Stuff  -->    
  <infoline :model="myModel" :schema="mySchema"/>
</template>

<script>
import vFormBase from '../formbase/vFormBase.vue'
import Infoline from './infoline.vue'
import log from '../lib.js'


const options = ['A', 'B', 'C']
const optionsObj = [
  { name: 'Musk', label:'Label 1', id: '1' }, 
  { name: 'Taleb', label:'Label 2', id: '2' },
  { name: 'Harari', label:'Label 3', id: '3', disabled:true },
  // { name: 'Satoshi', label:'Label 4', id: '4', disabled:true }
]

export default {
  components: { vFormBase, Infoline },
  data () {
    return {
      myModel: {
        checkbox1: null,
        checkbox2: 'Yes',
        checkbox3: true,

        checkboxBorder1:true,
        checkboxBorder2:false,
        checkboxBorder3:true,
        
        checkboxBtn1: true,
        checkboxBtn2: 'Green',
        checkboxBtn3: true,

        checkboxGroup:['Label 1'],
        checkboxGroupBtn1:['B'],
        checkboxGroupBtn2:['2','3']
      },    
      mySchema: {     
        checkbox1: { comp: 'checkbox', text:'Checkbox' },
        checkbox2: { comp: 'checkbox', text:'Yes/No', trueLabel:'Yes', falseLabel:'No' },
        checkbox3: { comp: 'checkbox', text:'Indeterminate', indeterminate: true, textKey:(o, m) => 'Fn:' + m.checkbox2 },
      
        checkboxBorder1: { comp: 'checkbox', text:'Mini', size:'mini', border:true },
        checkboxBorder2: { comp: 'checkbox', text:'Small', size:'small', border:true },
        checkboxBorder3: { comp: 'checkbox', text:'Medium', size:'medium', border:true },
        
        checkboxBtn1: { comp: 'checkboxButton', text:'Button', textKey:(o) => o.value ? 'Active' : 'Inactive'  },
        checkboxBtn2: { comp: 'checkboxButton', trueLabel:'Green', falseLabel:'Grey', textKey:'checkboxBtn2'   },
        checkboxBtn3: { comp: 'checkboxButton', text:'Disabled', disabled:true },
        
        checkboxGroup: { comp: 'checkboxGroup',  options: optionsObj, labelKey:'label'},
        checkboxGroupBtn1: { comp: 'checkboxGroupButton',  options, textColor:'#D00', fill:'#FCC'},
        checkboxGroupBtn2: { comp: 'checkboxGroupButton', options:optionsObj, valueKey:'id', labelKey:'name',textColor:'#FFF', fill:'#090' },       
      }
    }
  },
  methods: {
    log      
  }
}
</script>
