import {build} from 'esbuild';
import * as path from "path";

build({
    target: 'es2015',
    entryPoints: [path.resolve(__dirname, './src/index.ts')],
    outfile: path.resolve(__dirname, './dist/index.js'),
    minify: false,
    tsconfig: path.resolve(__dirname, './tsconfig.json'),
})
