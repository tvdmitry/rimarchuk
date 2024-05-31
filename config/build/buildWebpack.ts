import {type Configuration} from "webpack";
import {buildDevServer} from "./buildDevServer";
import {buildLoaders} from "./buildLoaders";
import {buildPlugins} from "./buildPlugins";
import {buildResolvers} from "./buildResolvers";
import {BuildOptions} from "./types";

export function buildWebpack(options: BuildOptions): Configuration {
	const {mode, port, paths} = options;

	const isDev = options.mode === 'development';
	const isProd = options.mode === 'production';

	return {
		mode,
		entry: paths.entry,
		output: {
			path: paths.output,
			filename: '[name].bundle.js',
			clean: true
		},
		module: {
			rules: buildLoaders(options),
		},
		resolve: buildResolvers(options),
		devServer: isDev ? buildDevServer(options) : undefined,
		plugins: buildPlugins(options),
		devtool: isDev && 'inline-source-map',
		optimization: {
			runtimeChunk: 'single',
		},
	}
}