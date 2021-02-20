<style>
  #form-base { border:1px solid #177cdb; background-color:#56a5f025; padding: 0.66rem; margin-bottom:0.66rem ;}
  #form-base .form-base { margin-bottom: 4px;}
  #form-base label { color:#00519c; font-weight: 400; font-size: 0.75rem;   }
  .select-none { user-select: none;}
  .right { float: right; }
</style>

<template>
  <el-container>

    <el-header>
      <span class="header-title"><i class="el-icon-menu"/> Model based Form-Generator</span>
      <span class="header-title right">{{title}}</span>
    </el-header>

    <el-container>

       <el-aside width="290px">
        <el-menu
          mode="vertical"
          class="el-menu-vertical-demo"
          :collapse="collapse"
          collapse-transition
        >          
          <el-menu-item 
            class="dock-right"
            v-for="item in $router.options.routes.slice(1)"
            :key="item.name"
            @click="goto(item)"
          > 
            <i class="el-icon-setting"/>
            <template #title><span  class="select-none">{{item.text}}</span></template>            
          </el-menu-item>  
        </el-menu>
      </el-aside>

      <el-main>
        <router-view />
      </el-main>
    
    </el-container>

  </el-container>
</template>

<script>
export default {  
  data () {
    return {
      collapse:false,
      title:''
    }
  }, 
  methods:{
    isCurrentPageClass(item){ 
      return this.$router.currentRoute.name === item.name ? 'blue lighten-5 blue--text' : null 
    },
    goto(item){
      // this.collapse =  true 
      this.title = item.title
      if (!this.isCurrentPageClass(item) ) this.$router.push(item.name)
    }
  },
  mounted() {
    this.goto(this.$router.options.routes[1])
  },
}
</script>

<style>
  h5 { padding:0.4rem; color:#ffffff; background-color: #46a8ff; margin:0.1rem; font-weight: 500; }
  
  /* #app { font-family: Avenir, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-align: center; color: #555; font-weight: 500;} */
  #app { font-family: Avenir, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;  color: #555; font-weight: 500;}

  .el-header {background-color: #46a8ff; padding: 8px!important; max-height: 2.2rem;}
  .header-title { color:#ffffff; background-color: #46a8ff;}
  ul li.el-menu-item { height: 36px; line-height: 36px; width:100%}
  .el-menu-item.dock-right { float: left;}
  
  .el-popper {font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; }
  
  .el-input {width: 100%; }
  .el-number {width: 100%; }
  .el-select {width: 100%; }
  .el-autocomplete {width: 100%; }
  .el-button {width: 100%; }
  /* .el-row { border: 1px #d6c2a6 dotted; padding: 2px; } */
  /* .el-col { border: 1px #a2b2e7 dotted; padding: 2px; } */
  .small { font-size: 0.75rem;}
</style>