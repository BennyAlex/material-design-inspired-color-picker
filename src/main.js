import Vue from 'vue'
import 'document-register-element/build/document-register-element'

// include vue-custom-element plugin to Vue
import VueCustomElement from 'vue-custom-element'

Vue.use(VueCustomElement)

// import and register your component
import Picker from './components/color-picker.vue'

Vue.customElement('md-color-picker', Picker)

import materialPalette from './palettes/material-palette'
import accentMaterialPalette from './palettes/material-palette-accent'
import fullMaterialPalette from './palettes/material-palette-full'
import { colorIsLight, colorIsDark } from './color-brightness'

// this is the color picker class which can be accessed from outside
class ColorPicker {}

ColorPicker.materialPalette = materialPalette
ColorPicker.accentMaterialPalette = accentMaterialPalette
ColorPicker.fullMaterialPalette = fullMaterialPalette
ColorPicker.colorIsLight = colorIsLight
ColorPicker.colorIsDark = colorIsDark

// make the colorPicker class accessible from outside
export default ColorPicker
