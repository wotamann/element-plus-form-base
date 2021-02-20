<style>
  /* INFO-SCOPED: Don't use '<style scoped>' because scoped CSS is inside a child-component not accessable */
  /* CSS Item --- set all items  */
  #form-base-slot { border: 1px dotted #4e4e4e; padding: 8px; background-color: #ffc40018; }
  #form-base-slot .form-base-slot { margin:0px -4px 4px -4px; padding:8px;  border:1px dotted #999; background-color: rgba(238, 238, 238, 0.685);}
  #form-base-slot h5.slot { width: 98%; padding:4px; font-size: 0.9rem; font-weight: 400; color:#ac8400; background-color: #ffc40036; border: 1px dotted #af8600}
  #form-base-slot h5.small { font-size: 0.75rem!important; }
</style>

<template>
    
    <form class="border-frame" @submit.prevent>
     
      <v-form-base
        id="form-base-slot"
        :model="myModel"
        :schema="mySchema"
        :col=8
        @input:form-base-slot="log"       
        @click:form-base-slot="log"       
      >
      <!-- FORM SLOTS -->
        <template #slot-top-form-base-slot>   
          <h5 class="slot">Top Slot of 'Form'</h5>
        </template>
        <template #slot-bottom-form-base-slot>
          <h5 class="slot">Bottom Slot of 'Form'</h5>  
        </template>
        
      <!-- KEY SLOTS -->
        <!-- TOP of KEY -->
        <template #slot-top-key-form-base-slot-nameSlot="{obj}">          
          <h5 class="slot">Slot Top of Key '{{obj.key}}'</h5>
        </template>
        <!-- ITEM of KEY -->
        <!-- <template #slot-item-key-form-base-slot-nameSlot="{obj}">
          <h5 class="slot">Slot Item replace Key '{{obj.key}}'</h5>
        </template>         -->
        <!-- BOTTOM of KEY -->
        <template #slot-bottom-key-form-base-slot-nameSlot="{obj}">          
          <h5 class="slot">Slot Bottom of Key '{{obj.key}}'</h5>
        </template>
        <template #slot-bottom-key-form-base-slot-colorSlot="{obj, index, id}">
          <h5 class="slot">Slot replaces Bottom with Key '{{obj.key}}'</h5>
        </template>

        <!-- ITEM of KEY -->
        <template #slot-item-key-form-base-slot-emailSlot="{obj, id, index}">
          <h5 class="slot small">
            Slot Item replace key '{{obj.key}}'
            <div>ID: {{id}}</div>
            <div>TabIndex: {{index}}</div>
            <div>Obj:{{obj}}</div>
          </h5>
        </template>
        
      <!-- TYPE SLOTS -->
        <template #slot-top-type-form-base-slot-radio="{obj}">
          <h5 class="slot">
            Slot at Top of Type 'radio' - {{obj.value}}
          </h5>
        </template>
        <template #slot-bottom-type-form-base-slot-checkboxGroup="{obj}">
          <h5 class="slot">
            Slot at Bottom of Type 'checkboxGroup - {{obj.value}}
          </h5>
        </template>
        
      <!-- INJECT SLOTS INTO KEY  -->  
        <!-- INJECT append-->
        <template #slot-inject-append-key-form-base-slot-nameSlot="">
          <i class="el-icon-warning" />
        </template>

        <!-- INJECT append -->
        <template #slot-inject-append-key-form-base-slot-colorSlot="{}" >
          <i class="el-icon-warning" />
        </template>
        
        <!-- TOOLTIP SLOT -->
        <template #slot-tooltip="{obj, tooltip}">
          Tooltip Slot has 
          <br/>
          <strong>{{ tooltip.content }}</strong>
          <br/>
          Value: {{ JSON.stringify(obj.value, replacer, 3) }}
        </template>
        <!-- TOOLTIP SLOT of KEY-->
        <template #slot-tooltip-key-form-base-slot-nameSlot="{obj, tooltip}">
          <h5>{{ tooltip.content }}</h5>
          <br/>
          Key Tooltip '{{obj.key}}'
        </template>

      </v-form-base>

    </form>
    <!-- Stuff  -->    
    <infoline :model="myModel" :schema="mySchema"/>
   
</template>

<script>
import vFormBase from '../formbase/vFormBase.vue'
import Infoline from './infoline.vue'
import log from '../lib.js'


const fileObjectToString = (val) => `${val.name} - (File Object)` 
const options = ['A', 'B', 'C']

export default {
  components: { vFormBase, Infoline },
  data () {
    return {
      myModel: {
        nameSlot: 'Base',
        colorSlot: '#8e484c',
        emailSlot: 'base@mail.com',
        controls: {
          radio: 'A',
          btnS: null,
          btnM: [],
          btnC: [],
          slider:33,                    
          switch: true
        }
      },    
      mySchema: {     
        nameSlot: { comp: 'input', placeholder: 'Name', tooltip:{ content:'Hi you!', effect:'dark'} },
        colorSlot: { comp: 'input', type:'color', placeholder: 'Color' },
        emailSlot: { comp: 'input', type:'email', placeholder: 'Email'  },
        controls: {
          radio: { comp: 'radio', activeText: 'Radio', options, size:'small', border:true, tooltip:'Select one!' },
          btnS: { comp: 'radioButton', options, size:'mini' },
          btnM: { comp: 'checkboxGroupButton', options, multiple: true, tooltip:'Select 1 or more'  },
          btnC: { comp: 'checkboxGroup', options, multiple: true },
          slider: { comp: 'slider',   tooltip: 'Slider'  },
          switch: { comp:'switch', activeText:'Switch'}
        }
      }
    }
  },
  methods: {
    log,
    replacer (key, value) {
      if (typeof value === 'function') {
        return value.toString()
        return '(function)'
      }
      if (Array.isArray(value) && value[0] instanceof File) {
        // map Fileobject to Filename
        return value.map(i => fileObjectToString(i) )
      }
      if (value instanceof File) {
        return fileObjectToString(value)
      }
      return value
    }
  }
}
</script>
