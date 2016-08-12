var config = {
    entry: './src',
    output: {
        path: './dist',
        filename: 'app.js'
    },
    module: {
        loaders: [
            {
                test: /\.(html|json|png|css)$/,
                loader: 'file?name=/[name].[ext]'
            }
        ]
    }
};
module.exports = config;
