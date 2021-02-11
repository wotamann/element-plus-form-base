
<style scoped>
  /* play aorund with CSS selectors for component, type, properties or keys in your model  */

  #form-base :deep(.key-form-base-tasks)  {background-color:#5eb9ee21}
  /* 
  #form-base :deep(.key-form-base-tasks:hover)  {border:2px solid  #34a9ec}
  #form-base :deep(.key-form-base-tasks-0-tasksIn:hover)  {border:2px solid #28f04a}
  */
  
  #form-base :deep(.prop-tasksIn)  {background-color: #5eb9ee4b}
  /* 
  #form-base :deep(.prop-tasksIn:hover)  {border:2px solid #fc8805}
  #form-base :deep(.prop-title .el-input:hover)  {border:2px solid #dab200} 
  */
  #form-base :deep(.form-base) { padding:4px}
  #form-base :deep(.comp-checkbox:hover)  {border:2px solid #0050fc} 
  #form-base :deep(.type-form-base-tasks-0-checkbox:hover)  {border:2px solid #00b1a8; background-color:#c4fffc23 ;} 
  #form-base :deep(.key-form-base-tasks-1-tasksIn-1-in:hover )  {border:2px solid #c52424; background-color:#f8dede5e;}
  
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

//#region Helper
const getRandomBool = () => Math.random() >= 0.5
const getRandomInt = () => Math.floor(Math.random() * 1000)
const getInnerTask= () => { 
  return { 
    in: getRandomBool(), 
    title: '2. Level -' + getRandomInt() 
  }
}
const getOuterTask= () => { 
  return { 
    out: getRandomBool(), 
    title: '1. Level -' + getRandomInt(), 
    tasksIn:[
      {...getInnerTask()},
      {...getInnerTask()}
    ] 
  } 
}
//#endregion

export default {
  name: 'nestedArrays',
  components: { vFormBase, Infoline },
  data () {
    return {      
      myModel: {
        title:'Ground Level',
        ground:true,
        tasks:[
          getOuterTask(),
          getOuterTask(),
        ]        
      },
      mySchema: {
        ground: { comp: 'checkbox', text:'Ground', col:4 },
        title: { comp: 'input', placeholder:'Ground', col:20 }, 
        tasks: {
          comp: 'array',
          col:24,
          schema: {
            out: { comp: 'checkbox', text:'1.Level', col:3 },
            title: { comp: 'input', col:7 },
            tasksIn: {
              comp: 'array',
              col:12,
              schema: {
                in: { comp: 'checkbox', text:'2.Level', col:5  },
                title: { comp: 'input', col:16 }
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
      this.myModel.tasks.push(getOuterTask())
      this.myModel.tasks[0].tasksIn.push(getInnerTask())
      // this.myModel.objectList.push({ line: 4, name: 'Satoshi' })
    }
  }
}
</script>
