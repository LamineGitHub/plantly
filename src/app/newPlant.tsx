import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { PlantlyButton } from "@/components/PlantlyButton";
import { PlantlyImage } from "@/components/PlantlyImage";
import { PlantyRowForm } from "@/components/PlantyRowForm";
import { type PlantFormData, plantSchema } from "@/schemas/plant";

export default function NewPlant() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PlantFormData>({
    defaultValues: { name: "", days: 0 },
    resolver: zodResolver(plantSchema),
    mode: "onBlur",
  });

  const onSubmit = ({ name, days }: PlantFormData) => {
    console.log(`Adding plant : name = ${name} and days = ${days}`);
  };

  return (
    <KeyboardAwareScrollView
      className="flex-1 bg-white"
      contentContainerClassName="px-6 pb-28 pt-6 gap-6"
      keyboardShouldPersistTaps="handled"
    >
      <View className="items-center">
        <PlantlyImage />
      </View>

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
