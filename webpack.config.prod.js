const webpack = require('webpack')
const path = require('path')
const baseConfig = require('./webpack.config.base')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
	.BundleAnalyzerPlugin

module.exports = Object.assign(baseConfig, {
	plugins: [new ExtractTextPlugin('editor.css'), new BundleAnalyzerPlugin()]
})
