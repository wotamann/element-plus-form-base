<template>
  <h5 v-show="msg">{{msg}}</h5>

  <v-form-base
    id="fb-lazy" 
    :model= "myModel"
    :schema= "mySchema"
    :col= "col"
    @update:fb-lazy="log"
  />
  
  <el-row type="flex" :gutter=20 justify="center">    
    <el-col :span="12" >
      <el-button type="info" @click="clickm">Modify Model</el-button>
    </el-col>
    <el-col :span="12" >
      <el-button type="info" @click="clicks">Modify Schema</el-button>
    </el-col>
  </el-row>

  <infoline :model="myModel" :schema="mySchema"/> 
</template>

<script>

// import vFormBase from '../formbase/vFormBase.vue'
import { defineAsyncComponent } from 'vue'
import Infoline from './infoline.vue'
import log from '../lib.js'

const model1 = { name:'AAA', select:'1', checkbox: ['1'], one:1, two:33}
const model2 = { name:'BBB', select:'2', checkbox: ['2'], one:2, two:66}
const schema1 = { name: 'input', one:'rate', select:{ comp:'select', options:['1','2','3']}, checkbox: { comp:'checkboxGroup', options:['1','2','3'] } } 
const schema2 = { name: 'input', checkbox: { comp:'checkboxGroup', options:['1','2','3','4'] }, two:'slider', select:{ comp:'select', options:['1','2','3']}  }

export default {
  name: 'AsyncLoad',
  components: {
    // # STEP 1) Lazy Loading of 'vFormBase' component here
    vFormBase: defineAsyncComponent ( () => import('../formbase/vFormBase.vue') ),
    Infoline
  },
  data () {
    return {
      msg:'',
      modelFlip:true,
      schemaFlip:true,
      col: {},
      myModel: {},
      mySchema: {}
    }
  },

  async mounted () {
    // # STEP 3) Async Loading of Value
    this.msg ="Loading Model..."
    this.myModel = await this.delay(model1)
    // # STEP 2) Async Loading of Schema
    this.msg ="Loading Schema..."
    this.mySchema = await this.delay(schema1)
    // # STEP 4) Async Loading of Grid
    this.msg ="Loading Grid..."
    this.col = await this.delay({
      span:12, 
    })
    this.msg =""
  },

  methods: {
    clickm(){
      this.modelFlip =!this.modelFlip      
      this.myModel = this.modelFlip ? model1 : model2   
    },
    clicks(){
      this.schemaFlip =!this.schemaFlip      
      this.mySchema = this.schemaFlip ? schema1 : schema2       
    },
    log,
    delay (obj) { 
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(obj), 1200)
      })
    }
  }
}
</script>
