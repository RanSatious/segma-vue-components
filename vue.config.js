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
    },
    devServer: {
        host: '127.0.0.1',
    },
};
