import { Text, View } from "react-native";
import { PlantlyButton } from "@/components/PlantlyButton";
import { useUserStore } from "@/store/useStore";
import { usePlantStore } from "@/store/plantsStore";
import { useRouter } from "expo-router";

export default function Profile() {
  const router = useRouter();
  const resetPlants = usePlantStore((state) => state.resetPlants);
  const setHasFinishedOnboarding = useUserStore(
    (s) => s.setHasFinishedOnboarding,
  );

  return (
    <View className="flex-1 items-center justify-center gap-4 bg-white p-6">
      <Text className="font-inter-bold text-5xl font-semibold">Profile</Text>
      <PlantlyButton
        title="Back to onboarding"
        onPress={() => setHasFinishedOnboarding(true)}
      />
      <PlantlyButton
        title="Delete all Plants"
        className="bg-red-500 active:bg-red-800"
        onPress={() => {
          resetPlants();
          router.navigate("/home");
        }}
      />
    </View>
  );
}
