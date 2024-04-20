import { useRef } from "react"
import { BottomSheetRef } from "@/ui/components/bottom-sheet"

export function useSheetLanguage() {
	const ref = useRef<BottomSheetRef>(null)

	function handleCloseSheetLanguage() {
		ref?.current?.close()
	}

	function handleOpenSheetLanguage() {
		ref?.current?.expand()
	}

	return {
		sheetLanguageRef: ref,
		handleCloseSheetLanguage,
		handleOpenSheetLanguage
	 }
}
