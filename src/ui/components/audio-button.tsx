import { TouchableOpacity, type TouchableOpacityProps } from "react-native";
import { Volume2 } from "lucide-react-native";
import colors from "tailwindcss/colors";

export type AudioButtonProps = TouchableOpacityProps

export function AudioButton(props: AudioButtonProps) {
	return (
		<TouchableOpacity activeOpacity={0.8} {...props}>
			<Volume2 size={20} color={colors.neutral[500]} />
		</TouchableOpacity>
	)
}
