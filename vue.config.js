const path = require('path');

module.exports = {
    configureWebpack: {
        devServer: {
            host: 'bikegear.test'
        },
        resolve: {
            alias: {
                '@': path.join(__dirname, 'src/'),
                '$': path.join(__dirname, 'src/plugins/'),
            }
        },
        // module: {
        //     rules: [
        //         {
        //             test: /\.css$/,
        //             use: [
        //                 'vue-style-loader',
        //                 {
        //                     loader: 'css-loader',
        //                     options: { importLoaders: 1 }
        //                 },
        //                 'postcss-loader'
        //             ]
        //         }
        //     ]
        // }
    }
}

