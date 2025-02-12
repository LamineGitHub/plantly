import { Text, View } from "react-native";
import { PlantType } from "@/types";
import { PlantlyImage } from "@/components/PlantlyImage";

export default function PlantCard({ plant }: { plant: PlantType }) {
  return (
    <View className="mb-3 flex-row rounded-md bg-white p-3 shadow-md shadow-black/60">
      <PlantlyImage size={100} />
      <View className="justify-center p-[14px]">
        <Text numberOfLines={1} className="mb-1 font-inter-bold text-lg">
          {plant.name}
        </Text>
        <Text className="font-inter text-slate-500">
          Water every {plant.wateringFrequencyDays} days
        </Text>
      </View>
    </View>
  );
}
