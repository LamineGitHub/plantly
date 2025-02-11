import { useEffect } from "react";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "Inter-bold": require("@/assets/fonts/Inter-Bold.ttf"),
    "Inter-medium": require("@/assets/fonts/Inter-Medium.ttf"),
    "Inter-regular": require("@/assets/fonts/Inter-Regular.ttf"),
    "Inter-semibold": require("@/assets/fonts/Inter-SemiBold.ttf"),
    Caveat: require("@/assets/fonts/Caveat-Regular.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (loaded) SplashScreen.hideAsync();
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ animation: "fade" }} />
        <Stack.Screen
          name="onboarding"
          options={{ presentation: "modal", animation: "fade" }}
        />
        <Stack.Screen
          name="newPlant"
          options={{
            headerShown: true,
            presentation: "modal",
            title: "New Plant",
            headerTitleStyle: {
              fontFamily: "Inter-semibold",
              fontSize: 20,
            },
          }}
        />
      </Stack>
    </>
  );
}
