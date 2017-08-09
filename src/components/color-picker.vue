<template>
  <div class="color-wrapper">
    <div
      v-show="subPalette !== undefined"
      @click="subPalette = undefined"
      class="color back-icon"
    >
      <svg fill="#000000" height="54" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
      </svg>
    </div>

    <div
      v-for="color in colors"
      :key="color.name"
      @click.stop="click(color)"
      class="color"
      :style="{background: color.value}"
      :class="{selected: color.value === value || isTintOfSelected(color), 'is-light': colorIsLight(color.value)}"
      :title="color.name">
    </div>
  </div>
</template>

<script>
  import colorIsLight from '../colorIsLight'
  import materialPalette from '../palettes/material-palette'
  import accentMaterialPalette from '../palettes/material-palette-accent'
  import fullMaterialPalette from '../palettes/material-palette-full'

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
      colorIsLight (color) {
        return colorIsLight(color, 231)
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
        return this.selectedColorName === color.name && Object.values(this.currentPalette[this.selectedColorName]).includes(this.value)
      },
      getDefaultColor (colorObj) {
        if (colorObj[this.defaultTint]) return colorObj[this.defaultTint]
        else return Object.values(colorObj)[Math.round(Object.keys(colorObj).length / 2) - 1] // get the color in the middle
      }
    },
    computed: {
      colors () {
        const colors = []
        const palette = this.subPalette ? this.currentPalette[this.subPalette] : this.currentPalette
        const subName = this.subPalette ? this.subPalette + ' - ' : ''
        for (let [key, value] of Object.entries(palette)) {
          colors.push({
            name: subName + key,
            value: typeof value === 'string' ? value : this.getDefaultColor(value)
          })
        }
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
          if (!Object.keys(availablePalettes).includes(this.palette)) {
            console.error('You passed in an unknown palette string. Following palettes are available:', Object.keys(availablePalettes))
          }
          else return availablePalettes[this.palette]
        }
        else return this.palette
      }
    },
    data () {
      return {
        subPalette: undefined,
        selectedColorName: undefined,
        privateCurrentPalette: undefined
      }
    },
    created () {
      if (!this.value || this.value.length !== 7 || this.selectedColorName) return // value must be in hex format, eg: #ffffff
      for (let [name, valueOrObject] of Object.entries(this.currentPalette)) {
        const values = typeof valueOrObject === 'string' ? [valueOrObject] : Object.values(valueOrObject)
        for (let value of values) {
          if (value === this.value) {
            this.selectedColorName = name
            return
          }
        }
      }
    }
  }
</script>

<style scoped>
  .color-wrapper {
    width: 350px;
  }

  .color {
    display: inline-block;
    height: 54px;
    width: 54px;
    border-radius: 100%;
    margin: 8px;
  }

  .color.back-icon {
    text-align: center;
    float: left;
  }

  .color:before,
  .color:after {
    content: '';
    position: absolute;
    border-radius: 100%;
    opacity: 0;
    transition: opacity 0.25s;
  }

  .color:before {
    /*width: 54px;*/
    /*height: 54px;*/
    width: 46px;
    height: 46px;
    border: 4px solid rgba(0, 0, 0, 0.15);
  }

  .color:after {
    /*width: 44px;*/
    /*height: 44px;*/
    width: 36px;
    height: 36px;
    margin: 6px;
    border: 3px solid white;
  }

  .color.is-light:after {
    border-color: #555555;
  }

  .color.selected:before,
  .color.selected:after {
    transition: opacity 0.45s;
    opacity: 1;
  }
</style>
