import { forwardRef } from "react";
import { TouchableOpacity } from "react-native"
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Check } from "lucide-react-native"
import colors from "tailwindcss/colors"

import { BottomSheet, BottomSheetRef } from "./bottom-sheet";
import { Typography } from "@/ui/atoms/typography"

import { languages } from "@/constants/languages";
import { cn } from "@/helpers/cn"

import type { LanguageCode } from "@/@types/language-code";

export type LanguageSelectProps = {
	language: string
	onLanguageChange: (language: LanguageCode) => void
}

export type TriggerProps = {
	activeLanguage: string
	handleExpand: () => void
}

export type ItemProps = {
	isActive?: boolean
	label: string
	onChange: () => void
}

const LANGUAGES_LIST = Object.entries(languages)

const Root = forwardRef<BottomSheetRef, LanguageSelectProps>((props, ref) => {
	const { language, onLanguageChange } = props
	return (
		<BottomSheet ref={ref} snapPoints={['75%']} enableDynamicSizing={false}>
			<BottomSheetFlatList
				data={LANGUAGES_LIST}
				keyExtractor={(i) => i[0]}
				renderItem={({ item }) => (
					<Item
						label={item[1].name}
						isActive={item[0] === language}
						onChange={() => onLanguageChange(item[0] as LanguageCode)}
					/>
				)}
				contentContainerStyle={{ padding: 16 }}
			/>
		</BottomSheet>
	)
})


function Item(props: ItemProps) {
	const { isActive, label, onChange } = props
	return (
		<TouchableOpacity
			onPress={onChange}
			className={cn("flex-row justify-between p-4 rounded-3xl", { 'bg-neutral-700': isActive })}
		>
			<Typography.Title
				className={cn("text-sm", { 'text-emerald-300': isActive })}
			>
				{label}
			</Typography.Title>
			{ isActive && <Check size={20} color={colors.emerald[300]} /> }
		</TouchableOpacity>
	)
}

function Trigger(props: TriggerProps) {
	const { activeLanguage, handleExpand } = props
	return (
		<TouchableOpacity onPress={handleExpand} activeOpacity={0.8} className="flex-1 items-center bg-neutral-800 p-4 rounded-3xl">
			<Typography.Label className="text-emerald-300">{activeLanguage}</Typography.Label>
		</TouchableOpacity>
	)
}

export const LanguageSelect = {
	Root,
	Trigger,
	Item
}
