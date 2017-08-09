import Vue from 'vue'
import 'document-register-element/build/document-register-element'

// include vue-custom-element plugin to Vue
import VueCustomElement from 'vue-custom-element'
Vue.use(VueCustomElement)

// import and register your component
import Picker from './components/color-picker.vue'
Vue.customElement('md-color-picker', Picker)
