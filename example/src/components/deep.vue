<style>
  /* INFO-SCOPED: don't use '<style scoped>' because scoped CSS is inside a child-component not accessable */
  
  /* CSS for property from myModel object */
  #form-base-nested .form-base-nested { margin:0px -6px 6px -6px; padding:10px;  border:1px dotted #999; background-color: #eee;}
 
  #form-base-nested .prop-switch  {  border: dotted 1px #cf0520; background-color: #f5cfd4; }
  #form-base-nested .prop-checkbox  { border: dotted 1px #1a54d1;  background-color: #b7c9f0; }
  #form-base-nested .prop-checkboxArray  { border: dotted 1px #0738a1; background-color: #7c9fec; }
</style>

<template>
  <v-form-base
    id="form-base-nested" 
    class= "align-component"
    :model= "myModel"
    :schema= "mySchema"
    :row= "{ justify:'start'}"
    :col=8
    @update:form-base-nested="log"
  />    
  
  <infoline :model="myModel" :schema="mySchema"/> 
</template>

<script>

import vFormBase from '../formbase/vFormBase.vue'
import Infoline from './infoline.vue'
import log from '../lib.js'

export default {
  components: { vFormBase, Infoline },
  data () {
    return {
      myModel: {
        base: true,
        controls: {
          switch: [
            true,
            false
          ],
          checkbox: [
            false,
            true,
            [
              true,
              false
            ],
            { checkboxArray: [
              'checked',
              null
            ] }
          ]
        }
      },
      mySchema: {
        base: { comp: 'switch', activeText: 'Base' },
        controls: {
          // array
          switch: [
            { comp: 'switch', activeText:'Switch 1' },
            { comp: 'switch', inactiveText:'Off', activeText:'Switch 2', trueLabel:'Yes', falseLabel:'No'  }
          ],
          checkbox: [
            { comp: 'checkbox', text:'A' },
            { comp: 'checkbox', text:'B' },
            // nested array
            [
              { comp: 'checkbox', text: 'C-A' },
              { comp: 'checkbox', text: 'C-B (Yes/No)', trueLabel:'Yes', falseLabel:'No' }
            ],
            { checkboxArray: [
              { comp: 'checkbox', text: 'D-A', value: 'checked' },
              { comp: 'checkbox', text: 'D-B', value: 'checked' }
            ]
            }
          ]
        }
      }
    }
  },
  methods: {
    log
  }
}
</script>
