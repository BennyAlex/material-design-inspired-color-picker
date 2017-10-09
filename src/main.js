import 'document-register-element/build/document-register-element'
import Vue from 'vue'
// include vue-custom-element plugin to Vue
import VueCustomElement from 'vue-custom-element'
import { colorIsDark, colorIsLight } from './color-brightness'
// import and register your component
import Picker from './components/color-picker.vue'
import { accentMaterialPalette, fullMaterialPalette, materialPalette } from './palettes'

Vue.use(VueCustomElement)

Vue.customElement('md-color-picker', Picker)

// this is the color picker class which can be accessed from outside
class ColorPicker {
}

ColorPicker.materialPalette = materialPalette
ColorPicker.accentMaterialPalette = accentMaterialPalette
ColorPicker.fullMaterialPalette = fullMaterialPalette
ColorPicker.colorIsLight = colorIsLight
ColorPicker.colorIsDark = colorIsDark

// make the colorPicker class accessible from outside
export default ColorPicker
