import { Text, View } from "react-native";
import { usePlantStore } from "@/store/plantsStore";

export default function Home() {
  const plants = usePlantStore((state) => state.plants);

  return (
    <View className="flex-1 items-center justify-center gap-y-3 bg-white">
      <Text className="font-inter-bold text-5xl">Home</Text>
      <Text>
        {plants.map((plant) => (
          <Text className="font-inter" key={plant.id}>
            {plant.name}
          </Text>
        ))}
      </Text>
    </View>
  );
}
