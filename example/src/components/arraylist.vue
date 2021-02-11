
<style scoped> 
  #form-base :deep( button:hover) { border: 1px solid e0d20b; background-color: #5daefa69!important; color:#0d4f9b}
  #form-base :deep( .el-card) { color: #227dd1; background-color: #5daefa69!important; color: #0d4f9b; font-weight: 700; font-size: 1.25rem; box-shadow: #becad875 6px 6px; }
</style>

<template>
  <v-form-base
    id="form-base" 
    :model="myModel"
    :schema="mySchema"
    @update:form-base="log"
  />    

  <el-button type="info" @click= "add">Add Item</el-button>

  <infoline :model="myModel" :schema="mySchema"/>  
</template>

<script>

import vFormBase from '../formbase/vFormBase.vue'
import Infoline from './infoline.vue'
import log from '../lib.js'

export default {
  name: 'listArrays',
  components: { vFormBase, Infoline },
  data () {
    return {      
      myModel: {
        stringList: [
          'Jobs',
          'Taleb',
          'Harari'
        ],
        objectList: [
          { line: 1, name: 'Jobs' },
          { line: 2, name: 'Taleb' },
          { line: 3, name: 'Harari' }
        ]
      },
      mySchema: {

        stringListWrapper:{
          comp:'wrap',
          header:'List of Strings',
          col:12,
          schema: {
            stringList: {
              comp: 'array',
              col:24,              
              schema: { 
                item: { comp:'button' } //  prop name must be 'item' 
              }        
            },
          }
        },

        objectListWrapper:{
          comp:'wrap',
          header:'List of Objects',
          col:12,
          schema: {
            objectList: {
              comp: 'array',
              col:24,
              schema: { 
                name: {comp:'button'  }, // list .name and value .name
                // name: {comp:'button', valueKey:'line'  },  // value .line
                // name: {comp:'button',  text:'List Item'}, // static set value
                // name: {comp:'button',  getVal:(v) => v?.toUpperCase() }, // dynamic set value
                
              }        
            }
          }
        }
      }
    }
  },  
  methods: {
    log,
    add(){
      this.myModel.stringList.push('Satoshi')
      this.myModel.objectList.push({ line: 4, name: 'Satoshi' })
    }
  }
}
</script>
