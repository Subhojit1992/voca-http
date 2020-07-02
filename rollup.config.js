import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
// import { uglify } from "rollup-plugin-uglify";

const dist = 'dest';

export default {
  input: 'src/lib/index.js',
  output: [
    {
        file: `${dist}/bundle.cjs.js`,
        format: 'cjs'
    },
    {
        file: `${dist}/bundle.esm.js`,
        format: 'esm'
    },
    {
        name: 'voca',
        file: `${dist}/bundle.umd.js`,
        format: 'umd'
    },
  ],
  plugins: [
    resolve(),
    babel({ babelHelpers: 'bundled' })
  ]
};