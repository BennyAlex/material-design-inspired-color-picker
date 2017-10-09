import materialPalette from './material-palette'
import accentMaterialPalette from './material-palette-accent'

export default Object.keys(materialPalette).reduce((palette, key) => {
  palette[key] = materialPalette[key]
  if (accentMaterialPalette[key]) {
    palette[key] = Object.assign({}, palette[key], accentMaterialPalette[key])
  }
  return palette
}, {})
