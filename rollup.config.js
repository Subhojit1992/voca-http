import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import dts from 'rollup-plugin-dts';
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url)));

export default [
  // UMD build (for browsers)
  {
    input: 'src/index.ts',
    output: [
      {
        name: 'vocaHttp',
        file: pkg.browser,
        format: 'umd',
        sourcemap: true
      },
      {
        name: 'vocaHttp',
        file: 'dist/voca-http.umd.min.js',
        format: 'umd',
        plugins: [terser()],
        sourcemap: true
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' })
    ]
  },
  // ESM and CJS builds (for bundlers and Node.js)
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true
      },
      {
        file: pkg.module,
        format: 'es',
        sourcemap: true
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' })
    ]
  },
  // TypeScript declaration files
  {
    input: 'src/index.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        emitDeclarationOnly: true,
        outDir: 'dist'
      })
    ]
  }
]; 