
<template>
  <div :style="style" >
    <h4>Color Component</h4>
    <el-color-picker v-bind="$attrs" @change="log"/>
  </div>
</template>

<script>

export default {
  inheritAttrs: false,
  emits:['input'],
  // props:['modelValue'],
  data () {
    return {
      style:{}
    }
  },
  methods:{
    log(v){
      console.log('log', v, this.s);
      this.style= {'padding':'6px','backgroundColor':v + '25'}
      
    }
  },
  mounted(){
    // let v = this.$attrs.modelValue
  }
}
</script>
