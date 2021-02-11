<template>
  <v-form-base
    id="form-base" 
    :model="myModel"
    :schema="mySchema"
    :col="{span:8}"
    @update:form-base="log"
    @dragstart:form-base="log"
    @drop:form-base="log"
  />    
  <infoline :model="myModel" :schema="mySchema"/>
 
</template>

<script>

import vFormBase from '../formbase/vFormBase.vue'
import Infoline from './infoline.vue'
import log from '../lib.js'

// destruct value and must return a (modified) value
const addDragValue = ( {value, obj}) => `${obj.value} + ${value}`

export default {
  name: 'DragDrop',
  components: { vFormBase, Infoline },
  data () {
    return {
      myModel: {
        name1: 'Drag Only',
        name2: 'Drop Only with Copy',
        name3: 'Drag & Drop with Copy',
        name4: 'Drop with Action',
        name5: 'Drop Only but no +Action',
        name6: 'No Drag, No Drop',
      },     

      // Schema-Order defines Order of Controls in Form    
      mySchema: {
        name1: { comp:'input', drag:true, class:'red lighten-5' },                 
        name2: { comp:'input', drop:({value}) => value, class:'green lighten-5' },                 
        name3: { comp:'input', drag:true, drop:({value}) => value,  class:'yellow lighten-5' },                 
        name4: { comp:'input', drag:false, drop:addDragValue,  class:'green lighten-5' },                 
        name6: { comp:'input', class:'grey lighten-3'  },                 
        name5: { comp:'input', drop:true, class:'green lighten-5'  },                 
      }
    }
  },
  methods: {
    log,    
    dragstart( val ){
      // console.log('DRAGSTART VALUE #', val.value);
      console.log('-----------------------------');
      console.log('DRAGSTART EVENT #', val);
      console.log('-----------------------------');
    },
    drop( val ){
      // console.log('DROP VALUE #', val.value);
      // console.log('DROP - DRAGSTART EVENT #', val.obj.dragEvent);
      console.log('-----------------------------');
      console.log('DROP EVENT #', val);
      console.log('-----------------------------');
    }    
  }
}
</script>
