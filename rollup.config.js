import vue from 'rollup-plugin-vue';

export default {
    input: 'src/components/index.js',
    output: [
        {
            file: 'dist/index.cjs.js',
            format: 'cjs',
        },
        {
            file: 'dist/index.esm.js',
            format: 'es',
        },
    ],
    external: ['vue'],
    plugins: [vue()],
};
