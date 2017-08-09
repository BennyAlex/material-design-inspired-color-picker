import vue from 'rollup-plugin-vue'
import nodeResolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import uglify from 'rollup-plugin-uglify'
import { minify } from 'uglify-es'
// import babel from 'rollup-plugin-babel';

const production = process.env.NODE_ENV === 'production'
if (!production) console.log('Running in development mode.')

export default {
  entry: 'src/main.js',
  dest: 'dist/md-color-picker.js',
  format: 'es',
  plugins: [
    replace({
      'process.env.NODE_ENV': production ? JSON.stringify('production') : JSON.stringify('develop')
    }),
    /*babel({
      exclude: ['node_modules/**', 'docs/**', 'rollup.config.js', 'src/main.js', 'src/components/**']
    }),*/
    nodeResolve({
      module: true,
      jsnext: true,
      main: true
    }),
    vue({
      compileTemplate: true,
      css: true
    }),
    production && uglify({}, minify) // minify, but only in production
  ]
}