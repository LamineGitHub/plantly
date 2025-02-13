import { useEffect } from "react";
import { Alert, Text, View } from "react-native";
import { differenceInCalendarDays, format } from "date-fns";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { usePlantStore } from "@/store/plantsStore";
import { PlantlyButton } from "@/components/PlantlyButton";
import { PlantlyImage } from "@/components/PlantlyImage";

const fullDateFormat = "LLL d yyyy, h:mm aaa";

export default function PlantDetails() {
  const { plantId } = useLocalSearchParams();
  const navigation = useNavigation();
  const router = useRouter();
  const waterPlant = usePlantStore((state) => state.waterPlant);
  const removePlant = usePlantStore((state) => state.removePlant);
  const plant = usePlantStore((state) =>
    state.plants.find((p) => p.id === plantId),
  );

  useEffect(() => {
    navigation.setOptions({
      title: plant?.name,
      headerTitleStyle: {
        fontFamily: "Inter-semibold",
        fontSize: 24,
      },
    });
  }, [plant?.name, navigation]);

  const handleWaterPlant = () => {
    if (typeof plantId === "string") waterPlant(plantId);
  };

  const handleDeletePlant = () => {
    if (!plant?.id) return;

    Alert.alert(
      `Are you sure you want to delete ${plant?.name}?`,
      "It will be gone for good",
      [
        {
          text: "Yes",
          style: "destructive",
          onPress: () => {
            removePlant(plant.id);
            router.navigate("/home");
          },
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
    );
  };

  if (!plant) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="font-inter-semiBold text-lg">
          Plant with {plantId} not found
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center bg-white p-5">
      <View className="items-center">
        <PlantlyImage imageUri={plant.imageUri} />
        <View className="mt-5" />

        <DetailRow
          label={"Water me every"}
          value={`${plant.wateringFrequencyDays} days`}
        />

        <DetailRow
          label={"Last watered at"}
          value={
            plant.lastWateredAtTimestamp
              ? `${format(plant.lastWateredAtTimestamp, fullDateFormat)}`
              : "Never 😟"
          }
        />

        <DetailRow
          label={"Days since last watered"}
          value={
            plant.lastWateredAtTimestamp
              ? differenceInCalendarDays(
                  Date.now(),
                  plant.lastWateredAtTimestamp,
                )
              : "N/A"
          }
        />
      </View>

      <PlantlyButton title="Water me!" onPress={handleWaterPlant} />
      <PlantlyButton
        title="Delete"
        className="mt-4 bg-red-500 active:bg-red-800"
        onPress={handleDeletePlant}
      />
    </View>
  );
}

type DetailsRowProps = {
  label: string;
  value: string | number;
};

const DetailRow = ({ label, value }: DetailsRowProps) => {
  return (
    <View>
      <Text className="text-center font-inter-semiBold text-base ">
        {label}
      </Text>
      <Text className="mb-5 text-center font-inter-bold text-lg text-colorGreen">
        {value}
      </Text>
    </View>
  );
};
