import { useState } from "react"
import { Keyboard } from "react-native"

export function useSheetLanguage() {
	const [isOpen, setIsOpen] = useState(false)

	function handleCloseSheetLanguage() {
		setIsOpen(false)
	}

	function handleOpenSheetLanguage() {
		Keyboard.dismiss()
		setIsOpen(true)
	}

	return {
		isOpenSheetLanguage: isOpen,
		handleCloseSheetLanguage,
		handleOpenSheetLanguage
	 }
}
