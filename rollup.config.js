import vue from 'rollup-plugin-vue';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import path from 'path';
import fs from 'fs-extra';

const getCategory = category => {
    let dir = path.resolve('src', category);
    let items = fs.readdirSync(dir);
    items = items.filter(item => {
        let stat = fs.statSync(path.join(dir, item));
        return stat.isDirectory();
    });

    return items.map(item => ({
        input: `src/${category}/${item}/index.js`,
        output: [
            {
                file: `lib/${category}/${item}.js`,
                format: 'es',
            },
        ],
        ...base,
    }));
};

const base = {
    external: ['vue'],
    plugins: [vue(), nodeResolve(), commonjs()],
};

export default [
    {
        input: 'src/lib.js',
        output: [
            {
                file: 'lib/index.cjs.js',
                format: 'cjs',
            },
            {
                file: 'lib/index.esm.js',
                format: 'es',
            },
        ],
        ...base,
    },
    ...getCategory('components'),
    ...getCategory('directives'),
    ...getCategory('mixins'),
    ...getCategory('services'),
];
