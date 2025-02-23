import { useFonts } from "expo-font";
import * as QuickActions from "expo-quick-actions";
import { useQuickActionRouting } from "expo-quick-actions/router";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Platform } from "react-native";
import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useQuickActionRouting();

  const [loaded, error] = useFonts({
    "Inter-bold": require("@/assets/fonts/Inter-Bold.ttf"),
    "Inter-medium": require("@/assets/fonts/Inter-Medium.ttf"),
    "Inter-regular": require("@/assets/fonts/Inter-Regular.ttf"),
    "Inter-semibold": require("@/assets/fonts/Inter-SemiBold.ttf"),
    "Inter-italic": require("@/assets/fonts/Inter-Italic.ttf"),
    Caveat: require("@/assets/fonts/Caveat-Regular.ttf"),
  });

  useEffect(() => {
    QuickActions.setItems([
      {
        title: "Add a plant",
        icon: Platform.OS === "ios" ? "symbol:leaf" : "leaf",
        id: "0",
        params: { href: "/newPlant" },
      },
    ]);
  }, []);

  useEffect(() => {
    if (error) throw error;
    if (loaded) SplashScreen.hideAsync();
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ animation: "fade" }} />
        <Stack.Screen
          name="(tabs)"
          options={{ animation: "fade_from_bottom" }}
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
