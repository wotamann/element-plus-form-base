##  Information:

Element-Plus-Form-Base is an adaptation of Vuetify-Form-Base to the framework Element-Plus. Since Vuetify is not currently available for VUE 3.0, you can therefore alternatively use Element-Plus-Form-Base with Vue 3.0 applications. Element-Plus-Form-base is currently under development.


# Element-Plus-Form-Base


Imagine you get Data as JS-Object and you have to create an editable Form.

```javascript
Model: {
	name: 'Stoner',
	position: 'Admin',
	tasks: [
		{ 
		  done: true,
		  task: 'make refactoring' 
		},
		{ 
		  done: false,
		  task: 'write documentation'  
		},
		{ 
		  done: true,
		  task: 'remove logs'  
		}        
	]        
}
```

Normally you have to flatten the Data-Structure and map all to an appropriate Format. Then you have to define a HTML-Form and animate it with your Data. 

With **Element-Plus-Form-Base** create a Schema Object with the same Structure as your Data.

```javascript
Schema: {
	name: { comp:'text', label:'Name' },
	position: { comp:'text', label:'Position' },
	tasks: { 
		comp: 'array',
		col:24,
		schema: { 
			done:{ comp:'checkbox', col:4}, 
			title:{ comp:'text', col:20 }
		} 
	}
}  
```

and you will get a working Form. 

![Form](./images/array-schema.PNG)

If you have to generate Forms or you have to edit Data presented as JSON- or JS-Objects, then take a closer look at **Element-Plus-Form-Base** and try it. It can make your work much easier and save your time. This Form Generator works as [Vue.js 3.0 Component](https://vuejs.org/) and can simplify your Work by automatically creating Forms, based on your Schema-Definition. 

Furthermore if you don't define a Schema, then **Element-Plus-Form-Base** tries to generate a schema automatically. This works if the Data Values are of Type 'string', 'number' or 'bool'.

**Element-Plus-Form-Base** uses the Desktop UI Library [Element-Plus ](https://element-plus.org/#/en-US/) to style and layout your Form. This Controls have a clear, minimalistic design and support responsive Design. If necessary add specific layouts by using the implemented Element-Plus [Layout System](https://element-plus.org/#/en-US/component/layout/).

---
## Demo

Clone or download this Project, change current directory to **./Element-Plus-Form-Base/example**  and then run

`npm install`

`npm run dev`

or 

Copy this HTML File and set the correct path to `element-plus-form-base.umd.js` File 
```HTML
<html>
  <head>
    <title>ElementPlus FormBase CDN</title>
    
    <meta charset="UTF-8" />
	  <meta name="viewport" content="width=device-width,initial-scale=1.0"> 
	  <!-- import VUE -->
    <script src="https://unpkg.com/vue@next"></script>
    <!-- import CSS -->
    <link rel="stylesheet" href="https://unpkg.com/element-plus/lib/theme-chalk/index.css">
    <!-- import JavaScript -->
    <script src="https://unpkg.com/element-plus/lib/index.full.js"></script>
	  <!-- import element-Plus-Form-Base -->
    <script src="[### SET PATH TO UMD FILE ###]/element-plus-form-base.umd.js"></script>
	<style>
	#form-base .form-base { padding:6px; background-color: #def; }
   </style>
  </head>
  
  <body>
    
	<div id="app">
	  <el-container>
		<el-main>
		  <h4>Element-plus-Form-Base</h4>
			  <div>
				<formbase 
				  :model="model" 
				  :schema="schema" 
				  :col="{span:24, sm:12, md:8 }" 
				  @update:form-base="log" 
				/>
				</div>	
			
		  <h4>Model</h4>
				<span>{{model}}</span>
		  <h4>Schema</h4>
		  <span>{{schema}}</span>
		  <h4>Update Events in Console</h4>
		  
		  <p>Trigger:{{logvalue.trigger}}</p>
		  <p>from Key:{{logvalue.key}}</p>
		  <p>with Value:{{logvalue.value}}</p>
		  <p>Current:{{logvalue.obj}}</p>
		  <p>{{logvalue}}</p>
		</el-main>
	  </el-container>
    </div>
	
    <script>
      const App = {
        components:{ formbase },
        data:() => ({
		  logvalue:{},
          model: {
            name:'',
            date:null,				
            radio:'B',
			checkbox:['A'],
			select:['C'],
            color:'#0A2'				
          },
          schema:{
            name:{ comp:'input', placeholder:'Textfield...', clearable:true },
            date:{ comp:'datePicker' },
            radio:{ comp:'radio', options:['A','B','C'] },
            checkbox:{ comp:'checkboxGroupButton', options:['A','B','C'] },
            select:{ comp:'select', options:['A','B','C'], multiple:true },
            color:{ comp:'colorPicker' }
          }
        }),
        methods:{
          log(v){
			this.logvalue = v
            console.log('Key:',v.obj.key,'Value:', ' - - - ',v.value, v)
          }
        }
      };
      const app = Vue.createApp(App);
      app.use(ElementPlus).mount("#app");
    </script>
  </body>
</html>
```


---


# Further Doc will follow...
