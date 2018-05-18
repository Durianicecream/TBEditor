const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const baseConfig = require('./webpack.config.base')

module.exports = Object.assign(baseConfig, {
	entry: {
		index: './example/index.jsx'
	},
	plugins: [
		new MiniCssExtractPlugin('editor.css'),
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
		inline: true,
		proxy: {
			'/api/*': {
				target: 'http://localhost:3000',
				changeOrigin: true
			}
		}
	}
})