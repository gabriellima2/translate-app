export interface SpeakAdapter {
	execute(sentence: string, languageCode: string): void
}
