<template>
  <div class="color-wrapper" :style="{width: wrapperSize}">
    <div
      v-show="subPalette !== undefined"
      @click="subPalette = undefined"
      class="back-icon"
      :style="{margin: colorMargin + 'px', height: colorSizePx, width: colorSizePx}"
    >
      <svg
        fill="#000000"
        :height="colorSize"
        viewBox="0 0 24 24"
        :width="colorSize / 2"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
      </svg>
    </div>

    <div
      v-for="color in colors"
      :key="color.name"
      @click.stop="click(color)"
      class="color"
      :style="getColorStyle(color)"
      :title="color.name">

      <span
        :class="{visible: color.value.toLowerCase() === value.toLowerCase() || isTintOfSelected(color), 'is-light': colorIsLight(color.value)}"
      >
        <span
          :style="{width: colorSize - 8 + 'px', height: colorSize - 8 + 'px'}"
          class="outer-circle"
        ></span>

         <span
           :style="{width: colorSize - 22 + 'px', height: colorSize - 22 + 'px'}"
           class="inner-circle"
         ></span>
      </span>
    </div>
  </div>
</template>

<script>
  import colorIsLight from '../colorIsLight'
  import materialPalette from '../palettes/material-palette'
  import accentMaterialPalette from '../palettes/material-palette-accent'
  import fullMaterialPalette from '../palettes/material-palette-full'

  function arrayIncludes (arr, obj) {
    let i = arr.length
    while (i--) {
      if (arr[i] === obj) {
        return true
      }
    }
    return false
  }

  function valuesOfObj (obj) {
    const values = []
    Object.keys(obj).forEach(key => {
      values.push(obj[key])
    })
    return values
  }

  export default {
    name: 'color-picker',
    props: {
      value: {
        type: String,
        required: true
      },
      palette: {
        type: [String, Object],
        required: false
      },
      colorSize: {
        type: Number,
        default: 58
      },
      colorsPerRow: {
        type: Number,
        default: 5
      },
      colorMargin: {
        type: Number,
        default: 6
      },
      defaultTint: {
        type: [Number, String],
        default: 500
      },
      useSpectrumPicker: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      getColorStyle (color) {
        return {
          background: color.value,
          margin: this.colorMargin + 'px',
          height: this.colorSizePx,
          width: this.colorSizePx
        }
      },
      colorIsLight (color) {
        return colorIsLight(color, 210)
      },
      click (color) {
        if (this.useSpectrumPicker && typeof this.currentPalette[color.name] === 'object') {
          this.subPalette = color.name
          if (this.isTintOfSelected(color)) return
          this.selectedColorName = color.name
        }
        this.$emit('change', color.value)
      },
      isTintOfSelected (color) {
        return this.selectedColorName === color.name && arrayIncludes(valuesOfObj(this.currentPalette[this.selectedColorName]), this.value)
      },
      getDefaultColor (colorObj) {
        if (colorObj[this.defaultTint]) return colorObj[this.defaultTint]
        else return valuesOfObj(colorObj)[Math.round(Object.keys(colorObj).length / 2) - 1] // get the color in the middle
      }
    },
    computed: {
      colors () {
        const colors = []
        const palette = this.subPalette ? this.currentPalette[this.subPalette] : this.currentPalette
        const subName = this.subPalette ? this.subPalette + ' - ' : ''

        Object.keys(palette).forEach(key => {
          let value = palette[key]
          colors.push({
            name: subName + key,
            value: typeof value === 'string' ? value : this.getDefaultColor(value)
          })
        })
        return colors
      },
      currentPalette () {
        if (!this.palette) return materialPalette
        else if (typeof this.palette === 'string') {
          const availablePalettes = {
            'material': materialPalette,
            'material-full': fullMaterialPalette,
            'material-accent': accentMaterialPalette
          }
          console.assert(arrayIncludes(Object.keys(availablePalettes), this.palette), 'You passed in an unknown palette string. Following palettes are available:' + Object.keys(availablePalettes))
          return availablePalettes[this.palette]
        }
        else return this.palette
      },
      wrapperSize () {
        return ((this.colorSize * this.colorsPerRow) + (this.colorMargin * this.colorsPerRow * 2)) + 'px'
      },
      colorSizePx () {
        return this.colorSize + 'px'
      }
    },
    data () {
      return {
        subPalette: undefined,
        selectedColorName: undefined
      }
    },
    created () {
      if (!this.value || this.value.length !== 7 || this.selectedColorName) return // value must be in hex format, eg: #ffffff
      Object.keys(this.currentPalette).forEach(key => {
        let valueOrObject = this.currentPalette[key]
        const values = typeof valueOrObject === 'string' ? [valueOrObject] : valuesOfObj(valueOrObject)
        if (arrayIncludes(values, this.value)) this.selectedColorName = key
      })
    }
  }
</script>

<style scoped>
  .color-wrapper, .color-wrapper * {
    box-sizing: content-box;
    text-align: left;
  }

  .color, .back-icon {
    -webkit-tap-highlight-color: transparent;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-touch-callout: none;
    tap-highlight-color: transparent;
    user-select: none;
    outline-style: none;
    cursor: pointer;
  }

  .color {
    display: inline-block;
    border-radius: 100%;
    position: relative;
  }

  .back-icon {
    display: inline-block;
    text-align: center;
    float: left;
  }

  .outer-circle {
    position: absolute;
    border: 4px solid rgba(0, 0, 0, 0.0);
    border-radius: 100%;
    margin: 0;
    transition: all 0.45s;
  }

  .inner-circle {
    position: absolute;
    border: 4px solid rgba(0, 0, 0, 0.0);
    border-radius: 100%;
    margin: 7px;
    transition: all 0.45s;
  }

  .visible .inner-circle {
    border: 4px solid rgba(255, 255, 255, 1);
    transition: all 1.1s;
  }

  .visible .outer-circle {
    border: 4px solid rgba(0, 0, 0, 0.22);
    transition: all 1.1s;
  }

  .visible.is-light .inner-circle {
    border-color: #555555;
    transition: all 1.1s;
  }
</style>
