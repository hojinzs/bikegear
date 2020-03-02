const path = require('path');

module.exports = {
    configureWebpack: {
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
        //             loader: 'css-loader',
        //             options: {
        //                 alias: {
        //                     '~' : path.join(__dirname, 'src/')
        //                 }
        //             }
        //         }
        //     ]
        // }
    }
}

