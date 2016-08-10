/**
 * Webpack configuration file
 * It's responsible for building our application and
 * compiling ES6 files to ES5 (with Babel)
 */
module.exports = {
    context: __dirname + '/app',
    entry: ["./index.js"],
    output: {
        path: __dirname + '/dist',
        filename: 'capy-tracker.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['', '.js']
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
        ]
    }
};
