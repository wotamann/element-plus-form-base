<template>
  <el-row :id="id" v-bind="bindRow" type="flex">
    <!-- FORM TOP SLOT -> #slot-top-form-base -->
    <slot :name="getFormTopSlot()" :id="id" />
    <!-- Central Loop of Components -->
    <template v-for="(obj, index) in flatCombinedArraySorted" :key="index">
      <!-- Tooltip -->
      <el-tooltip :disabled="isDisabledTooltip(obj)" v-bind="bindTooltip(obj)">
        <el-col
          v-show="isNotHidden(obj)"
          v-bind="bindCol(obj)"
          :class="getClassName(obj)"
          :draggable="obj.schema.drag"
          @dragstart="dragstart($event, obj)"
          @dragover="dragover($event, obj)"
          @drop="drop($event, obj)"
        >
          <!-- TOP TYPE SLOT -> #slot-top-type-form-base-[comp] -->
          <slot :name="getTypeTopSlot(obj)" v-bind="{ obj, index, id }" />
          <!-- TOP KEY SLOT -> #slot-top-key-form-base-[deep-nested-key-name] -->
          <slot :name="getKeyTopSlot(obj)" v-bind="{ obj, index, id }" />
          <!-- ITEM TYPE SLOT slot replaces complete item of defined TYPE -> #slot-item-type-form-base-[comp] -->
          <slot :name="getTypeItemSlot(obj)" v-bind="{ obj, index, id }">
            <!-- ITEM KEY SLOT slot replaces complete item of defined KEY -> #slot-item-key-form-base-[deep-nested-key-name] -->
            <slot :name="getKeyItemSlot(obj)" v-bind="{ obj, index, id }">
             
  <!-- <span class="small">
    {{getClassName(obj)}}
    {{obj.value}}
    obj:{{model[obj.key]}} 
    <br/>
  </span> -->

              <!-- LABEL -->
              <label
                v-if="hasFormLabel(obj)"
                v-bind="bindFormLabel(obj)"
                for="obj.key"
              >
                {{ getFormLabel(obj, index, id) }}
              </label>

              <!-- ARRAY -->
              <template v-if="isComponent(obj, 'array')">
                <div
                  v-for="(item, idx) in obj.value"
                  :key="getKeyForArray(id, obj, item, idx)"
                  v-bind="bindSchema(obj)"
                >
                  <v-form-base
                    :root="baseId"
                    :id="`${id}-${obj.key}-${idx}`"
                    :model="setItem(item)"
                    :schema="obj.schema.schema"
                    :row="getRowGroupOrArray(obj)"
                    :col="getColGroupOrArray(obj)"
                    :class="`${id}-${obj.key}`"
                    v-bind="$attrs"
                  >
                  </v-form-base>
                </div>
              </template>
              <!-- END ARRAY -->

              <!-- WRAP/GROUP -->
              <template v-else-if="isComponent(obj, 'wrap|group')">
                <component
                  :is="getComponentObject(obj)"
                  v-bind="bindSchema(obj)"
                >
                  <v-form-base
                    :root="baseId"
                    :id="`${id}-${obj.key}`"
                    :model="setValue(obj)"
                    :schema="obj.schema.schema"
                    :row="getRowGroupOrArray(obj)"
                    :col="getColGroupOrArray(obj)"
                    :class="`${id}-${obj.key}`"
                    v-bind="$attrs"
                  >
                    <!-- Based on https://gist.github.com/loilo/73c55ed04917ecf5d682ec70a2a1b8e2 -->
                    <template v-for="s in getInjectedScopedSlots(id, obj)" #[s]="slotData" >
                      <slot :name="getKeyInjectSlot(obj, s)" v-bind="{ id, obj, index, ...slotData }" />
                    </template>
                  </v-form-base>
                </component>
              </template>
              <!-- END WRAP/GROUP -->

              <!-- TREE -->
              <template v-else-if="isComponent(obj, 'tree')">
                <el-tree
                  :data="obj.value"
                  v-bind="bindSchema(obj)"
                  @[getOnEventName(obj,0)]="onEvent(obj, $event, 0, false)"
                  @[getOnEventName(obj,1)]="onEvent(obj, $event, 1, false)"
                />
              </template>
              <!-- END TREE -->

              <!-- UPLOAD -->
              <template v-else-if="isComponent(obj, 'file')">
                <el-upload
                  :on-change="
                    (file, fileList) => onFileEvent(obj, file, fileList)
                  "
                  v-bind="bindSchema(obj)"
                >
                  <el-button size="small" type="primary">{{
                    obj.schema.text || "File Upload"
                  }}</el-button>
                </el-upload>
              </template>
              <!-- END FILE -->

              <!-- ELSE -->
              <component
                v-else
                :is="getComponentObject(obj)"
                :modelValue="getValue(obj)"
                v-bind="bindSchema(obj)"
                @update:modelValue="obj.value = $event"
                @[getOnEventName(obj,0)]="onEvent(obj, $event, 0)"
                @[getOnEventName(obj,1)]="onEvent(obj, $event, 1)"
                @[getOnEventName(obj,2)]="onEvent(obj, $event, 2)"
                @[getOnEventName(obj,3)]="onEvent(obj, $event, 3)"
              >
                <!-- Based on https://gist.github.com/loilo/73c55ed04917ecf5d682ec70a2a1b8e2 -->
                <!-- inject form-base slots into component slots -  ?? work not always with always #[s]="slotData" " -->
                <template v-for="s in getInjectedScopedSlots(id, obj)" #[s]="slotData" >
                  <slot :name="getKeyInjectSlot(obj, s)" v-bind="{ id, obj, index, model, schema, ...slotData }" />
                </template>
                
                <template v-if="isComponent(obj, 'button')">
                  {{ setInnerButtonText(obj) }}
                </template>

                <template v-if="isComponent(obj, 'checkboxButton|checkboxGroupButton|radioButton|tag|input')">
                  {{setInnerTextCheckRadioSwitch(obj)}}
                </template>

                <template v-if="getComponentObject(obj, 'option')">
                  <component :is="getComponentObject(obj, 'option')" v-for="(item, idx) in getOptions(obj)" :key="idx" v-bind="bindOptions(item, obj)" >
                    <slot :name="getOptionSlot(obj)" v-bind="{ obj, id, index, idx, item }">
                      {{ getOptionsValue(item, obj) }}
                    </slot>                    
                  </component>
                </template>

              </component>
            </slot>
          </slot>

          <!-- BOTTOM TYPE SLOT -> #slot-bottom-type-form-base-[comp] -->
          <slot :name="getTypeBottomSlot(obj)" v-bind="{ obj, index, id }" />
          <!-- BOTTOM KEY SLOT -> #slot-bottom-key-form-base-[deep-nested-key-name] -->
          <slot :name="getKeyBottomSlot(obj)" v-bind="{ obj, index, id }" />
        </el-col>

        <!-- TOOLTIP SLOT -->
        <template #content>
          <!-- TOOLTIP KEY SLOT -> #slot-tooltip-key-form-base-keyname -->
          <slot :name="getKeyTooltipSlot(obj)" v-bind="{ obj, index, id, tooltip: bindTooltip(obj) }" >
            <!-- TOOLTIP GENERAL SLOT -> #slot-tooltip -->
            <slot :name="getTooltipSlot(obj)" v-bind="{ obj, index, id, tooltip: bindTooltip(obj) }" >
              {{ bindTooltip(obj).content }}
            </slot>
          </slot>
        </template>

      </el-tooltip>
    </template>

    <!-- FORM BOTTOM SLOT -> #slot-bottom-form-base -->
    <slot :name="getFormBottomSlot()" :id="id" />
  </el-row>
</template>

<script>
//#region Import
import {
  get,
  isPlainObject,
  isFunction,
  isString,
  isNumber,
  isArray,
  isEmpty,
  orderBy,
  omit,
  delay,
} from "lodash";
import {
  defaultComponent,
  defaultID,
  defaultRow,
  defaultCol,
  defaultFormLabel,
  defaultTooltip,
} from "./config.js";
import {
  formlabelTag,
  componentTag,
  valueTag,
  labelTag,
  innerTag,
  hookSet,
  hookGet,
  mapSchemaToElement,
  setNoValueOnEvent,
} from "./config.js";
import {
  defaultSchemaIfValueIsNullOrUndefined,
  defaultSchemaIfValueIsString,
  defaultSchemaIfValueIsNumber,
  defaultSchemaIfValueIsBoolean,
} from "./config.js";
//#endregion

//#region Declaration
const orderDirection = "ASC";
const pathDelimiter = ".";
const classKeyDelimiter = "-";
const onEventDelay = 1; // ms
const dropEffect = "move"; // 'copy, link, move

const topAppendix = "top";
const bottomAppendix = "bottom";
const slotAppendix = "slot";
const tooltipAppendix = "tooltip";
const injectAppendix = "inject";
const itemClassAppendix = "item"; // class obsolet
const typeClassAppendix = "type";
const componentClassAppendix = "comp";
const keyClassAppendix = "key";
const arrayClassAppendix = "array";
const propertyClassAppendix = "prop";

const injectSlotAppendix = `${slotAppendix}-${injectAppendix}`;
const arraySlotAppendix = `${slotAppendix}-${arrayClassAppendix}`;
const topSlotAppendix = `${slotAppendix}-${topAppendix}`;
const itemSlotAppendix = `${slotAppendix}-${itemClassAppendix}`;
const bottomSlotAppendix = `${slotAppendix}-${bottomAppendix}`;
const tooltipSlotAppendix = `${slotAppendix}-${tooltipAppendix}`;
//
//#endregion

export default {
  // works with Vue 3.0
  name: "ElementPlusFormBase",
  //inheritAttrs: false,
  // emits: ['input', 'change', 'clear', 'update', 'click', 'focus', 'blur', 'select'],
  props: {
    root: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: defaultID,
    },
    row: {
      type: [Object],
      default: defaultRow,
    },
    col: {
      type: [Object, Number, String],
      default: defaultCol,
    },
    [formlabelTag]: {
      type: [Object, String, Function, Boolean],
      default: defaultFormLabel,
    },
    model: {
      type: [Object, Array],
      default: () => ({}),
    },
    schema: {
      type: [Object, Array],
      default: () => ({}),
    },
  },
  data() {
    return {
      flatCombinedArray: [],
    };
  },
  computed: {
    baseId() {
      return this.root ? this.root : this.id;
    },
    parent() {
      let p = this;
      if (p.$parent && p.$parent.$parent) {
        while (p.id.startsWith(p.$parent.$parent.id + "-")) {
          p = p.$parent.$parent;
        }
      }
      return p;
    },
    index() {
      const m = this.id && this.id.match(/\d+/g);
      return m ? m.map(Number) : null;
    },
    bindRow() {
      return this.row || defaultRow;
    },
    flatCombinedArraySorted() {
      // order by prop definition in schema or sorting with schema.sort=N
      return orderBy(this.flatCombinedArray, ["schema.sort"], [orderDirection]);
    },
    storeStateData() {
      this.updateArrayFromState(this.model, this.schema);
      return this.model;
    },
    storeStateSchema() {
      this.updateArrayFromState(this.model, this.schema);
      return this.schema;
    },
  },
  watch: {
    schema: {
      handler(newSchema) {
        this.rebuildArrays(this.model, newSchema);
        this.updateArrayFromState(this.model, newSchema);
      },
      deep: true,
    },
    model: {
      handler(newModel) {
        this.rebuildArrays(newModel, this.schema);
        this.updateArrayFromState(newModel, this.schema);
      },
      deep: true,
    },
  },
  methods: {
    //#region GET

    // Values of FILE/BUTTON
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3);
    },

    setInnerTextCheckRadioSwitch(obj){
      // return obj.schema.text
      const text = obj.schema?.text ? obj.schema?.text : null;
      return obj.schema?.textKey ? this.getObjectByPath(this.model, obj.schema?.textKey) : text
    },

    setInnerButtonText(obj) {
      // Set Value @click using function getVal(value, obj, model, schema)
      // button: { comp: 'button', valueKey:'button', getVal:(v)=> v }, 
      // button: { comp: 'button', textKey:'control.button', getVal:(v)=> v }, 
      // button: { comp: 'button', text:'Login' }, 
      // button: { comp: 'button', getVal:(v)=> 'clicked value' }, 
      const text = obj.schema?.text ? obj.schema?.text : null;
      return obj.schema?.valueKey ? this.getObjectByPath(this.model, obj.schema?.valueKey) 
      : obj.schema?.textKey ? this.getObjectByPath(this.model, obj.schema?.textKey) 
      : text ? text 
      : obj.value;
    },
    //#endregion

    //#region IS/HAS/GET COMPONENTS
    isNotHidden(obj){
      return !obj.schema.hidden
    },
    isComponent(obj, test) {
      return test.includes(obj.schema[componentTag]);
    },
    hasSchema(obj, test) {
      return obj.schema[test];
    },
    getComponentObject(obj, prop = "component") {
      let comp = obj.schema[componentTag] || defaultComponent;
      let map = comp
        ? mapSchemaToElement[comp]
          ? mapSchemaToElement[comp]
          : mapSchemaToElement[defaultComponent]
        : mapSchemaToElement[defaultComponent];
      return map[prop]; // get for component in obj the matching prop from mapSchemaToElement in config.js
    },
    //#endregion

    //#region SETVAL, EMITTER & HELPER
    setItem(item) {
      return isString(item) ? { item } : item;
    },
    getValue(obj) {
      const nullValue = this.getComponentObject(obj, "nullValue");
      return obj.value || nullValue;
    },
    setValue(obj) {
      return obj.schema[componentTag] === "wrap" ? this.model : obj.value;
    },
    getOnEventName(obj, index = 0) {
      const prop = "events";
      let events = this.getComponentObject(obj, prop);
      let eventsArray = Object.keys(events);
      // console.warn( 'key', obj.key, 'idx:', index, eventsArray[index] || 'xxx', eventsArray)
      return eventsArray[index] || undefined;
    },
    getEmitName(obj, index = 0) {
      const prop = "events";
      let events = this.getComponentObject(obj, prop);
      let eventsArray = Object.values(events);
      // console.warn( 'key', obj.key, 'idx:', index, eventsArray[index] || 'xxx', eventsArray)
      return eventsArray[index] || "-no emitter-";
    },
    onFileEvent(obj, file, fileList, idx = 0) {
      // REFACTORIN NECESARY
      obj.value = fileList;
      let value = file;
      let event = null;
      const emitName = this.getEmitName(obj, idx);
      const eventName = this.getOnEventName(obj, idx);
      this.setObjectByPath(this.storeStateData, obj.key, fileList);
      // build emitObject
      const emitObj = {
        id: this.id, // Current Formbase ID (in Array,Warp,Group)
        baseId: this.baseId, // Root Formbase ID
        trigger: { on: eventName, emit: emitName, event },
        key: obj.key,
        value, // don't use obj.value sometimes value hold special information (el-tree)
        obj,
        data: this.storeStateData,
        schema: this.storeStateSchema,
        index: this.index, // hold the index in nested array models
      };

      return this.emitter(emitName, emitObj);
    },
    onEvent(obj, event, idx = 0, updateModel = true) {
      const emitName = this.getEmitName(obj, idx);
      const eventName = this.getOnEventName(obj, idx);
      const getNullValue = this.getComponentObject(obj, "nullValue");

      //  console.log('*** ON EVENT :', eventName,'emit:', emitName, 'obj:', obj, 'index', idx, 'this.index', this.index, 'event',  event, );
      //  console.log('*** ON EVENT 1: obj:', obj.value, 'target:', event && event.target && event.target.innerText, 'event:', event);

      const et = event && event.type;
      let value = setNoValueOnEvent.includes(et)
        ? obj.value
        : event && event.target && event.target.innerText
        ? event.target.innerText
        : event;

      //  undefined or empty strings => null, because 'clearable' in vuetify controls resets to null and not to empty string!
      value = !value || value === "" ? null : value;
      //  is nullValue susbsitute for component in config.js defined then use it
      value =
        value === null && getNullValue !== undefined ? getNullValue : value;
      //  if component is number convert value to number
      value = obj.schema[componentTag] === "number" ? Number(value) : value;

      // update deep nested prop(key) with value
      if (updateModel)
        this.setObjectByPath(this.storeStateData, obj.key, value);

      // build emitObject
      const emitObj = {
        id: this.id, // Current Formbase ID (in Array,Warp,Group)
        baseId: this.baseId, // Root Formbase ID
        trigger: { on: eventName, emit: emitName, event },
        key: obj.key,
        value: value, // don't use obj.value sometimes value hold special information (el-tree)
        obj,
        data: this.storeStateData,
        schema: this.storeStateSchema,
        index: this.index, // hold the index in nested array models
      };

      return this.emitter(emitName, emitObj);
    },
    emitter(name, obj) {
      delay(() => {
        this.$emit(`${name}:${this.baseId}`, obj), 0;
      });
      return obj;
    },
    //#endregion

    //#region DRAG / DROP
    dragstart(event, obj) {
      if (!obj.schema.drag) return;

      event.dataTransfer.dropEffect = dropEffect;
      event.dataTransfer.effectAllowed = dropEffect;
      const emitObj = this.onEvent(obj, event);
      event.dataTransfer.setData("text", JSON.stringify(emitObj));
    },
    dragover(event, obj) {
      return obj.schema.drop ? event.preventDefault() : null;
    },
    drop(event, obj) {
      console.log("drop", event);
      if (!obj.schema.drop) return event.preventDefault();
      // get dragEvent and dragEvent.obj
      obj.dragEvent = JSON.parse(event.dataTransfer.getData("text"));

      // no drop on drag object
      if (obj.key === obj.dragEvent.obj.key && obj.id === obj.dragEvent.id)
        return event.preventDefault();
      // handle schema.drop function
      if (isFunction(obj.schema.drop)) obj.value = this.dropValue(obj, event);

      console.log("DROP-x", obj, event);
      this.onEvent(obj, event);

      event.preventDefault();
    },
    dropValue(obj, event) {
      return this.dropCtrl({
        value: obj.dragEvent.value,
        obj,
        dragEvent: obj.dragEvent,
        event,
        data: this.storeStateData,
        schema: this.storeStateSchema,
      });
    },
    dropCtrl(params) {
      // signature params { value, obj, dragEvent, event, data, schema }
      //
      // manipulate dropped value from control, function must return a (modified) value
      // schema:{ name: { comp:'input', drop: ( {value} ) => value && value.toUpperCase, ... }, ... }
      return params.obj.schema && isFunction(params.obj.schema.drop)
        ? params.obj.schema.drop(params)
        : params.value;
    },
    //#endregion

    //#region BINDINGS
    bindCol(obj) {
      const col = obj.schema.col || this.col || defaultCol;
      return isPlainObject(col)
        ? col
        : isNumber(col) || isString(col)
        ? { span: parseInt(col) }
        : defaultCol;
    },
    hasFormLabel(obj) {
      return obj.schema[formlabelTag] || this[formlabelTag] ? true : false;
    },
    getFormLabel(obj, index, id) {
      // try prop label in schema -> if doesn't exist try attr label function then  execute or is string then display is only bool use obj.key for label
      return obj.schema[formlabelTag]
        ? obj.schema[formlabelTag]
        : isFunction(this[formlabelTag])
        ? this[formlabelTag](obj, index, id)
        : isString(this[formlabelTag])
        ? this[formlabelTag]
        : obj.key;
    },
    bindFormLabel(obj) {
      const formlabel = obj.schema[formlabelTag] || this[formlabelTag];
      return isPlainObject(formlabel)
        ? formlabel
        : isString(formlabel)
        ? { formlabel }
        : defaultFormLabel;
    },
    bindSchema(obj) {
      // omit schema props for attr binding because some picker-components throw warning
      const omitArray = this.getComponentObject(obj, "omit");
      return omit(obj.schema, omitArray);
    },

    // OPTIONS
    getOptions(obj) {
      // schema.options in RADIO/BUTTON/CHECKBOX
      let o = isArray(obj.schema.options) ? obj.schema.options : [];
      return o.map((i) => (isString(i) ? { value: i, label: i } : i));
    },
    bindOptions(item, obj) {
      // valueKey bind prop value if checked if no valueKey take labelKey or take lable prop from item
      let value = obj.schema?.valueKey ? item[obj.schema?.valueKey] : item[valueTag]        
      let label = obj.schema?.labelKey ? item[obj.schema?.labelKey] : item[labelTag]

      label = label !== undefined ? label : value
      value = value !== undefined ? value : label  

      if (!value && !label) console.error(`'${obj.key}' has no property 'label', 'value' in options-item and no property 'labelKey' or 'valueKey' in schema definition!`)  
  
      if (this.isComponent(obj, 'radioButton|checkboxButton|checkboxGroupButton') ) [value, label] = [label, value]

      return { ...obj.schema, ...item, label, value };
    },
    getOptionsValue(item, obj) {      
      const value = obj.schema?.valueKey ? item[obj.schema?.valueKey] : item.value
      let label = obj.schema?.labelKey ? item[obj.schema?.labelKey] : item[labelTag]
      return label !== undefined ? label : value
    },

    // TOOLTIP
    isDisabledTooltip(obj) {
      return obj.schema?.tooltip?.disabled ? obj.schema?.tooltip?.disabled : !obj.schema?.tooltip
    },
    bindTooltip(obj) {
      // tooltip is typeof string ->  { placement:'bottom', content:schemaTooltip } || original object and prop content must exist / https://github.com/freeze-component/vue-popper
      const schemaTooltip = obj.schema.tooltip
      return { content: "", ...(isString(schemaTooltip) ? defaultTooltip(schemaTooltip) : schemaTooltip) }
    },

    //#endregion

    //#region GET LABEL / ITERATION KEY FOR TYPE ARRAY

    getKeyForArray(id, obj, item, index) {
      // IMPORTANT if you want to add or remove items in type:'array'
      // more Info ->
      // https://forum.vuejs.org/t/after-splicing-an-object-wrong-item-disappears-from-view/9247/4
      // https://stackoverflow.com/questions/45655090/vue-array-splice-removing-wrong-item-from-list

      // create for iteration v-for an uniqe key from each object in array using index and time.hash
      // or define your key index by defining a key property
      // MODEL
      // arrayTasks: [{ trace:'100', label:'A'}, ...  ]
      // SCHEMA
      // arrayTasks: { type:'array', schema:{ ... } }                                                      DEFAULT KEY -> KEY id-key-index   'arrayTasks-0'
      // arrayTasks: { type:'array', key:'trace', schema:{ trace: { type:'text'}, ... } }                              -> KEY trace            100
      // arrayTasks: { type:'array', key:['trace','label'], schema:{ trace: { type:'text'}, label: { type:'text'} } }  -> KEY trace_label      100_A

      // IMPORTANT! Key should not contain an EDITABLE prop, because of re-iteration on any change

      const k = obj.schema.key;
      return k
        ? Array.isArray(k)
          ? k.map((i) => item[i]).join("_")
          : item[k]
        : !isNaN(index)
        ? `${id}-${obj.key}-${index}`
        : index;
    },
    //#endregion

    // ############## METHODS #################
    // ############## METHODS #################

    // ############## METHODS #################
    // ############## METHODS #################
    // MAP TYPE

    //#region METHODS DEPRECATED

    // GET IMG SOURCE
    getImageSource(obj) {
      // if exist get source from src otherwise join schema.base & value & schema.tail
      return obj.schema.src
        ? obj.schema.src
        : `${obj.schema.base}${obj.value}${obj.schema.tail}`;
    },
    //
    // ICON
    // getIconValue(obj) {
    //   // icon: try schema.labxel or if undefined use value
    //   return obj.schema.laxbel ? obj.schema.labxel : this.setValue(obj);
    // },
    //

    // FORM SLOTS
    getFormTopSlot() {
      // Slot for Top Line in Formbase -> 'slot-formbase-top'
      return `${topSlotAppendix}-${this.id}`;
    },
    getFormBottomSlot() {
      // Slot for Bottom Line in Formbase -> 'slot-formbase-bottom'
      return `${bottomSlotAppendix}-${this.id}`;
    },
    //
    // KEY SLOTS
    getKeyInjectSlot(obj, inject) {
      // get slot starting with 'slot-inject' and inject verb 'thumb-label'   -> 'slot-inject-thumb-label-key-formbase-address-city'
      return this.getKeyClassNameWithAppendix(
        obj,
        `${injectSlotAppendix}-${inject}-${keyClassAppendix}`
      );
    },
    getKeyTopSlot(obj) {
      // get Key specific name by replacing '.' with '-' and prepending 'slot-top'  -> 'slot-top-key-formbase-address-city'
      return this.getKeyClassNameWithAppendix(
        obj,
        `${topSlotAppendix}-${keyClassAppendix}`
      );
    },
    getKeyItemSlot(obj) {
      // get Key specific name by replacing '.' with '-' and prepending 'slot-item'  -> 'slot-item-key-formbase-address-city'
      return this.getKeyClassNameWithAppendix(
        obj,
        `${itemSlotAppendix}-${keyClassAppendix}`
      );
    },
    getKeyBottomSlot(obj) {
      // get Key specific name by replacing '.' with '-' and prepending 'slot-bottom'  -> 'slot-bottom-key-formbase-address-city'
      return this.getKeyClassNameWithAppendix(
        obj,
        `${bottomSlotAppendix}-${keyClassAppendix}`
      );
    },
    getKeyTooltipSlot(obj) {
      // matches Key specific Tooltip | name by replacing '.' with '-' and prepending 'slot-bottom'  -> 'slot-tooltip-key-formbase-address-city'
      return this.getKeyClassNameWithAppendix(
        obj,
        `${tooltipSlotAppendix}-${keyClassAppendix}`
      );
    },
    getTooltipSlot(obj) {
      // 'slot-tooltip'  is default tooltip slot matches all keys
      return `${tooltipSlotAppendix}`;
    },
    //
    // ARRAY SLOTS
    getOptionSlot(obj) {
      // slot each item from array  -> 'slot-option-formbase-address-city'
      return this.getKeyClassNameWithAppendix(obj, `slot-option`);
      // slot each item from array  -> 'slot-top-array-formbase-address-city'
      return this.getKeyClassNameWithAppendix(
        obj,
        `${itemSlotAppendix}-${arrayClassAppendix}`
      );
    },

    //  ############ DEPRECATED
    getArrayTopSlot(obj) {
      // slot each item from array  -> 'slot-top-array-formbase-address-city'
      return this.getKeyClassNameWithAppendix(
        obj,
        `${topSlotAppendix}-${arrayClassAppendix}`
      );
    },
    getArrayItemSlot(obj) {
      // slot each item from array  -> 'slot-top-array-formbase-address-city'
      return this.getKeyClassNameWithAppendix(
        obj,
        `${itemSlotAppendix}-${arrayClassAppendix}`
      );
    },
    getArrayBottomSlot(obj) {
      // slot each item from array   -> 'slot-bottom-array-formbase-address-city'
      return this.getKeyClassNameWithAppendix(
        obj,
        `${bottomSlotAppendix}-${arrayClassAppendix}`
      );
    },
    //
    // TYPE SLOTS
    getTypeTopSlot(obj) {
      // get Type specific slot name  -> 'slot-top-type-radio'
      return this.getTypeClassNameWithAppendix(
        obj,
        `${topSlotAppendix}-${typeClassAppendix}`
      );
    },
    getTypeItemSlot(obj) {
      // get Type specific slot name  -> 'slot-item-type-radio'
      return this.getTypeClassNameWithAppendix(
        obj,
        `${itemSlotAppendix}-${typeClassAppendix}`
      );
    },
    getTypeBottomSlot(obj) {
      // get Type specific slot name  -> 'slot-bottom-type-radio'
      return this.getTypeClassNameWithAppendix(
        obj,
        `${bottomSlotAppendix}-${typeClassAppendix}`
      );
    },
    //
    // CLASS Names
    getPropertyClassNameWithAppendix(obj, appendix) {
      // get PROP specific name by app-/prepending 'appendix-' and replacing '.' with '-' in nested key path  -> 'controls switch'
      return obj.key
        ? obj.key
            .split(pathDelimiter)
            .map((s) => `${appendix ? appendix + classKeyDelimiter : ""}${s}`)
            .join(" ")
        : "";
    },
    getPropertyClassName(obj) {
      return this.getPropertyClassNameWithAppendix(obj, propertyClassAppendix);
    },
    getKeyClassNameWithAppendix(obj, appendix) {
      // get KEY specific name by app-/prepending 'appendix-' and replacing '.' with '-' in nested key path  -> 'top-slot-address-city'
      return `${appendix ? appendix + classKeyDelimiter : ""}${
        this.id ? this.id + classKeyDelimiter : ""
      }${obj.key.replace(/\./g, "-")}`;
      // return `${appendix ? appendix + classKeyDelimiter : ''}${obj.key.replace(/\./g, '-')}`
    },
    getKeyClassName(obj) {
      return this.getKeyClassNameWithAppendix(obj, keyClassAppendix);
    },
    getTypeClassNameWithAppendix(obj, appendix) {
      // get use Formbase ID for spec  TYPE specific class name by prepending '-type' -> 'type-checkbox'
      return `${appendix ? appendix + classKeyDelimiter : ""}${
        this.id ? this.id + classKeyDelimiter : ""
      }${obj.schema[componentTag]}`;
    },
    getTypeClassName(obj) {
      return this.getTypeClassNameWithAppendix(obj, typeClassAppendix);
    },
    getCompClassNameWithAppendix(obj, appendix) {
      // ident to TYPE but without this.ID specific class name by prepending '-comp' -> 'comp-checkbox'
      return `${appendix ? appendix + classKeyDelimiter : ""}${
        obj.schema[componentTag]
      }`;
    },
    getCompClassName(obj) {
      return this.getCompClassNameWithAppendix(obj, componentClassAppendix);
    },
    getClassName(obj) {
      // combines all into a single classname
      // class => ie. 'form-base item type-checkbox key-address-zip prop-adress prop-zip'
      return `${this.baseId} ${this.id} ${this.getTypeClassName(
        obj
      )} ${this.getKeyClassName(obj)} ${this.getCompClassName(
        obj
      )} ${this.getPropertyClassName(obj)}`;
    },
    //
    // GRID
    getRowGroupOrArray(obj) {
      return obj.schema.row || this.row || defaultRow;
    },
    getColGroupOrArray(obj) {
      return obj.schema.col || this.col || defaultCol;
    },
    //
    // SANITIZE SLOTS
    getInjectedScopedSlots(id, obj) {
      // <template #slot-inject-thumb-label-key-formbase-path-to-mykey />
      // extract the verb 'thumb-label' from Slots starting with 'slot-inject' and matching [component-id] and [key]
      const rx = new RegExp(`${injectSlotAppendix}-(.*?)-${keyClassAppendix}`);
      return Object.keys(this.$slots)
        .filter(
          (s) =>
            s.includes(
              `${id}${classKeyDelimiter}${obj.key.replace(/\./g, "-")}`
            ) && s.includes(injectSlotAppendix)
        )
        .map((i) => i.match(rx)[1]);
    },
    //
    //#endregion

    //#region BASICS

    // PREPARE ARRAYS DATA & SCHEMA
    getObjectByPath(object, path) {
      // resolves chained keys (like 'user.address.street') on an object and get the value
      let pathArray = path.split(pathDelimiter);
      pathArray.forEach((p, ix) => {
        object = object[p];
      });
      return object
    },
    setObjectByPath(object, path, value) {
      // resolves chained keys (like 'user.address.street') on an object and set the value
      let pathArray = path.split(pathDelimiter);
      pathArray.forEach((p, ix) => {
        if (ix === pathArray.length - 1) object[p] = value;
        object = object[p];
      });
    },
    updateArrayFromState(model, schema) {
      this.flatCombinedArray.forEach((obj) => {
        obj.value = get(model, obj.key, null); // get - lodash
        obj.schema = get(schema, obj.key, null); // get - lodash
      });
    },
    sanitizeShorthandType(key, schema) {
      // if key in schema is string only, then handle shorthand definition
      // schema:{ name:'text' }  => schema:{ name: { comp:'text', label: 'name' }
      return isString(schema)
        ? { [componentTag]: schema, placeholder: key }
        : schema;
    },
    flattenObjects(dat = {}, sch) {
      let data = {};
      let schema = {};
      // Organize Formular using Schema not Data
      Object.keys(sch).forEach((key) => {
        // Convert shorthand 'string' definition of name:'text' into object name:{ comp:'text'}
        sch[key] = this.sanitizeShorthandType(key, sch[key]);

        const bothArray = Array.isArray(dat[key]) && Array.isArray(sch[key]);
        const datObjectWithoutSchemaType =
          isPlainObject(dat[key]) && !sch[key][componentTag];
        const datObjectContainsTypeKey =
          dat[key] &&
          dat[key][componentTag] &&
          sch[key] &&
          sch[key][componentTag];
        const notInstanceOfFileObject = !(dat[key] instanceof File);

        if (
          bothArray ||
          datObjectWithoutSchemaType ||
          (datObjectContainsTypeKey && notInstanceOfFileObject)
        ) {
          let { data: flatData, schema: flatSchema } = this.flattenObjects(
            dat[key],
            sch[key]
          );
          Object.keys(flatData).forEach((ii) => {
            data[key + pathDelimiter + ii] = flatData[ii];
            schema[key + pathDelimiter + ii] = flatSchema[ii];
          });
        } else {
          data[key] = dat[key];
          schema[key] = sch[key];
        }
      });
      return { data, schema };
    },
    combineObjectsToArray({ data, schema }) {
      let arr = [];
      Object.keys(schema).forEach((key) => {
        if (!isPlainObject(schema[key])) {
          console.warn(
            `Schema '${JSON.stringify(
              schema
            )}' of Prop '${key}' must be a string with value of type key:'text' or a plainobject with at least key:{ type:'text'} definition.  Prop '${key}' will be ignored!`
          );
          return;
        }
        if (!schema[key]) {
          console.error(`No schema with key '${key}' found!`);
        }
        if (schema[key] && !mapSchemaToElement[schema[key][componentTag]]) {
          // lookup for exist comp:'component' in mapSchemaToElement
          console.warn(
            `component '${schema[key][componentTag]}' not found in config.js/mapSchemaToElement, using ${key}:{${componentTag}:'${defaultComponent}'} instead!`
          );
          schema[key][componentTag] = defaultComponent;
        }

        // create proxy for each value to hook of  which can be used to control your value ( ie. change input to toUpperCase )
        const obj = this.createProxyForObject(
          { key, value: data[key], schema: schema[key] },
          this.storeStateData,
          this.storeStateSchema
        );
        arr.push(obj);
        // arr.push({ key, value: data[key], schema: schema[key] })
      });
      return arr;
    },
    createProxyForObject(obj, model, schema) {
      // handle schema[hookSet] and schema[hookGet] to control incomig and outgoing value from component
      return new Proxy(obj, {
        get(target, prop, receiver) {
          const ts = target.schema;
          if (prop === "value" && ts && ts[hookGet]) {
            const tk = target.key;
            const tp = target[prop];
            // console.log(tk, '##GET',prop, isFunction(ts[hookGet]))
            const proxyValue = isFunction(ts[hookGet])
              ? ts[hookGet](tp, target, model, schema)
              : ts[hookGet]
              ? ts[hookGet]
              : tp;
            // model[tk] = proxyValue
            return proxyValue;
          }
          return target[prop];
        },
        set(target, prop, val, receiver) {
          const ts = target.schema;
          if (prop === "value" && ts && ts[hookSet]) {
            // optional SET OLD VALUE HERE
            const tk = target.key;
            const tp = target[prop];
            // console.log(tk, '**SET', prop, tp, ts, ts[hookSet] )
            target[prop] = isFunction(ts[hookSet])
              ? ts[hookSet](tp, target, model, schema)
              : ts[hookSet]
              ? ts[hookSet]
              : tp;
          } else {
            target[prop] = val;
          }
          return true;
        },
      });
    },

    flattenAndCombineToArray(model, schema) {
      // flatten nested structure of both objects 'model' & 'schema' ...
      let flattenedObjects = this.flattenObjects(model, schema);
      // ... and combine them to an
      return this.combineObjectsToArray(flattenedObjects);
    },
    autogenerateSchema(model) {
      // generate a minimal default schema from model
      let schema = JSON.stringify(model, (key, val) =>
        val === undefined ? null : val
      );
      schema = JSON.parse(schema, (key, val) => {
        if (val === null || val === undefined)
          return defaultSchemaIfValueIsNullOrUndefined(key);
        if (typeof val === "string") return defaultSchemaIfValueIsString(key);
        if (typeof val === "number") return defaultSchemaIfValueIsNumber(key);
        if (typeof val === "boolean") return defaultSchemaIfValueIsBoolean(key);
        return val;
      });
      // assign root props to avoid manipulating prop: schema
      Object.keys(schema).forEach((key) => (this.schema[key] = schema[key]));
    },
    tryAutogenerateModelStructure(model, schema) {
      // generate or complete an empty model based on schema structure

      Object.keys(schema).forEach((key) => {
        // model must be at least an empty Object. It doesn't work with 'null', 'undefined' or any 'primitive value'
        // Autogeneration from Schema works only if model is an empty Object
        // if model is NOT an empty Object, no action is applied, otherwise data in model could be changed or modified
        if (!isEmpty(model[key])) return;

        let val = schema[key];
        if (val[componentTag] === "group") {
          // this.$set(model, key, {})
          model[key] = {};
          this.tryAutogenerateModelStructure(model[key], val.schema);
        } else if (val[componentTag] === "array") {
          // this.$set(model, key, [])
          model[key] = [];
          this.tryAutogenerateModelStructure(model[key], val.schema);
        } else if (val[componentTag] === "list") {
          // this.$set(model, key, [])
          model[key] = [];
        } else if (isPlainObject(val) && !val[componentTag]) {
          // this.$set(model, key, {})
          model[key] = {};
          this.tryAutogenerateModelStructure(model[key], val);
        }
        if (Array.isArray(val) && !val[componentTag]) {
          // this.$set(model, key, [])
          model[key] = [];
          this.tryAutogenerateModelStructure(model[key], val);
        }
      });
    },
    rebuildArrays(model, schema) {
      // undefined, null or primitive value for model can't work because you need reference to object for working on
      if (!model)
        throw `Property 'model' is null or undefined. Use '<v-form-base :model="myModel" :schema="mySchema" />'. myModel must be at least an empty Object.`;

      // noise if async loading
      if (isEmpty(schema) && isEmpty(model)) {
        console.warn(
          `At least one of the properties 'model' or 'schema' in <v-form-base /> must be at least an empty Object. Ignore this Warning on lazy/async loading 'model' or 'schema' `
        );
      }
      // generate/complete structure of model
      this.tryAutogenerateModelStructure(model, schema);

      // no schema defined or empty -> autogenerate basic schema
      if (isEmpty(schema)) this.autogenerateSchema(model);

      // create flatted working array from schema and value
      this.flatCombinedArray = this.flattenAndCombineToArray(
        this.storeStateData,
        this.storeStateSchema
      );
    },
    //
    //#endregion
  },
  created() {
    this.rebuildArrays(this.model, this.schema);
  },
};
</script>