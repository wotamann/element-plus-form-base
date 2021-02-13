<style scoped>
  /* <style scoped> with :deep()  or use <style> without scoped */
  #form-base :deep(.form-base) {  padding:4px}  
 </style>

<template>
  <v-form-base
    :model= "myModel"
    :schema= "mySchema"
    :col=6
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
      button1:'',
      button2:'Check',
      button3:'Icons',
      button4:'L4',
      button5:'L5',
      button6:'L6 ',
      button7:'L7',
      button8:'L8',
      buttonLabel:'Model-Label',                 
      control:{
        button1: 0,
        button2:'C-L2',
        button3:'C-L3',
        button4:'C-L4',
        buttonLabel:'Model-Control-Label'
      }
    },     
    mySchema: { 
      button1: { comp: 'button' }, //#no text#
      button2: { comp: 'button', icon:'el-icon-check'}, //#no text#
      button3: { comp: 'button', icon:'el-icon-check', text:'Icons', iconRight:'el-icon-delete'}, 
      button4: { comp: 'button', text:'Button 4' }, 
      button5: { comp: 'button', text:'Button 5', valueKey:(v, o, m, s)=> m.buttonLabel }, 
      button6: { comp: 'button', textKey:() => 'Button 6 Fn()' }, 
      button7: { comp: 'button', textKey:'control.buttonLabel', valueKey:'buttonLabel' }, // point to model path/prop model.control.buttonLabel
      button8: { comp: 'button', icon:'el-icon-check', valueKey:'button2' }, //#no text#
      control:{
        button1: { comp: 'button', size:'mini', type:'primary', textKey:'control.button1', valueKey:(v, o, m, s)=> v+2  }, 
        button2: { comp: 'button', size:'medium', type:'warning', icon:'el-icon-check', plain:true, text:'Medium Plain' }, 
        button3: { comp: 'button', size:'large', type:'danger', icon:'el-icon-check', iconRight:'el-icon-delete' }, 
        button4: { comp: 'button', size:'large', type:'success', round:true, iconRight:'el-icon-check',text:'Round'  }, 
      }
    }
  }),  
  methods: {
    log
  }
}
</script>
