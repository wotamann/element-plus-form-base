<style scoped>
  :deep(.red .el-card) { background-color: #ec0d0d34;}
  :deep(.blue .el-card) { background-color: #1680e442;}
  :deep(.green .el-card) { background-color: #15c73b4b;}
</style>
<template>

  <v-form-base
    id="form-base" 
    class="center"
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

export default {
  name:'inputs',
  components: { vFormBase, Infoline },
  data: ()=>({
      myModel: { 
        nameA:'Name A',
        nameB:'Name B',
        switchA:true,
        switchB:true
      },     
      mySchema: {
        names:{ 
          comp:'wrap', 
          col:12,
          class:'red',
          header:'Names',
          shadow:'hover',
          schema:{
            nameA: { comp: 'input', placeholder:'A', col:12 }, 
            nameB: { comp: 'input', placeholder:'B', col:12 }
          }
        },
        switches:{ 
          comp:'wrap',
          col:12, 
          class:'blue',
          header:'Switches',
          shadow:'hover',
          schema:{
            switchA: { comp: 'switch', activeText:'Switch A' }, 
            switchB: { comp: 'switch', activeText:'Switch B' }
          }
        },
        allTogether:{ 
          comp:'wrap',
          col:{ span:18, offset:3 }, 
          class:'green',
          header:'All Together',
          bodyStyle:{ backgroundColor: '#dfd'},
          schema:{
            nameA: { comp: 'input', placeholder:'A', col:6 }, 
            switchA: { comp: 'switch', activeText:'Switch A', col:4 }, 
            nameB: { comp: 'input', placeholder:'B', col:6 },
            switchB: { comp: 'switch', activeText:'Switch B', col:4 }
          },
        },
      }
  }),  
  methods: {
    log
  }
}
</script>
