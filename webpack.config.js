const path=require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports= {
    //configuration used by webpack
    mode : 'development',  // <----use this when in development
    //mode : 'production'   //<---use this when in production
    entry : {
        app : './src/index.js' 
    },
    module : {
        rules : [
            {test: /\.(js|jsx)$/, use: ['babel-loader']},
            {test: /\.(css)$/, use: ['style-loader', 'css-loader']}
        ]
    },
    plugins :[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Invoice Generator',
            template :'./src/template.ejs',
            filename : 'invoice.html',
            chunks : ['app']
        })

    ],
    output:{
        filename : '[name].bundle.js',
        path : path.resolve(__dirname,'dist'),
        publicPath :'/'
    },

    devtool: 'inline-source-map'
}