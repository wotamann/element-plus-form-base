<style scoped>
</style>

<template>

  <v-form-base
    :model="myModel"
    :schema="mySchema" 
    col=8
    @update:form-base="log"
  />    

  <infoline :model="myModel" :schema="mySchema"/> 
</template>

<script>

import vFormBase from '../formbase/vFormBase.vue'
import Infoline from './infoline.vue'
import log from '../lib.js'


const data = [{
  id:1,
  label: 'Level one 1',
  children: [{
    id:2,
    label: 'Level two 1-1',
    children: [{
      id:3,
      label: 'Level three 1-1-1'
    }]
  }]
}, {
  id:4,
  label: 'Level one 2',
  children: [{
    id:5,
    label: 'Level two 2-1',
    children: [{
      id:6,
      label: 'Level three 2-1-1'
    }]
  }, {
    id:7,
    label: 'Level two 2-2',
    children: [{
      id:8,
      label: 'Level three 2-2-1'
    }]
  }]
}, {
  id:9,
  label: 'Level one 3',
  children: [{
    id:10,
    label: 'Level two 3-1',
    children: [{
      id:11,
      label: 'Level three 3-1-1'
    }]
  }, {
    id:12,
    label: 'Level two 3-2',
    children: [{
      id:13,
      label: 'Level three 3-2-1'
    }]
  }]
}]

export default {
  components: { vFormBase, Infoline },
  data: ()=>({
      myModel: {
        tree:null,
      },     
      mySchema: {
        tree: { comp: 'tree', data, showCheckbox:true, nodeKey:'id', defaultExpandedKeys:[4, 5], defaultCheckedKeys:[6, 7]  }, 
      }                    
  }),  
  methods: {
    log
  }
}
</script>
