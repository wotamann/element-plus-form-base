<style scoped>
  #form-base :deep(.red .el-card) { background-color: rgb(252, 175, 137)}
  #form-base :deep(.blue .el-card) { background-color: #bfdbf5}
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
        names:{                  
          nameA:'Name A',
          nameB:'Name B'
        },
        switches:{
          switchA:true,
          switchB:false
        }
      },     
      mySchema: {
        names:{ 
          comp:'group', 
          col:16,
          class:'red',
          header:'Names',
          bodyStyle:{padding:'12px', backgroundColor:'#fdc'},
          schema:{
            nameA: { comp: 'input', placeholder:'A', col:12 }, 
            nameB: { comp: 'input', placeholder:'B', col:12 }
          }
        },
        switches:{ 
          comp:'group',
          col:8, 
          class:'blue',
          header:'Switches',
          schema:{
            switchA: { comp: 'switch', activeText:'A' }, 
            switchB: { comp: 'switch', activeText:'B' }
          }
        },
      }
  }),  
  methods: {
    log
  }
}
</script>
