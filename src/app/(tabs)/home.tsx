import { FlatList } from "react-native";
import { usePlantStore } from "@/store/plantsStore";
import PlantCard from "@/components/PlantCard";
import { PlantlyButton } from "@/components/PlantlyButton";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();
  const plants = usePlantStore((state) => state.plants);

  return (
    <FlatList
      className="flex-1 bg-white"
      contentContainerClassName="p-3"
      data={plants}
      renderItem={({ item }) => <PlantCard plant={item} />}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={() => (
        <PlantlyButton
          title="Add your first plant"
          onPress={() => router.navigate("/newPlant")}
        />
      )}
    />
  );
}
