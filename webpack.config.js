const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const SRC_Dir = path.resolve(__dirname, "src");
const DIST_Dir = path.resolve(__dirname, "dist");

module.exports = {
	entry: SRC_Dir + "/index.js",
	output: {
		path: DIST_Dir,
		filename: "bundle.js",
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: "/node_modules/",
				use: {
					loader: "babel-loader",
				},
			},
			{
				test: /\.(scss)$/,
				use: [
					"style-loader",
					"css-loader",
					"sass-loader",
					{
						loader: "postcss-loader",
						options: {
							plugins: function () {
								return [require("autoprefixer")];
							},
						},
					},
				],
			},
			{
				test: /\.(svg|png|jpg|jpeg|gif)$/,
				use: {
					loader: "file-loader",
					options: {
						name: "[name].[ext]",
						outputPath: `./public/assets/img`,
					},
				},
			},
			{
				test: /.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name].[ext]",
							outputPath: `./public/assets/fonts`,
						},
					},
				],
			},
		],
	},
	devtool: "nosources-source-map",
	devServer: {
		compress: true,
		port: 80,
		historyApiFallback: true,
		host: "0.0.0.0",
		hot: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "public/index.html"),
		}),
	],
	node: {
		fs: "empty",
	},
};
