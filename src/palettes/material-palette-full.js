import materialPalette from './material-palette'
import accentMaterialPalette from './material-palette-accent'

const fullMaterialPalette = {}

function getPalette() {
  Object.keys(materialPalette).forEach(key => {
    let fullColor = {}
    let valueOrObj = materialPalette[key]
    if (typeof valueOrObj === 'string') fullColor = valueOrObj
    else {
      Object.keys(materialPalette[key]).forEach(key2 => {
        fullColor[key2] = materialPalette[key][key2]
      })
      if (accentMaterialPalette[key]) {
        Object.keys(accentMaterialPalette[key]).forEach(key3 => {
          fullColor[key3] = accentMaterialPalette[key][key3]
        })
      }
    }
    fullMaterialPalette[key] = fullColor
  })
}

getPalette()
export default fullMaterialPalette
