import { Platform, Pressable, Text } from "react-native";
import * as Haptics from "expo-haptics";

type Props = {
  title: string;
  className?: string;
  onPress: () => void;
};

export function PlantlyButton({ title, className, onPress }: Props) {
  const handlePressed = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress();
  };

  return (
    <Pressable
      onPress={handlePressed}
      className={`rounded-md bg-colorGreen px-4 py-3 active:bg-colorLeafyGreen ${className}`}
    >
      <Text className="text-center font-inter-bold text-lg text-white">
        {title}
      </Text>
    </Pressable>
  );
}
