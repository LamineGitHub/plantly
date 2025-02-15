import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";

import { theme } from "@/theme";
import { PlantlyButton } from "@/components/PlantlyButton";
import { PlantlyImage } from "@/components/PlantlyImage";
import { useOnboardingStore } from "@/store/useOnboardingStore";

export default function OnboardingScreen() {
  const router = useRouter();
  const setHasFinishedOnboarding =
    useOnboardingStore.use.setHasFinishedOnboarding();

  const handlePress = () => {
    router.replace("/home");
    setHasFinishedOnboarding(false);
  };

  return (
    <>
      <StatusBar style="light" />
      <LinearGradient
        className="flex-1 items-center justify-evenly bg-white p-6"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={[theme.colorGreen, theme.colorAppleGreen, theme.colorLimeGreen]}
      >
        <View>
          <Text className="mb-3 text-center font-inter-bold text-5xl text-white">
            Plantly
          </Text>
          <Text className="text-center font-caveat text-[34px] text-white">
            Keep your plants healthy and hydrated
          </Text>
        </View>
        <PlantlyImage />
        <PlantlyButton title="Let me in!" onPress={handlePress} />
      </LinearGradient>
    </>
  );
}
