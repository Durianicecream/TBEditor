const webpack = require('webpack')
const path = require('path')
const baseConfig = require('./webpack.config.base')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
	.BundleAnalyzerPlugin

module.exports = Object.assign(baseConfig, {
	output: {
		filename: 'editor.js',
		library: 'FungoEditor',
		libraryTarget: 'umd',
		umdNamedDefine: true
	},
	plugins: [new MiniCssExtractPlugin('editor.css'), new BundleAnalyzerPlugin()]
})