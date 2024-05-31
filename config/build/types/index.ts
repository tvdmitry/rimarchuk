export type BuildPaths = Record<'public' | 'entry' | 'output' | 'html' | 'src', string>

export type BuildMode = 'production' | 'development';

export type BuildPlatform = 'mobile' | 'desktop';

export interface BuildOptions {
	port: number;
	mode: BuildMode;
	paths: BuildPaths;
	analyzer?: boolean;
	platform?: BuildPlatform
}