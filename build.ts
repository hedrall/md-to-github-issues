import {build} from 'esbuild';
import * as path from "path";

build({
    target: 'es2015',
    entryPoints: [path.resolve(__dirname, './src/index.ts')],
    outfile: path.resolve(__dirname, './dist/index.js'),
    minify: false,
    platform: 'node',
    tsconfig: path.resolve(__dirname, './tsconfig.json'),
})

// for demo page
build({
    target: 'es2015',
    entryPoints: [path.resolve(__dirname, './demo/index.ts')],
    outfile: path.resolve(__dirname, './demo/index.js'),
    minify: false,
    bundle: true,
    platform: 'browser',
    tsconfig: path.resolve(__dirname, './tsconfig.json'),
})
