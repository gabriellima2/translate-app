import { debounce } from "@/helpers/debounce";
import { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import translate from "translate";
import * as Speech from 'expo-speech';
import { languages } from "@/constants/languages";

export function HomeTemplate() {
	const [translated, setTranslated] = useState('')

	async function handleTranslate(v: string) {
		debounce(async () => {
			try {
				if (!v) return
				const result = await translate(v, { from: languages.pt.code, to: languages.en.code })
				setTranslated(result)
			} catch (err) {
				console.log(err)
			}
		}, 250)
	}

	function handleListen() {
		if (!translate) return
		Speech.speak(translated, { language: languages.en.code })
	}

	return (
		<View className="mt-4">
			<View>
				<Text>{translated}</Text>
			</View>
			<TextInput placeholder="Type something..." onChangeText={handleTranslate} />
			<TouchableOpacity disabled={!translate} activeOpacity={0.8} onPress={handleListen}>
				<Text>Listen</Text>
			</TouchableOpacity>
		</View>
	)
}
