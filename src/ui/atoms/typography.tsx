import { Text, TextProps } from 'react-native'
import { cn } from '@/helpers/cn'

function Title(props: TextProps) {
	const { className, ...rest } = props
	return <Text className={cn(className, 'font-heading text-white text-xl')} {...rest} />
}

function Subtitle(props: TextProps) {
	const { className, ...rest } = props
	return <Text className={cn(className, 'font-subtitle text-white text-lg')} {...rest} />
}

function Paragraph(props: TextProps) {
	const { className, ...rest } = props
	return (
		<Text
			className={cn(className, 'font-body text-zinc-200 text-sm')}
			{...rest}
		/>
	)
}

function Label(props: TextProps) {
	const { className, ...rest } = props
	return <Text className={cn(className, 'font-subtitle text-white text-sm')} {...rest} />
}

function Small(props: TextProps) {
	const { className, ...rest } = props
	return (
		<Text
			className={cn(className, 'font-body text-zinc-200 text-xs')}
			{...rest}
		/>
	)
}

export const Typography = {
	Title,
	Subtitle,
	Paragraph,
	Label,
	Small,
}
