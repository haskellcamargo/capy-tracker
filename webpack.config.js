/**
 * MIT License
 *
 * Copyright (c) 2016 Marcelo Camargo
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
var webpack = require('webpack')
var minify = -1 !== process.argv.indexOf('--minify')
var path = require('path')

/**
 * Webpack configuration file
 * It's responsible for building our application and
 * compiling ES6 files to ES5 (with Babel)
 */
module.exports = {
    context: path.join(__dirname, '/lib'),
    entry: ["./index.js"],
    output: {
        path: path.join(__dirname, '/dist'),
        filename: minify ? 'capy-tracker.min.js' : 'capy-tracker.js',
        publicPath: '/',
        libraryTarget: 'var',
        library: 'CapyTracker'
    },
    resolve: {
        extensions: ['', '.js']
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
        ]
    },
    plugins: minify ? [new webpack.optimize.UglifyJsPlugin()] : []
}
