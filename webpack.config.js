const path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'lib'),
        filename: 'exchanger.js',
        library: 'exchanger',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss?$/,
                loader: 'style-loader!css-loader!sass-loader'
            }
        ]
    },
    plugins: [
    ]
}
