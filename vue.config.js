module.exports = {
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.md$/,
                    use: 'raw-loader',
                },
            ],
        },
        optimization: {
            splitChunks: {
                chunks: 'async',
                minSize: 30000,
                maxSize: 0,
                minChunks: 1,
                maxAsyncRequests: 5,
                maxInitialRequests: 3,
                automaticNameDelimiter: '_',
                name: true,
                cacheGroups: {
                    demo: {
                        test: /Demo.+\.vue$/,
                        priority: -10,
                        name: 'demo',
                        enforce: true,
                    },
                },
            },
        },
    },
    devServer: {
        host: '127.0.0.1',
    },
};
