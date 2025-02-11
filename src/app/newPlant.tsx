import { Alert, View } from "react-native";
import { useState } from "react";
import { PlantlyImage } from "@/components/PlantlyImage";
import { PlantlyButton } from "@/components/PlantlyButton";
import { PlantyRowForm } from "@/components/PlantyRowForm";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function NewPlant() {
  const [name, setName] = useState("");
  const [days, setDays] = useState("");

  // todo: form with react-hook-form
  const handleSubmit = () => {
    if (!name) {
      return Alert.alert("Validation Error", "Give your plant a name");
    }

    if (!days) {
      return Alert.alert(
        "Validation Error",
        `How often does ${name} need to be watered?`,
      );
    }

    if (Number.isNaN(Number(days))) {
      return Alert.alert(
        "Validation Error",
        "Watering frequency must be a be a number",
      );
    }

    setName("");
    setDays("");
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
      <PlantyRowForm
        label="Name"
        placeholder="E.g. Casper the Cactus"
        value={name}
        onChange={setName}
        autoCapitalize="words"
      />
      <PlantyRowForm
        label="Watering Frequency (every x days)"
        placeholder="E.g. 7"
        value={days}
        onChange={setDays}
        keyboardType="number-pad"
      />
      <PlantlyButton title="Add plant" onPress={handleSubmit} />
    </KeyboardAwareScrollView>
  );
}
