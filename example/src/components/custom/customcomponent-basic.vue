<template>
  <div class="cc" >
    <h4>Custom Input Component</h4>
    <el-input v-bind="$attrs" @input="log"/>
    <el-input v-model="second" />
  </div>
</template>

<script>


export default {
  inheritAttrs: false,
  // props:['modelValue'],
  data () {
    return {
      second:''
    }
  },
  methods:{
    log(v){
      console.log('log', v);
      this.second= v && v.toUpperCase()
    }
  },
  mounted(){
    let v = this.$attrs.modelValue
    this.second = v && v.toUpperCase()
  }
}
</script>

