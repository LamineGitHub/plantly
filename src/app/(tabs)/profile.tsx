import { Text, View } from "react-native";
import { PlantlyButton } from "@/components/PlantlyButton";
import { useUserStore } from "@/store/useStore";

export default function Profile() {
  const toggleHasOnboarded = useUserStore((s) => s.toggleHasOnboarded);

  return (
    <View className="flex-1 items-center justify-center gap-4 bg-white">
      <Text className="font-inter-bold text-5xl font-semibold">Profile</Text>
      <PlantlyButton title="Back to onboarding" onPress={toggleHasOnboarded} />
    </View>
  );
}
