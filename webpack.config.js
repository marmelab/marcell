var ExtractTextPlugin = require('extract-text-webpack-plugin');

function getEntrySources(sources) {
    if (process.env.NODE_ENV !== 'production') {
        sources.push('webpack-dev-server/client?http://localhost:8080');
    }

    return sources;
}

module.exports = {
    entry: {
        landingPage: getEntrySources([
            './sass/landing-page.scss',
            './js/landing-page.js'
        ])
    },
    output: {
        publicPath: 'http://localhost:8080/',
        filename: 'public/js/[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css!sass')
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('/public/css/[name].css', {
            allChunks: true
        })
    ]
};
