<template>

  <v-form-base
    :model="myModel"
    :schema="mySchema" 
    @update:form-base="log"
  >
    <!-- Trigger Fileeselection   -->
    <template #slot-inject-trigger-key-form-base-upload>
      <el-button size="small" type="primary">select file</el-button>
    </template>
    <!-- Show Info Tip -->
    <template #slot-inject-tip-key-form-base-upload="{obj}">   
      <div :style="{backgroundColor:'#67C23A', color:'#FFF', padding:'4px'}" class="el-upload__tip">{{obj.schema.tip}}</div>
    </template>

  </v-form-base>

  <infoline :model="myModel" :schema="mySchema"/> 
</template>

<script>

import vFormBase from '../formbase/vFormBase.vue'
import Infoline from './infoline.vue'
import log from '../lib.js'

let fileList = []

export default {
  components: { vFormBase, Infoline },
  data: ()=>({
      myModel: {
        input:'Fileselector',
        upload:null
      },     
      mySchema: {
        drop:{
          comp: 'file',
          schema: { comp:'icon', class:'el-icon-upload2' },
          // accept:' .jpg, .jpeg, .png, .gif',  
          thumbnailMode:true,
          onPreview:log,
          action:'', //https://192.168.0.137:8080/api/',
          autoUpload:false,
          multiple:true,
          drag:true
        },
        file: { 
          comp: 'file',
          schema: 'Select Files',
          action:'', // https://192.168.0.137:8080/api/',
          autoUpload:false,
          multiple:true,
          onPreview:(file) => console.log(file),
          onRemove:(file, fileList) => console.log(file, fileList),
          fileList,
          listType:'picture',
          // getVal:((v,o,m,s) => s.file.accept + '!')
          // onChange: (f,fl)=>  console.log('inline sel-upload',f, fl),
          // :file-list="fileList"
        }, 
        upload: { 
          comp: 'file',
          action:'',
          autoUpload:false,
          text:'Upload Selector',
          accept:' .jpg, .jpeg, .png, .gif',          
          tip:'Only Images',
          schema:{ comp:'button', type:'success', size:'large', text:'Upload', iconRight:'el-icon-upload2' }
          // onChange: (f,fl)=>  console.log('inline sel-upload',f, fl),
          // :file-list="fileList"
        }, 
      }                    
  }),  
  methods: {
    log,
   
  }
}
</script>
