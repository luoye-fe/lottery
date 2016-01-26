var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

var pwd = __dirname;

module.exports = {
    // 插件项
    plugins: [commonsPlugin],
    // 页面入口文件配置
    entry: {
        index: 'app.js',
    },
    // 入口文件输出配置
    output: {
        path: 'dist/',
        filename: '[name].min.js'
    },
    // devtool: 'source-map',
    module: {
        // 加载器配置    
        loaders: [{
            test: /.css$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /.js$/,
            loader: 'jsx-loader?harmony'
        },{
            test: /.json$/,
            loader: 'json-loader'
        }]
    },
    // 路径
    resolve: {
        root: pwd,
        extensions: ['', '.js', '.json', '.scss'],
        alias: {
            jquery: 'src/js/jquery.js'
        }
    }
};
