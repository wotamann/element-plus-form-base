// form-base attributes
export const defaultID = 'form-base'
export const defaultComponent = 'default' // must exist in mapSchemaToElement / mapper.js
export const defaultRow = { gutter:10, justify:'space-between', align:'start' } 
export const defaultCol = { span:6 } // { span:12, sm: 6, md:4, lg:3, xl:2}
export const defaultFormLabel = null
export const defaultTooltip = (content) => ({ content, placement:'bottom', effect:'light', visibleArrow: false })

export const componentTag = 'comp'
export const nullValue = 'nullValue'

// <Label> for <Input> - formbase attr :label=true and schema: { key: { formlabel:'Label' }}
export const formlabelTag = 'label'
export const labelTag = 'label'   
export const valueTag = 'value'
export const innerTag = 'text'
// hook in Proxy set/get Value  - value or Function
export const hookGet = 'getVal' // schema.getVal = val or fn(val, obj) => val
export const hookSet = 'setVal' // schema.setVal = val or fn(val, obj) => val


export const setNoValueOnEvent = 'focus|click|blur|mousedown|mouseleave|mouseover|resize|dragstart|dragover|drop' 

export const defaultSchemaIfValueIsNullOrUndefined = key => ({ [componentTag]:'input', placeholder: key })
export const defaultSchemaIfValueIsString = key => ({ [componentTag]:'input', placeholder: key })
export const defaultSchemaIfValueIsNumber = key => ({ [componentTag]:'number', placeholder: key })
export const defaultSchemaIfValueIsBoolean = key => ({ [componentTag]:'checkbox', placeholder: key })
// export const defaultSchemaIfValueIsBoolean = key => ({ [componentTag]:'switch', activeText: key })

export const mapSchemaToElement ={
    // mapper for each component from schema to intern component 
    // map component: internal component from elements to use 
    // set nullValue - value to present if value is null or undefined / default null
    // maps events - triggerevent: emittedEvent maximal 4 trigger events allowed
    // omit props in v-bind schema - some components (pickers) don't allow some attributes and giva a warning. Here you can omit this props by defining them
    // map element used for option attribute - used with select, autocomplete, radio, checkboxGroup et...  
  
    default:{ component: 'el-input', events:{ input:'update' } },
    
    tag: { component: 'el-tag', events: { 'click': 'update' } },
    tree: { component: 'el-tree', events: { 'nodeClick': 'update', 'checkChange': 'update', 'currentChange': 'update', 'nodeExpand': 'update', 'nodeCollapse': 'update' } },
    
    group:{ component: 'el-card', events:{ input:'update' } },
    wrap:{ component: 'el-card', events:{ input:'update' } },
    array:{ component: 'array', events:{ input:'update'  } },
    
    file:{ component: 'el-upload', events:{ change:'update'  } },
    input:{ component: 'el-input', nullValue: '', events:{ input:'update', clear:'update', dragstart:'dragstart', drop:'drop'  } },
    native:{ component: 'el-input', nullValue: '', events:{ input:'update', click:'update'  } },
    
    number: { component: 'el-input-number', nullValue: 0, events: { change: 'update' } },
    button:{ component: 'el-button', events:{  click:'update' } },
    icon:{ component: 'i', events:{ click:'update' } },
    rate:{ component: 'el-rate', events:{ change:'update' } },
    
    datePicker:{ component: 'el-date-picker', omit:['id','name','comp'], events:{ change:'update' } },
    timePicker:{ component: 'el-time-picker', omit:['id','name','comp'], events:{ change:'update' } },
    timeSelect:{ component: 'el-time-select', omit:['id','name','comp'], events:{ change:'update' } },
    colorPicker: { component:'el-color-picker', omit:['id','name','comp'], events:{ change:'update' } },
    // color: { component:'el-color-picker', events:{ change:'update', change:'update', change:'update' } },

    // switch:{ component: 'el-switch', nullValue: false, events:{ change:'update' } },
    switch:{ component: 'el-switch', events:{ change:'update' } },
    radio:{ component: 'el-radio-group', option:'el-radio', events:{ change:'update' } },
    radioButton:{ component: 'el-radio-group', option:'el-radio-button', events:{ change:'update' } },
    checkbox:{ component: 'el-checkbox', nullValue:false, events:{ change:'update' } },
    checkboxButton:{ component: 'el-checkbox-button', nullValue:false, events:{ change:'update' } },
    checkboxGroup:{ component: 'el-checkbox-group', nullValue: [], option:'el-checkbox', events:{ change:'update' } },
    checkboxGroupButton:{ component: 'el-checkbox-group', nullValue: [], option:'el-checkbox-button', events:{ change:'update' } },
    
    select:{ component: 'el-select', option:'el-option', events:{ change:'update', blur:'update' } },
    autocomplete:{ component: 'el-autocomplete', option:'el-option', events:{ input:'update' } },
    
    slider:{ component: 'el-slider', schema:{ showTooltip:false }, events:{ change:'update' } },
    range:{ component: 'el-slider', events:{ change:'update' } },
    
  }



