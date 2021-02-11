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

let fileList = null

export default {
  components: { vFormBase, Infoline },
  data: ()=>({
      fileList:null,
      myModel: {
        file:null
      },     
      mySchema: {
        file: { 
          comp: 'file',
          action:'',
          multiple:true,
          accept:' .jpg, .jpeg, .png, .gif',          
          autoUpload:false,
          text:'Image Selector',
          // onChange: (f,fl)=>  console.log('inline sel-upload',f, fl),
          // :file-list="fileList"
        }, 
      }                    
  }),  
  methods: {
    log
  }
}
</script>
