import { createWebHistory, createRouter } from "vue-router";
import playground from "../components/playground.vue";
import simple from "../components/simple.vue";
import inputslots from "../components/inputslots.vue";
import inputs from "../components/inputs.vue";
import buttons from "../components/buttons.vue";
import pickers from "../components/pickers.vue";
import typetext from "../components/typetext.vue";
import selection from "../components/selection.vue";
import linkedformbase from "../components/linkedformbase.vue";
import fileupload from "../components/fileupload.vue";
import modifyvalue from "../components/modifyvalue.vue";
import icons from "../components/icons.vue";
import deep from "../components/deep.vue";
import tree from "../components/tree.vue";
import async from "../components/async.vue";
import autogenerate from "../components/autogenerate.vue";
import dragdrop from "../components/dragdrop.vue";
import radios from "../components/radios.vue";
import checkboxes from "../components/checkboxes.vue";
import css from "../components/css.vue";
import slots from "../components/slots.vue";
import array from "../components/array.vue";
import arraylist from "../components/arraylist.vue";
import group from "../components/group.vue";
import wrap from "../components/wrap.vue";

const routes = [
  { path: '/', redirect: '/simple' },
  { path: '/simple', name: 'simple', component: simple, text:'Simple Inputs', title:'Displaying some Elements-Plus Inputs' }, 
  { path: '/inputs', name: 'inputs', component: inputs, text:'Input Fields', title:'Different Input Fields with Labels' },      
  { path: '/inputslots', name: 'inputslots', component: inputslots, text:'Inputs with Slots', title:'Demonstration of Elements-Plus Inputs enhanced with Slots' }, 
  { path: '/typetext', name: 'typetext', component: typetext, text:'Native Input Types', title:'Input with native HTML-Input Type and presenting Labels ' },      
  { path: '/autogenerate', name: 'autogenerate', component: autogenerate, text:'Autogenerate Schema', title:'Create Form from Model without any Schema-Definition'},      
  { path: '/async', name: 'async', component: async, text:'Lazy Loading', title:'Lazy loading of Schema, Model and at last Grid-Layout' },      
  
  { path: '/selection', name: 'selection', component: selection, text:'Selection', title:'Select Items defined in Schema' },      
  { path: '/radios', name: 'radios', component: radios, text:`Radios & Radio-Buttons`,title:'Play around with Radios & Radio-Buttons'  },    
  { path: '/checkboxes', name: 'checkboxes', component: checkboxes, text:`Checkboxes & Groups`,title:'Play around with Checkboxes & Button-Groups'  },    
  { path: '/array', name: 'array', component: array, text:`Array from Model`,title:'Data in nested Array by using one Schema for all Items'  },      
  { path: '/arraylist', name: 'arraylist', component: arraylist, text:`List from Model`,title:'Select Item in List from Model-Data'  },      
  { path: '/tree', name: 'tree', component: tree, text:`Tree from Model`,title:'Select Item in Tree from Model-Data'  },      
  { path: '/pickers', name: 'pickers', component: pickers, text:'Pickers ', title:'Pickers for Date, Time and Color' },      
  { path: '/buttons', name: 'buttons', component: buttons, text:'Buttons', title:'Play around with Buttons' },      
  { path: '/group', name: 'group', component: group, text:`Group Components`,title:'Grouping components based on model-structure'  },      
  { path: '/wrap', name: 'wrap', component: wrap, text:`Wrap Components`,title:'Wrap components into groups independent from model-structure'  },      
  { path: '/icons', name: 'icons', component: icons, text:'Icons', title:'Set of Icons and Buttons' },      
  { path: '/fileupload', name: 'fileupload', component: fileupload, text:'File Upload', title:'Select and/or upload Files' },      
  { path: '/linkedformbase', name: 'linkedformbase', component: linkedformbase, text:'Link Form-Bases', title:'Link two Element-Form-Base Components' },      
  { path: '/modifyvalue', name: 'modifyvalue', component: modifyvalue, text:'Modify Values', title:'Modify incoming and outgoing values' },      
  { path: '/dragdrop', name: 'dragdrop', component: dragdrop, text:'Drag & Drop', title:'Try to drag and drop your components'},
  { path: '/deep', name: 'deep', component: deep, text:`Deep Model`,title:'Deep nested Model including Arrays and Objects mapped to Form'  },    
  { path: '/css', name: 'css', component: css, text:`CSS, Tooltips & Buttons`,title:'Play around with predefined CSS, Buttons, Icons and Tooltips'  },    
  { path: '/slots', name: 'slots', component: slots, text:`Slots`,title:'Slots for Form, Keys, Items, Types and Tooltips'  },      
  { path: '/playground', name: 'playground', component: playground, text:'Playground', title:'Play and Test Elements-Form-Base' },    
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;