import * as Speech from 'expo-speech'
import { SpeakAdapter } from "./speak.adapter"

class SpeakAdapterImpl implements SpeakAdapter {
	execute(sentence: string, languageCode: string): void {
		if (!sentence) return
		Speech.speak(sentence, { language: languageCode })
	}
}

export const makeSpeakAdapter = () => new SpeakAdapterImpl()
