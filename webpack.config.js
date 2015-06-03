var config = require('config');
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
            './sass/style.scss',
            './sass/landing-page.scss',
            './js/analytics.js',
            './js/landing-page.js'
        ])
    },
    output: {
        publicPath: 'http://localhost:8080/',
        filename: '/js/[name].js'
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
    devServer: {
        headers: { "Access-Control-Allow-Origin": "*" }
    },
    plugins: [
        new webpack.DefinePlugin({
            GOOGLE_ANALYTICS_ID: '"' + config.tracking.google_analytics_id + '"'
        }),
        new ExtractTextPlugin('/css/[name].css', {
            allChunks: true
        })
    ]
};
