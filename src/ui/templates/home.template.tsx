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
	const [toTranslateText, setToTranslateText] = useState('')
	const [translateResult, setTranslateResult] = useState('')
	const sheetLanguageSelectRef = useRef<BottomSheetRef>(null)
	const [languageConfig, setLanguageConfig] = useState<{ from: LanguageCode, to: LanguageCode }>({
		to: 'pt',
		from: 'en'
	})
	const [action, setAction] = useState<TranslateType>('from')

	async function handleTranslate(text: string) {
		try {
			if (!text) return setTranslateResult('')
			const result = await translate(text, { from: languageConfig.from, to: languageConfig.to })
			setTranslateResult(result)
		} catch (err) {
			console.log(err)
		}
	}

	function handleListenPronunciation(text: string, language: string) {
		if (!text) return
		Speech.speak(text, { language })
	}

	function handleLanguageAlternate() {
		setLanguageConfig((prevState) => ({ to: prevState.from, from: prevState.to }))
		setTranslateResult(toTranslateText)
		setToTranslateText(translateResult)
	}

	function handleSelectedLanguageChange(language: LanguageCode) {
		const isAlreadySelectedLanguagesConfig =
			language === languageConfig.from || language === languageConfig.to
		if (isAlreadySelectedLanguagesConfig) {
			handleCloseSheetLanguage()
			return handleLanguageAlternate()
		}
		if (action === 'from') {
			setToTranslateText('')
			setLanguageConfig((prevState) => ({ ...prevState, from: language }))
		}
		if (action === 'to') {
			setLanguageConfig((prevState) => ({ ...prevState, to: language }))
		}
		handleCloseSheetLanguage()
	}

	function handleCloseSheetLanguage() {
		sheetLanguageSelectRef?.current?.close()
	}

	function handleOpenSheetLanguage() {
		sheetLanguageSelectRef?.current?.close()
	}

	const languagesName = {
		to: languages[languageConfig.to].name,
		from: languages[languageConfig.from].name
	}

	useEffect(() => {
		if (toTranslateText) return
		setTranslateResult('')
	}, [toTranslateText])

	useEffect(() => {
		if (!toTranslateText) return
		handleTranslate(toTranslateText)
	}, [languageConfig.to])

	return (
		<View className="flex-1 p-4 gap-y-4">
			<View className="bg-neutral-800 rounded-3xl min-h-[124px] p-4 justify-between">
				<Typography.Title className="text-sm">{languagesName.from}</Typography.Title>
				<TextInput
					placeholder="Type something..."
					value={toTranslateText}
					onChangeText={(t) => {
						setToTranslateText(t)
						debounce(async () => await handleTranslate(t), 250)
					}}
					placeholderTextColor={colors.neutral[400]}
					className="text-white text-lg font-subtitle my-4"
					multiline
				/>
				<AudioButton
					disabled={!translate}
					onPress={() => handleListenPronunciation(toTranslateText, languageConfig.from)}
					accessibilityLabel="Listen to pronunciation"
					className="self-end"
				/>
			</View>
			<View className="bg-neutral-800 rounded-3xl min-h-[124px] p-4 justify-between">
				<Typography.Title className="text-sm text-emerald-300">{languagesName.to}</Typography.Title>
				<TextInput
					placeholder="Translation..."
					readOnly
					value={translateResult}
					placeholderTextColor={colors.neutral[400]}
					className="text-lg font-subtitle my-4 text-emerald-300"
					multiline
				/>
				<AudioButton
					disabled={!translate}
					onPress={() => handleListenPronunciation(translateResult, languageConfig.to)}
					accessibilityLabel="Listen to pronunciation"
					className="self-end"
				/>
			</View>
			<View className="flex-row w-full">
				<LanguageSelect.Trigger
					activeLanguage={languagesName.from}
					handleExpand={() => {
						setAction('from')
						handleOpenSheetLanguage()
					}}
				/>
				<TouchableOpacity
					onPress={handleLanguageAlternate}
					activeOpacity={0.8}
					className="bg-neutral-800 rounded-full mx-4 w-12 h-12 items-center justify-center"
				>
					<ArrowLeftRight size={20} color={colors.emerald[300]} />
				</TouchableOpacity>
				<LanguageSelect.Trigger
					activeLanguage={languagesName.to}
					handleExpand={() => {
						setAction('to')
						handleOpenSheetLanguage()
					}}
				/>
			</View>
			<LanguageSelect.Root
				ref={sheetLanguageSelectRef}
				language={languageConfig[action]}
				onLanguageChange={handleSelectedLanguageChange}
			/>
		</View>
	)
}
