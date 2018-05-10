const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

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
						presets: ['react', 'env', 'stage-0'],
						plugins: [
							[
								'import',
								{
									libraryName: 'antd',
									style: true
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
	}
}