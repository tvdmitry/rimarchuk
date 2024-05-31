import { type Configuration } from 'webpack';
import {buildWebpack} from "./config/build/buildWebpack";
import {BuildMode, BuildPaths } from "./config/build/types";
import path from "path";

interface IEnvVariables {
	port: number;
	mode: BuildMode;
	paths: BuildPaths;
	analyzer?: string;
}

const paths: BuildPaths = {
	entry: path.resolve(__dirname, 'src', 'index.tsx'),
	output: path.resolve(__dirname, 'build'),
	html: path.resolve(__dirname, 'public', 'index.html'),
	src: path.resolve(__dirname, 'src'),
	public: path.resolve(__dirname, 'public')
}

export default (
	{
		port = 3000,
		mode = 'development',
		analyzer,
	}: IEnvVariables
): Configuration => {
	const buildConfig = buildWebpack({
		port,
		mode,
		paths,
		analyzer: analyzer === 'true',
	});

	return buildConfig
};