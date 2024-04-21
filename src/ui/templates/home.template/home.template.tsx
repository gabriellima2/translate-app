import { debounce } from "@/helpers/debounce";
import { useEffect, useState } from "react";
import { ArrowLeftRight } from "lucide-react-native";
import { TextInput, TouchableOpacity, View } from "react-native";
import colors from "tailwindcss/colors";
import translate from "translate";

import { LanguageSelect } from "@/ui/components/language-select";
import { AudioButton } from "@/ui/components/audio-button";
import { Typography } from "@/ui/atoms/typography";

import { useTranslationForm } from "./hooks/use-translation-form";
import { useVisualFeedback } from "./hooks/use-visual-feedback";
import { useSheetLanguage } from "./hooks/use-sheet-language";

import { makeTranslateAdapter } from "@/adapters/impl/translate.adapter.impl";
import { makeSpeakAdapter } from "@/adapters/impl/speak.adapter.impl";

import { languages } from "@/constants/languages";
import type { LanguageCode } from "@/@types/language-code";

type LanguageConfigType = 'from' | 'to'
type LanguageConfig = { from: LanguageCode, to: LanguageCode }

export function HomeTemplate() {
	const [languageConfig, setLanguageConfig] = useState<LanguageConfig>({ to: 'pt', from: 'en'})
	const [changingLanguageConfig, setChangingLanguageConfig] = useState<LanguageConfigType>('from')
	const {
		translateResult,
		toTranslateText,
		handleToTranslateTextChange,
		handleTranslateResultChange,
		clearToTranslateText,
		clearTranslateResult
	} = useTranslationForm()
	const {
		isOpenSheetLanguage,
		handleCloseSheetLanguage,
		handleOpenSheetLanguage
	} = useSheetLanguage()
	const {
		isTranslating,
		setTranslationHasStarted,
		setTranslationHasFinished,
	} = useVisualFeedback()

	async function handleTranslate(text: string) {
		try {
			if (!text) return clearToTranslateText()
			const result = await makeTranslateAdapter().execute(text, {
				from: languageConfig.from,
				to: languageConfig.to
			})
			handleTranslateResultChange(result)
		} catch (err) {
			console.log(err)
		} finally {
			setTranslationHasFinished()
		}
	}

	function handleListenPronunciation(text: string, language: string) {
		if (!text) return
		makeSpeakAdapter().execute(text, language)
	}

	function handleLanguageAlternate() {
		setLanguageConfig((prevState) => ({ to: prevState.from, from: prevState.to }))
		handleTranslateResultChange(toTranslateText)
		handleToTranslateTextChange(translateResult)
	}

	function handleSelectedLanguageChange(language: LanguageCode) {
		const isAlreadySelectedLanguagesConfig =
			language === languageConfig.from || language === languageConfig.to
		if (isAlreadySelectedLanguagesConfig) {
			handleCloseSheetLanguage()
			return handleLanguageAlternate()
		}
		if (changingLanguageConfig === 'from') {
			clearToTranslateText()
			setLanguageConfig((prevState) => ({ ...prevState, from: language }))
		}
		if (changingLanguageConfig === 'to') {
			setLanguageConfig((prevState) => ({ ...prevState, to: language }))
		}
		handleCloseSheetLanguage()
	}

	const languagesName = {
		to: languages[languageConfig.to].name,
		from: languages[languageConfig.from].name
	}

	useEffect(() => {
		if (toTranslateText) return
		clearTranslateResult()
	}, [toTranslateText])

	useEffect(() => {
		if (!toTranslateText) return
		handleTranslate(toTranslateText)
	}, [languageConfig.to])

	return (
		<View className="flex-1 p-4 gap-y-4 justify-between">
			<View className="gap-y-4">
				<Typography.Title className="mb-4">Text Translation</Typography.Title>
				<View className="bg-neutral-800 rounded-3xl min-h-[124px] p-4 justify-between">
					<Typography.Title className="text-sm">{languagesName.from}</Typography.Title>
					<TextInput
						placeholder="Type something..."
						value={toTranslateText}
						onChangeText={(t) => {
							handleToTranslateTextChange(t)
							setTranslationHasStarted()
							debounce(async () => await handleTranslate(t), 300)
						}}
						placeholderTextColor={colors.neutral[400]}
						className="text-white text-lg font-subtitle my-4"
						multiline
					/>
					<AudioButton
						disabled={!toTranslateText}
						onPress={() => handleListenPronunciation(toTranslateText, languageConfig.from)}
						accessibilityLabel="Listen to pronunciation"
						className="self-end"
					/>
				</View>
					<View className="bg-neutral-800 rounded-3xl min-h-[124px] p-4 justify-between">
						<Typography.Title className="text-sm text-emerald-300">{languagesName.to}</Typography.Title>
						<TextInput
							placeholder={isTranslating ? '...' : 'Translation...'}
							readOnly
							value={isTranslating ? `${translateResult}...` : translateResult}
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
				</View>
			<View className="flex-row w-full">
				<LanguageSelect.Trigger
					activeLanguage={languagesName.from}
					handleExpand={() => {
						setChangingLanguageConfig('from')
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
						setChangingLanguageConfig('to')
						handleOpenSheetLanguage()
					}}
				/>
			</View>
			{isOpenSheetLanguage && (
				<LanguageSelect.Root
					language={languageConfig[changingLanguageConfig]}
					onLanguageChange={handleSelectedLanguageChange}
					onClose={handleCloseSheetLanguage}
				/>
			)}
		</View>
	)
}
