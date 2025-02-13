import { Platform, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from "expo-image-picker";

import { PlantlyButton } from "@/components/PlantlyButton";
import { PlantlyImage } from "@/components/PlantlyImage";
import { PlantyRowForm } from "@/components/PlantyRowForm";
import { createPlantSchema, type PlantFormData } from "@/schemas/plant";
import { usePlantStore } from "@/store/plantsStore";

export default function NewPlant() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PlantFormData>({
    defaultValues: { name: "", days: 0 },
    resolver: zodResolver(createPlantSchema()),
    mode: "onBlur",
  });

  const router = useRouter();
  const [imageUri, setImageUri] = useState("");
  const addPlant = usePlantStore((state) => state.addPlant);

  const onSubmit = ({ name, days }: PlantFormData) => {
    addPlant(name, days, imageUri);
    reset();
    router.back();
  };

  const handleChooseImage = async () => {
    if (Platform.OS === "web") return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <KeyboardAwareScrollView
      className="flex-1 bg-white"
      contentContainerClassName="px-6 pb-28 pt-6 gap-6"
      keyboardShouldPersistTaps="handled"
    >
      <TouchableOpacity
        className="items-center rounded-lg border-2 border-dashed border-gray-300"
        onPress={handleChooseImage}
        activeOpacity={0.7}
      >
        <PlantlyImage imageUri={imageUri} />
      </TouchableOpacity>

      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <PlantyRowForm
            label="Name"
            placeholder="E.g. Casper the Cactus"
            onChange={onChange}
            value={value}
            onBlur={onBlur}
            autoCapitalize="words"
            error={errors.name}
          />
        )}
      />

      <Controller
        control={control}
        name="days"
        render={({ field: { onChange, onBlur, value } }) => (
          <PlantyRowForm
            label="Watering Frequency (every x days)"
            placeholder="E.g. 5"
            onChange={onChange}
            value={value}
            onBlur={onBlur}
            keyboardType="number-pad"
            error={errors.days}
          />
        )}
      />

      <PlantlyButton title="Add plant" onPress={handleSubmit(onSubmit)} />
    </KeyboardAwareScrollView>
  );
}
