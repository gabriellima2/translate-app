import { useEffect } from 'react'
import { SafeAreaView } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import * as SplashScreen from 'expo-splash-screen'
import { Stack } from 'expo-router'
import {
  useFonts,
  OpenSans_400Regular,
  OpenSans_500Medium,
  OpenSans_600SemiBold,
} from '@expo-google-fonts/open-sans';

import { STATUS_BAR_HEIGHT } from '@/constants/status-bar-height'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  let [loaded, error] = useFonts({
    OpenSans_400Regular,
    OpenSans_500Medium,
    OpenSans_600SemiBold,
  });

  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) return null

	return (
		<GestureHandlerRootView className='flex-1'>
			<SafeAreaView
				className="flex-1 bg-neutral-950"
				style={{ paddingTop: Number(STATUS_BAR_HEIGHT ?? 44) }}
			>
				<Stack screenOptions={{ contentStyle: { flex: 1, backgroundColor: "transparent" }}} />
			</SafeAreaView>
		</GestureHandlerRootView>
  )
}
