# material-design-inspired-color-picker
> A javascript color picker inspired by material design

## Features
* built-in material color palette with shades and accent colors
* support for custom color palettes
* display main color first and by clicking on it show its shades or accent colors
* easy to use
* lightweight
* can be used in plain javascript projects or with other js frameworks

## Todo
* add babel, but at the moment it looks like there is an error with rollup-babel plugin  :/
* margin attribute
* number of colors per row attribute
* color-size attribute

## Installation
> npm install material-design-inspired-color-picker --save

## Usage
First include the script in your app. There are two ways to do it.
1. Recommended if you are using es6:
````javascript
import 'material-design-inspired-color-picker'
````
2. Compatible with plain javascript
````html
<script src="md-color-picker.js"></script>
````
Then, you can use it like a custom-element tag:
````html
<md-color-picker></md-color-picker>
````

A custom elements polyfill is included, so it will work in even in browsers wich do not support the custom-elements specification.

## Api
The picker let you pass in some options and attributes so you can customize it.
Following properties can be parsed into the picker:

|propertyname|type|default| example|
| :---: | :---:| :---:| :---: |
| value | string | none | #f1c5a9 |
| palette | string or object | 'material' | 'material-full' |
| defaultTint in js or default-tint in HTML! | number or string | 500 | '200' |
| useSpectrumPicker in js or use-spectrum-picker in HTML!| bool | true | false |

**Explanation:**
* value : the color which is selected. Must be a hex number with 6 digits and a hashtag.
* palette : the palette with all colors. If it is a string, the picker will use a built in palette. Currently the following palettes are available:
````
material : standard material colors 
material-full : the material colors including the accent colors 
material-accent : only the accent material colors
````
* defaultTint : this is the tint for each color wich will be shown at the beginning. Material colors default tint is 500. For custom palettes you can also use strings.
* useSpectrumPicker : if false, the other color tints can not be selected, so only the color wich matches default tint is selectable.

**Full example:**
````html
<md-color-picker value="#abcdef" palette="material-accent" defaultTint="300" useSpectrumPicker="false"></md-color-picker>
````

For a more detailed example, see the demo page under demo folder