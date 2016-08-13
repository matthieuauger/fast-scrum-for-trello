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
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    }
};
module.exports = config;
