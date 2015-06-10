var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

function getEntrySources(sources) {
    if (process.env.NODE_ENV !== 'production') {
        sources.push('webpack-dev-server/client?http://localhost:8080');
    }

    return sources;
}

var node_modules = require('path').resolve(__dirname, 'node_modules');

module.exports = {
    entry: {
        landingPage: getEntrySources([
            './sass/landing-page.scss',
            './js/landing-page.js'
        ])
    },
    output: {
        publicPath: process.env.NODE_ENV !== 'production' ? 'http://localhost:8080/' : '/',
        filename: 'build/[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'file?name=fonts/[name].[ext]'
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("css!sass?outputStyle=expanded&" +
                    "includePaths[]=" + node_modules + "/bootstrap-sass/assets/stylesheets/&" +
                    "includePaths[]=" + node_modules + "/compass-mixins/lib"
                )
            }
        ]
    },
    devtool: 'eval',
    plugins: [
        new ExtractTextPlugin('build/[name].css', {
            allChunks: true
        })
    ]
};
