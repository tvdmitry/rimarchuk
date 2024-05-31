import {Configuration} from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types";
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import path from "path";
import CopyPlugin from "copy-webpack-plugin";

export function buildPlugins({mode, paths, analyzer}: BuildOptions): Configuration['plugins'] {
	const isDev = mode === 'development';
	const isProd = mode === 'production';

	const commonPlugins = [
		new HtmlWebpackPlugin({
			template: paths.html,
			favicon: path.resolve(paths.public, 'favicon.png')
		}),
	]

	if (isDev) {
		return [
			...commonPlugins,
			// Выносит проверку в отдельный процесс не нагружая сборку
			new ReactRefreshWebpackPlugin(),
			new ForkTsCheckerWebpackPlugin(),
		]
	}


	if (isProd) {
		return [
			...commonPlugins,
			new MiniCssExtractPlugin({
				filename: 'css/[name].[contenthash:8].css',
				chunkFilename: 'css/[name].[contenthash:8].css',
			}),
			new CopyPlugin({
				patterns: [
					{
						from: path.resolve(paths.public, 'favicon.png'),
						to: path.resolve(paths.output)
					},
					{
						from: path.resolve(paths.public, 'manifest.json'),
						to: path.resolve(paths.output)
					},
					{
						from: path.resolve(paths.public, 'robots.txt'),
						to: path.resolve(paths.output)
					},
				],
			}),
			analyzer && new BundleAnalyzerPlugin()
		].filter(Boolean)
	}
}