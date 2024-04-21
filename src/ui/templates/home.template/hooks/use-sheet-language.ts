import { useState } from "react"

export function useSheetLanguage() {
	const [isOpen, setIsOpen] = useState(false)

	function handleCloseSheetLanguage() {
		setIsOpen(false)
	}

	function handleOpenSheetLanguage() {
		setIsOpen(true)
	}

	return {
		isOpenSheetLanguage: isOpen,
		handleCloseSheetLanguage,
		handleOpenSheetLanguage
	 }
}
