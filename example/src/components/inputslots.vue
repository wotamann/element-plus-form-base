<style scoped>
  #form-base :deep(.slot) { color:#df5d29; margin-top: 0.75rem;}
  /* style label */
  #form-base :deep(.type-form-base-input){ display:flex!important; flex-direction:row; justify-content:first baseline!important; align-items: center; padding: 0.5rem; }
  #form-base :deep(.type-form-base-input label) { color:#e9490a; font-weight: 400; width:120px; }
  
  /* el-popper outside of form-base */
  .orange { color:#e9490a; font-weight: 600; }
  .drop-container { border-bottom: 1px solid #dddddd;}
</style>

<template>
   
    <v-form-base
      :model="myModel" 
      :schema="mySchema"
      :col=24 
      @update:form-base="log"
    >
      
      <!-- INJECT prepend into name -->
      <template #slot-inject-prepend-key-form-base-name="{obj}" >
        <el-button icon="el-icon-search">Pre</el-button>
      </template>
      <!-- INJECT append into name -->
      <template #slot-inject-append-key-form-base-name="{model}" >
        <span  class="orange">Append User: '{{model.user}}'</span>
      </template>
      
      <!-- INJECT prefix into user-->
      <template #slot-inject-prefix-key-form-base-user="{obj}" >
        <div class="slot">#</div>
      </template>
      <!-- INJECT suffix into user -->
      <template #slot-inject-suffix-key-form-base-user="{obj}" >
        <i class="el-icon-edit el-input__icon" @click="log"></i>
      </template>

      <!-- INJECT default for Autocomplete Dropdown Data -->      
      <template #slot-inject-default-key-form-base-autocomplete="{item}">
        <div class="drop-container">
          <span>({{item?.value}})</span> &nbsp;<span class="orange">{{item?.text}}</span>          
        </div>
      </template>

    </v-form-base>

  <infoline :model="myModel" :schema="mySchema"/> 
</template>

<script>

import vFormBase from '../formbase/vFormBase.vue'
import Infoline from './infoline.vue'
import log from '../lib.js'
import states from '../assets/states.js'

const fetchSuggestions = (search, cb) => { 
  // async / remote
  setTimeout(() => cb( states.filter( ({text}) => text?.toUpperCase()?.includes(search?.toUpperCase())) ), 666 )
}

export default {
  components: { vFormBase, Infoline },
  data: ()=>({
    myModel: {
      name: '',
      user: 'Steve'
    },     
    mySchema: {
      name: { comp: 'input', type:'text', placeholder:'Name'  }, 
      user: { comp: 'input', type:'text', placeholder:'User', label:'User-Label' },
      autocomplete: {comp: 'autocomplete', placeholder:'States', valueKey:'text', fetchSuggestions, defaultFirstOption:true },
    }                    
  }),  
  methods: {
    log
  }
}
</script>
