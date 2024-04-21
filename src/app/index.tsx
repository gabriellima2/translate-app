import { Stack } from 'expo-router'
import { HomeTemplate } from '../ui/templates/home.template'

export default function Page() {
	return (
		<>
			<Stack.Screen options={{ headerShown: false }} />
			<HomeTemplate />
		</>
	)
}
