import { useRouter } from "expo-router";
import { useUserStore } from "@/store/useStore";
import { PlantlyButton } from "@/components/PlantlyButton";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "@/theme";
import { StatusBar } from "expo-status-bar";
import { PlantlyImage } from "@/components/PlantlyImage";
import { Text, View } from "react-native";

export default function OnboardingScreen() {
  const router = useRouter();
  const toggleHasOnboarded = useUserStore((state) => state.toggleHasOnboarded);

  const handlePress = () => {
    toggleHasOnboarded();
    router.replace("/home");
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
