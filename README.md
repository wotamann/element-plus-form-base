# Element-Plus-Form-Base

Imagine you get Data as JS-Object and you have to create an editable Form.

```javascript
Model: {
	name: 'Stoner',
	position: 'Admin',
	tasks: [
		{ 
		  done: true,
		  title: 'make refactoring' 
		},
		{ 
		  done: false,
		  title: 'write documentation'  
		},
		{ 
		  done: true,
		  title: 'remove logs'  
		}        
	]        
}
```

Normally you have to flatten the Data-Structure and map all to an appropriate Format. Then you have to define a HTML-Form and animate it with your Data. 

With **Vuetify-Form-Base** create a Schema Object with the same Structure as your Data.

```javascript
Schema: {
	name: { type:'text', label:'Name' },
	position: { type:'text', label:'Position' },
	tasks: { 
		type: 'array',
		schema: { 
			done:{ type:'checkbox', label:'done', col:3}, 
			title:{ type:'text', col:9 }
		} 
	}
}  
```

and you will get a working Form. 

![Form](./images/array-schema.PNG)

If you have to generate Forms or you have to edit Data presented as JSON- or JS-Objects, then take a closer look at **Vuetify-Form-Base** and try it. It can make your work much easier and save your time. This Form Generator works as [Vue.js 3.0 Component](https://vuejs.org/) and can simplify your Work by automatically creating Forms, based on your Schema-Definition. 

Furthermore if you don't define a Schema, then **Vuetify-Form-Base** tries to generate a schema automatically. This works if the Data Values are of Type 'string', 'number' or 'bool'.

**Vuetify-Form-Base** uses the well known and excellent [Component Framework Vuetify 3.0](https://vuetifyjs.com/) to style and layout your Form. Vuetify Controls have a clear, minimalistic design and support responsive Design. If necessary add specific layouts by using the implemented Vuetify [Grid System](https://vuetifyjs.com/en/components/grids/).

---
## Demo

[Here you can see a Demo with Key-Examples](https://wotamann.github.io/)

or

Clone or download this Project, change current directory to **./vuetify-form-base/example**  and then run

`npm install`

`npm run serve`

or 

Download and open this [HTML-File](https://github.com/wotamann/vuetify-form-base/blob/master/dist/index-cdn.html) in your Browser

or 

Play with [Fiddle](https://jsfiddle.net/wotamann/204z6vpq/13/)

or 

Copy this HTML File with CDN
```HTML
<html>
	<head>
	  <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
	  <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">
	  <link href="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css" rel="stylesheet">
	  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
	</head>	
	<body>
		<div id="app">
		<v-app>
		  <v-main>
			<v-container>
				<v-form-base :col="{cols:12, sm:6, md:3 }" :model="model" :schema="schema" @input="log" />
			</v-container>
		  </v-main>
		</v-app>
		</div>

		<script src="https://cdn.jsdelivr.net/npm/vue@2.x/dist/vue.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.js"></script>
		<script src="https://unpkg.com/vuetify-form-base"></script>
		<script>
		new Vue({
			el: '#app',
			vuetify: new Vuetify(),
			components: { vFormBase },
			data () {
				return {      
				  model: {
					text: 'Base',
					password: 'abcdefgh',
					checkbox:true,
					file: [] // array of File objects
				  },     
				  schema: {
					text: 'text', // shorthand for ->  text: { type:'text', label:'text' }                   
					password: { 
					  type: 'password',
					  clearable: true,
					  solo:true,
					  class:'mx-2 mt-2'
					},			  
					checkbox:'checkbox',
					file: { 
					  type: 'file', 
					  label: 'Images', 
					  showSize:true,
					  counter:true
					}
				  }
				}
			},
			methods:{
				log(v){ 
					console.log(v) 
				}
			}
		})
		</script>
	</body>
</html>
```