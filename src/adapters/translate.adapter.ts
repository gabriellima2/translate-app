export type TranslateOptions = { from: string, to: string }

export interface TranslateAdapter {
	execute(sentence: string, options?: TranslateOptions): Promise<string>
}
