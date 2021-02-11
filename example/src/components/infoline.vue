<style scoped>
  #path { margin-bottom: 1px; }
  a { color: #003bb9;}
  pre { font-size: 0.9rem; line-height: 0.9rem; font-weight:500; text-align: left; white-space: pre;}
</style>
<template>
  <el-row type="flex" justify="start">
    <el-col :span=24 >
      <h5 id="path" >
        Inspect code <a
          target="_blank"
          :href="`${url}${path}.vue`"
        >'{{path.replace('/','')}}.vue'</a>
        or watch logged events at console
      </h5>
    </el-col>    
    <el-col :span=12 >
      <h5>Model</h5>
      <pre
        v-text="JSON.stringify(modelValue, replacer, 3)"
      />
    </el-col>    
    <el-col :span=12 >
      <h5>Schema</h5>
      <pre
        v-text="JSON.stringify(schema, replacer, 3)"
      />
    </el-col>    
  </el-row> 
</template>

<script>
const url = 'https://github.com/wotamann/vuetify-form-base/blob/master/example/src/components'
const fileObjectToString = (val) => `${val.name} - (File Object)` 

export default {
  props: ['value', 'model', 'schema', 'editable'],
  data () {
    return {
      url,
      path:this.$route.path
    }
  },
  computed:{
    modelValue(){ return this.model || this.value}
  },
  methods: {
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
