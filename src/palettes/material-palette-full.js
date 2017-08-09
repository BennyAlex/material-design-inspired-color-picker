import materialPalette from './material-palette'
import accentMaterialPalette from './material-palette-accent'

const fullMaterialPalette = {}

function getPalette () {
  for (let [key, objOrStr] of Object.entries(materialPalette)) {
    let fullColor = {}
    if (typeof objOrStr === 'string') fullColor = objOrStr
    else {
      for (let attr in objOrStr) {
        if (objOrStr.hasOwnProperty(attr)) fullColor[attr] = objOrStr[attr]
      }
      if (accentMaterialPalette[key]) {
        for (let [accentKey, color] of Object.entries(accentMaterialPalette[key])) {
          fullColor[accentKey] = color
        }
      }
    }
    fullMaterialPalette[key] = fullColor
  }
}

getPalette()
export default fullMaterialPalette
