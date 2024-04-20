import { debounce } from "@/helpers/debounce";
import { useEffect, useRef, useState } from "react";
import { ArrowLeftRight } from "lucide-react-native";
import { TextInput, TouchableOpacity, View } from "react-native";
import colors from "tailwindcss/colors";
import * as Speech from 'expo-speech';
import translate from "translate";

import { LanguageSelect } from "../components/language-select";
import { BottomSheetRef } from "../components/bottom-sheet";
import { AudioButton } from "../components/audio-button";
import { Typography } from "../atoms/typography";

import { languages } from "@/constants/languages";
import type { LanguageCode } from "@/@types/language-code";

type TranslateType = 'from' | 'to'

export function HomeTemplate() {
	const [value, setValue] = useState('')
	const [translated, setTranslated] = useState('')
	const languageRef = useRef<BottomSheetRef>(null)
	const [language, setLanguage] = useState<{ from: LanguageCode, to: LanguageCode }>({
		to: 'pt',
		from: 'en'
	})
	const [action, setAction] = useState<TranslateType>('from')

	async function handleTranslate(v: string) {
		try {
			if (!v) return setTranslated('')
			const result = await translate(v, { from: language.from, to: language.to })
			setTranslated(result)
		} catch (err) {
			console.log(err)
		}
	}

	function handleListen(sentence: string, language: string) {
		if (!sentence) return
		Speech.speak(sentence, { language })
	}

	function handleAlternate() {
		setLanguage((prevState) => ({ to: prevState.from, from: prevState.to }))
		setTranslated(value)
		setValue(translated)
	}

	const languagesName = {
		to: languages[language.to].name,
		from: languages[language.from].name
	}

	useEffect(() => {
		if (value) return
		setTranslated('')
	}, [value])

	useEffect(() => {
		if (!value) return
		handleTranslate(value)
	}, [language.to])

	return (
		<View className="flex-1 p-4 gap-y-4">
			<View className="bg-neutral-800 rounded-3xl min-h-[124px] p-4 justify-between">
				<Typography.Title className="text-sm">{languagesName.from}</Typography.Title>
				<TextInput
					placeholder="Type something..."
					value={value}
					onChangeText={(t) => {
						setValue(t)
						debounce(async () => await handleTranslate(t), 250)
					}}
					placeholderTextColor={colors.neutral[400]}
					className="text-white text-lg font-subtitle my-4"
					multiline
				/>
				<AudioButton
					disabled={!translate}
					onPress={() => handleListen(value, language.from)}
					accessibilityLabel="Listen to pronunciation"
					className="self-end"
				/>
			</View>
			<View className="bg-neutral-800 rounded-3xl min-h-[124px] p-4 justify-between">
				<Typography.Title className="text-sm text-emerald-300">{languagesName.to}</Typography.Title>
				<TextInput
					placeholder="Translation..."
					readOnly
					value={translated}
					placeholderTextColor={colors.neutral[400]}
					className="text-lg font-subtitle my-4 text-emerald-300"
					multiline
				/>
				<AudioButton
					disabled={!translate}
					onPress={() => handleListen(translated, language.to)}
					accessibilityLabel="Listen to pronunciation"
					className="self-end"
				/>
			</View>
			<View className="flex-row w-full">
				<LanguageSelect.Trigger
					activeLanguage={languagesName.from}
					handleExpand={() => {
						setAction('from')
						languageRef?.current?.expand()
					}}
				/>
				<TouchableOpacity
					onPress={handleAlternate}
					activeOpacity={0.8}
					className="bg-neutral-800 rounded-full mx-4 w-12 h-12 items-center justify-center"
				>
					<ArrowLeftRight size={20} color={colors.emerald[300]} />
				</TouchableOpacity>
				<LanguageSelect.Trigger
					activeLanguage={languagesName.to}
					handleExpand={() => {
						setAction('to')
						languageRef?.current?.expand()
					}}
				/>
			</View>
			<LanguageSelect.Root
				ref={languageRef}
				language={language[action]}
				onLanguageChange={(v) => {
					if (v === language.from || v === language.to) {
						languageRef?.current?.close()
						return handleAlternate()
					}
					if (action === 'from') {
						setValue('')
						setLanguage((prevState) => ({ ...prevState, from: v }))
					}
					if (action === 'to') {
						setLanguage((prevState) => ({ ...prevState, to: v }))
					}
					languageRef?.current?.close()
				}}
			/>
		</View>
	)
}
