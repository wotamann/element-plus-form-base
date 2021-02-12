<style scoped>
  /* 
    INFORMATION - STYLE SCOPED: 
    Don't use '<style scoped>' because scoped CSS is inside a child-component not accessable
    
    or with use ':deep' to pass CSS into child 
    #form-base :deep( .my-class ) { ... }  
  */
    
  /* CSS Component --- Container */
  #form-base-css { background-color: #fff9e6; }
  #form-base-css :deep(input) { background-color: #dbe6f3b9; color:#0043d3b9 }
  #form-base-css :deep(input:hover) { background-color: #57bafcb9; }
  #form-base-css :deep(input:focus) { background-color: #0043d3b9; color:#FFF }

  /* CSS Item --- add CSS to every item in formbase  */
  #form-base-css .item { padding:0.5rem; border: 1px dotted #eedf9b}

  /* CSS Type --- type-component_id-[control-type] */
  #form-base-css .type-form-base-css-checkbox { border-radius: 16px; }
 
   /* CSS Props   prop-[(sub)prop of schema]  */
  #form-base-css .prop-bool { background-color: #f1ede0e0; border:1px solid #f0dc9a }
  #form-base-css .prop-radios { background-color: #e5eff7e0; border:1px solid #f0dc9a }
  #form-base-css .prop-controls { background-color: #f1d3f7e0; border:2px solid #b20ae6 }

  /* CSS Keys     key-component_id-[key inclusive path to key] */
  /*             .key - form-base-css - controls-btn-btn-toggle-multi  */
  #form-base-css .key-form-base-css-controls-btn-btn-toggle-multi  { background-color: #c5e6fd;  }
  #form-base-css .key-form-base-css-name input:hover { background-color: #a805a0b9; color:#FFF }
  #form-base-css .key-form-base-css-controls-bool-checkboxBtn { background-color: #d6eb8cb9; color:#FFF }
  
  /* CSS Keys     set CSS to label on key */
  #form-base-css .key-form-base-css-controls-bool-switch .v-input__slot .v-label{ font-weight:bolder; font-size: 1.2rem; color: rgb(11, 167, 24)!important}

  #form-base-css :deep(.custom-icon-1) { font-size: 1rem }
  #form-base-css :deep(.custom-icon-2) { font-size: 1.75rem }
  #form-base-css :deep(.custom-icon-3) { font-size: 2.5rem }
  #form-base-css :deep(.custom-icon-disabled) { color:#ccc }
  #form-base-css :deep(.custom-icon-color) { color:#d22 }
</style>

<template>

  <v-form-base
    id="form-base-css"
    :model="myModel"
    :schema="mySchema"
    @update:form-base-css="log"
  />    

  <!-- Stuff  -->    
  <infoline :model="myModel" :schema="mySchema"/>
</template>

<script>
import vFormBase from '../formbase/vFormBase.vue'
import Infoline from './infoline.vue'
import log from '../lib.js'


// String
const options = ['A', 'B', 'C']
const optionsObject = [
  { icon: 'format_align_left', value: 1, color:'blue', small:true }, 
  { icon: 'format_align_justify', value: 2, color:'red', medium:true },
  { icon:  'format_align_right', value: 3, color:'green', xLarge:true,  elevation:4, class:'ml-4' }
]
const optionsRadio = [
  { value: 'B', color:'blue', label: 'Blue', offIcon:'add', onIcon:'check' }, 
  { value: 'R', color:'red', label:'Red' },
  { value: 'G', color:'green', label:'Green' },
]

export default {
  components: { vFormBase, Infoline },
  data () {
    return {
      myModel: {        
        name: 'Base',
        password: '123456',
        email: 'base@mail.com',
        controls: {
          bool:{
        //     checkbox: true,
        //     checkboxBtn: false,
        //     ['btn-toggle-single']: [],
        //     ['btn-toggle-multi']: [],          
        //     switch: true,
        //     slider: 33
          },
          btn:{
        //     btn: 'A', // is ident to schema { label:'A', value:'A' }
          },
          iconLabel:null,
          iconValue: 'el-icon-edit',          
          radios: {
        //     radio1: '',
        //     radio2: '',
          }
        }
      },
      mySchema: {
        name: { comp: 'input', placeholder: 'Name', appendIcon: 'more_vert', tooltip: 'Name' },
        prename: { comp: 'input', placeholder: 'Pre Name', appendIcon: 'print', tooltip: 'Name' },
        password: { comp: 'input', type:'text', showPassword:true, placeholder: 'Password',  tooltip: 'Password' },
        email: { comp: 'input', placeholder: 'Email',  spacer: true, tooltip: 'Email' },
        controls: {
          // bool:{
          //   checkbox: { comp: 'checkbox',  tooltip: 'Checkbox' },
          //   checkboxBtn: { comp: 'checkboxBtn',  tooltip: 'Checkbox' },
          //   ['btn-toggle-single']: { comp: 'checkboxGroupBtn', options  },
          //   ['btn-toggle-multi']: { comp: 'checkboxGroup', options },
          //   switch: { comp: 'switch', label: 'Green', color: 'green',  tooltip: 'Switch' },
          //   v-slider doesn't work with col:{ cols='auto' }
          //   slider: { comp: 'slider',  color: 'blue',  tooltip: 'Slider' }
          // },
          // Buttons
          // btn:{
          //   btn: { comp: 'button', getVal:'Test Button', iconRight: 'print', text:'TEST' },          
          // },
          // Icons
          iconLabel: { comp: 'icon', class:'custom-icon-2 custom-icon-color el-icon-edit' },
          // if label undefined use value
          iconValue: { comp: 'icon', class:'custom-icon-2 custom-icon-color'  }, 
          // Radios
          // radios:{
          //   radio1: { comp: 'radio', label: 'Radio', options, row:false, tooltip: 'Radio', col: 2, clickOutside:true },
          //   radio2: { comp: 'radioButton', label: 'Radio', options: optionsRadio, tooltip: 'Color & Multi Radio' },
          // }
        }
      }
    }
  },  
  methods: {
    log
  }
}
</script>
