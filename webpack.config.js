const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
// 	.BundleAnalyzerPlugin

module.exports = {
	module: {
		rules: [{
				test: /\.(less|css)$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader'
					},
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							plugins: [
								require('autoprefixer')({
									broswer: 'last 5 versions'
								}),
							]
						}
					},
					{
						loader: 'less-loader',
						options: {
							javascriptEnabled: true
						}
					}
				]
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						plugins: [
							[
								"import",
								{
									"libraryName": "antd",
									"style": true
								}
							]
						]
					}
				}
			},
			{
				test: /\.(png|svg)$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 8192,
						name: '[name]_[hash:6].[ext]'
					}
				}]
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 12000,
						name: '[name]_[hash:6].[ext]'
					}
				}]
			}
		]
	},
	resolve: {
		modules: [
			path.join(__dirname, './src'),
			path.join(__dirname, './node_modules'),
			path.join(__dirname, './example')
		],
		extensions: ['.js', '.jsx']
	},
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
}