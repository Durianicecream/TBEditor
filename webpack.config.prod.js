const webpack = require('webpack')
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
	.BundleAnalyzerPlugin

module.exports = {
	module: {
		rules: [{
				test: /\.(less|css)$/,
				use: [{
						loader: 'style-loader',
					},
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
					loader: 'babel-loader'
				}
			},
			{
				test: /\.(png|svg)$/,
				use: [{
					loader: 'url-loader',
				}]
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				use: [{
					loader: 'url-loader'
				}]
			}
		]
	},
	resolve: {
		modules: [
			path.join(__dirname, './src'),
			path.join(__dirname, './node_modules'),
		],
		extensions: ['.js', '.jsx']
	},
	output: {
		filename: 'editor.js',
		library: 'TbEditor',
		libraryTarget: 'umd'
	},
	externals: {
		react: 'react',
		'react-dom': 'react-dom',
		immutable: 'immutable'
	},
	plugins: [new BundleAnalyzerPlugin()]
}