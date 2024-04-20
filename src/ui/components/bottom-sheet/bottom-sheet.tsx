import { PropsWithChildren, forwardRef, useImperativeHandle } from 'react'
import colors from 'tailwindcss/colors'
import GorhomBottomSheet, {
	BottomSheetProps as GorhomBottomSheetProps,
} from '@gorhom/bottom-sheet'

import { BottomSheetOverlay } from './components/bottom-sheet-overlay'
import { useBottomSheetState } from './hooks/use-bottom-sheet-state'

export type BottomSheetRef = {
	expand: () => void
	close: () => void
}

export type BottomSheetProps = GorhomBottomSheetProps & PropsWithChildren

export const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(
	(props, ref) => {
		const { children } = props
		const { bottomSheetRef, handleClose, handleExpand } = useBottomSheetState()

		useImperativeHandle(
			ref,
			() => ({
				expand: handleExpand,
				close: handleClose,
			}),
			[]
		)

		return (
			<GorhomBottomSheet
				ref={bottomSheetRef}
				detached
				enablePanDownToClose
				enableDynamicSizing
				backdropComponent={BottomSheetOverlay}
				backgroundStyle={{ backgroundColor: colors.neutral[800] }}
				handleIndicatorStyle={{
					marginTop: 4,
					backgroundColor: colors.neutral[500],
				}}
				{...props}
			>
				{children}
			</GorhomBottomSheet>
		)
	}
)

BottomSheet.displayName = 'BottomSheet'
