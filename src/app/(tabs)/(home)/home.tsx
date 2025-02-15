import { FlatList } from "react-native";
import { useRouter } from "expo-router";
import { PlantCard } from "@/components/PlantCard";
import { usePlantsStore } from "@/store/usePlantsStore";
import { PlantlyButton } from "@/components/PlantlyButton";

export default function Home() {
  const router = useRouter();
  const plants = usePlantsStore.use.plants();

  return (
    <FlatList
      className="flex-1 bg-white"
      contentContainerClassName="p-3"
      data={plants}
      renderItem={({ item }) => <PlantCard plant={item} />}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={() => (
        <PlantlyButton
          className="mt-3"
          title="Add your first plant"
          onPress={() => router.navigate("/newPlant")}
        />
      )}
    />
  );
}
