import { useState } from 'react'

export function useTranslationForm() {
	const [toTranslateText, setToTranslateText] = useState('')
	const [translateResult, setTranslateResult] = useState('')

	function handleTranslateResultChange(text: string) {
		setTranslateResult(text)
	}

	function handleToTranslateTextChange(text: string) {
		setToTranslateText(text)
	}

	function clearTranslateResult() {
		setTranslateResult('')
	}

	function clearToTranslateText() {
		setToTranslateText('')
	}

	return {
		toTranslateText,
		translateResult,
		handleToTranslateTextChange,
		handleTranslateResultChange,
		clearToTranslateText,
		clearTranslateResult
	}
}
