import nodeResolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import { uglify } from "rollup-plugin-uglify";
import { minify } from "uglify-es";
import babel from "rollup-plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import VuePlugin from "rollup-plugin-vue";

const production = process.env.NODE_ENV === "production";

const devPlugins = [
  replace({
    "process.env.NODE_ENV": JSON.stringify("develop")
  }),
  nodeResolve({
    mainFields: ["browser", "main", "module"]
    // mainFields: ["main"]
  }),
  commonjs(),
  VuePlugin({
    compileTemplate: true,
    css: true
  }),
  babel({
    exclude: ["node_modules/**", "*.vue", "**.vue"]
  })
];

const productionPlugins = [
  replace({
    "process.env.NODE_ENV": JSON.stringify("production")
  }),
  nodeResolve({
    mainFields: ["browser", "main", "module"]
    // mainFields: ["main"]
  }),
  commonjs(),
  VuePlugin({
    compileTemplate: true,
    css: true
  }),
  babel({
    exclude: ["node_modules/**", "*.vue", "**.vue"]
  }),
  uglify({}, minify)
];

const devRollup = {
  input: "src/main.js",
  output: {
    name: "mdColorPicker",
    file: "docs/md-color-picker.js",
    format: "iife"
  },
  strict: true,
  plugins: devPlugins
};

const productionRollup = {
  input: "src/main.js",
  output: {
    name: "mdColorPicker",
    file: "dist/md-color-picker.js",
    format: "iife"
  },
  strict: true,
  plugins: productionPlugins
};

export default production ? [devRollup, productionRollup] : devRollup;
