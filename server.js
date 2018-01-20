const express = require('express')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config.js')

const app = express()

const compiler = webpack(webpackConfig)

app.use(
    webpackDevMiddleware(compiler, {
        hot: true,
        filename: 'bundle.js',
        publicPath: '/',
        stats: {
            colors: true
        },
        historyApiFallback: true
    })
)
app.use(webpackHotMiddleware(compiler))

app.use(express.static(`${__dirname}/dist`))

const server = app.listen(3000, '0.0.0.0', () => {
    const host = server.address().address
    const port = server.address().port
    console.log('Example app listening at http://%s:%s', host, port)
})
