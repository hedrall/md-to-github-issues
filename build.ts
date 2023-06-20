import {build} from 'esbuild';
import * as path from "path";

// for live demo
build({
    target: 'es2015',
    entryPoints: [path.resolve(__dirname, './docs/index.ts')],
    outfile: path.resolve(__dirname, './docs/index.js'),
    minify: false,
    bundle: true,
    platform: 'browser',
    tsconfig: path.resolve(__dirname, './tsconfig.json'),
})
