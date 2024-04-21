import { useState } from "react"

export function useVisualFeedback() {
	const [isTranslating, setIsTranslating] = useState(false)

	function setTranslationHasStarted() {
		setIsTranslating(true)
	}


	function setTranslationHasFinished() {
		setIsTranslating(false)
	}

	return {
		isTranslating,
		setTranslationHasStarted,
		setTranslationHasFinished
	}
}
