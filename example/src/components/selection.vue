<style>
  .el-select-dropdown .enabled  { padding:2px; color:#f17814}
  .el-select-dropdown .disabled  { padding:2px; text-decoration: line-through;}
</style>
<template>

  <v-form-base 
    :model= "myModel"
    :schema= "mySchema"
    :col=8
    :label=true
    @update:form-base="log"
  >
    <!-- Select options slot -->
    <template #slot-option-form-base-selectStateSlot="{item}">
      <span :class="item.disabled ? 'disabled' : 'enabled'">[{{item.value}}] {{item.text}}</span>
    </template>

  </v-form-base>

  <infoline :model="myModel" :schema="mySchema"/> 
</template>

<script>

import vFormBase from '../formbase/vFormBase.vue'
import Infoline from './infoline.vue'
import log from '../lib.js'
import states from '../assets/states.js'

const options = ['Musk', 'Jobs', 'Taleb', 'Harari']
const optionsObject = [{label:'Label A', value:'A'}, {label:'Label B (disabled)', value:'B',  disabled: true}, {label:'Label C', value:'C'}, {label:'Label D', value:'D'}]

export default {
  name: 'Selection',
  components: { vFormBase, Infoline },
  data () {
    return {
      myModel: {
        select: 'Musk',
        selectMulti: ['Jobs'],
        selectMultiTag: ['Taleb', 'Harari'],

        selectObject: 'A',
        selectObjectMultiple:['Label C'],
        selectCreate:'',
        
        selectStateMulti: ['AS'],
        selectStateCreate: ['Alaska'], 
        selectStateSlot: 'Alaska',
      },
      mySchema: {
        select: { comp: 'select', placeholder: 'Select', options },
        selectMulti: { comp: 'select', placeholder: 'Multiple', options, multiple:true, clearable:true },
        selectMultiTag: { comp: 'select', placeholder: 'Select multiple', options, multiple: true, collapseTags:true, },
        
        selectObject: { comp: 'select', placeholder: 'Select from Object', options:optionsObject },
        selectObjectMultiple: { comp: 'select', placeholder: 'Multiple', options:optionsObject, valueKey:'label', multiple: true, collapseTags:true, clearable:true  },
        selectCreate: { comp: 'select', placeholder: 'Create or Select', options:optionsObject,  valueKey:'label', filterable:true, allowCreate:true, defaultFirstOption:true, clearable:true   },
        
        selectStateMulti: { comp: 'select', placeholder: 'Multiple States', multiple:true, labelKey:'text', options:states, filterable:true, clearable:true  },
        selectStateCreate: { comp: 'select', placeholder: 'Create States',  options:states, labelKey:'text', valueKey:'text', multiple: true, collapseTags:true, filterable:true, allowCreate:true, defaultFirstOption:true, clearable:true  },
        selectStateSlot: { comp: 'select', placeholder: 'States', valueKey:'text', options:states, filterable:true },       
      }
    }
  },
  methods: {
    log
  }
}
</script>
