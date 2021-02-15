<template>
  
  <p>For proper work register <a href="https://vuejs.org/v2/guide/components-registration.html#Global-Registration">Custom-Control Components</a> globally in 'main.js'Vue.component('custom-object'</p>
 
  <v-form-base
    :model= "myModel"
    :schema= "mySchema"
    :col=12
    @update:form-base= "log"
  />    

  <infoline :model="myModel" :schema="mySchema"/>
</template>

<script>
// import custombasic from './custom/customcomponent-basic.vue'
import vFormBase from '../formbase/vFormBase.vue'
import Infoline from './infoline.vue'
import log from '../lib.js'

export default {
  name:'CustomComponents',
  components: { vFormBase, Infoline },
  
/* IMPORTANT !!!

  // You have to register your Custom-Control Component globally in 'main.js'
  // See: https://vuejs.org/v2/guide/components-registration.html
  
  // main.js
  Vue.component('customBasic', () => import('@/components/customcomponent-basic.vue') )
  Vue.component('custom-object', () => import('@/components/customcomponent-object.vue') )
  Vue.component('custom-extern', () => import('@/components/customcomponent-extern.vue') )
  Vue.component('custom-color', () => import('@/components/customcomponent-color.vue') )
  
  // type:'customBasic' splits to custom-basic 
  // Case-sensitive attribute names don't work with v-bind 
  // https://github.com/vuejs/vue/issues/4212
*/

  data () {
    return {
      myModel: {
        custom1: 'Textfield',
        custom2: '#FF0011',
        // custom2: { a:'#FFBBBB', b:'#DDEEFF' },
        // custom2: { a:'A-Textfield', b:'B-Textfield' },
        // custom4: { date:'10/10/2019' },
      },
      mySchema: {
        custom1: { comp:'custombasic', map:'custom', clearable:true },
        custom2: { comp: 'customcolor', map:'custom' },
        // custom2: { comp: 'custom-object', map:'custom', label:'Object - Component' },
        // custom4: { comp: 'custom-extern', map:'custom', label:'Extern - Component', class:'ma-3 pa-4 grey lighten-3 caption' },
      }
    }
  },
  methods: {
    log    
  }
}
</script>
