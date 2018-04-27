const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const baseConfig = require('./webpack.config.base')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = Object.assign(baseConfig, {
	entry: {
		index: './src/index.jsx'
	},
	output: {
		path: path.join(__dirname, './dist'),
		filename: '[name].js'
	},
	plugins: [new ExtractTextPlugin('editor.css'), new CleanWebpackPlugin('dist')]
})
