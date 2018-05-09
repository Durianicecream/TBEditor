const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.config.base')

module.exports = Object.assign(baseConfig, {
	entry: {
		index: './example/index.jsx'
	},
	output: {
		path: path.join(__dirname, './dist'),
		filename: '[name].js'
	},
	plugins: [
		new ExtractTextPlugin('editor.css'),
		new HtmlWebpackPlugin({
			template: './example/index.html'
		})
	],
	devServer: {
		port: 10086,
		stats: {
			chunks: false
		},
		hot: true,
		proxy: {
			'/api/*': {
				target: 'http://tuobing.leanapp.cn',
				changeOrigin: true
			}
		}
	}
})
