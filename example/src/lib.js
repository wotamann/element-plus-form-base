export default (eventOrValue) => {
  
  if(eventOrValue.target) return console.log('### NATIVE EVENT ###', eventOrValue)

  let { trigger:{on, event, emit}, id, key, value, params, obj, data, schema, index } = eventOrValue

  console.log(`-- FORM-BASE-EVENT ------------------------------------------------`)
  console.log(`Component'${obj.schema.comp}' with Key '${key}' at Path '${id}' send Event '${on}' emitted as '${emit}' with Value`, value)
  // console.log(`key:${key}`)
  // console.log(`value:`, value)
  console.log('object:', obj)
  console.log('model:', data)
  console.log('schema:', schema)

  if (params) console.log(`params:`, params)
  if (parent) console.log('parent:', parent)
  if (event) console.log('event:', event)
  if (index) console.log('index:', index)
  console.log(`-------------------------------------------------------------------`)
 
  return eventOrValue
}
