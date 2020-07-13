import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import { uglify } from "rollup-plugin-uglify";

const dist = 'dist';

export default {
  input: 'src/lib/index.js',
  output: [
    {
        file: `index.js`,
        format: 'esm'
    },
    {
        name: 'voca',
        file: `${dist}/voca-http.js`,
        format: 'umd'
    },
    {
      name: 'voca',
      file: `${dist}/voca-http.min.js`,
      format: 'umd',
      plugins: uglify()
    },
  ],
  plugins: [
    resolve(),
    babel({ babelHelpers: 'bundled' })
  ]
};