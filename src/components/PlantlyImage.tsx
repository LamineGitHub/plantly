import { useWindowDimensions } from "react-native";
import { Image } from "expo-image";

type Props = {
  size?: number;
  imageUri?: string;
};

export function PlantlyImage({ size, imageUri }: Props) {
  const { width } = useWindowDimensions();

  const imageSize = size || Math.min(width / 1.5, 400);

  return (
    <Image
      className="border"
      source={imageUri ? { uri: imageUri } : require("@/assets/plantly.png")}
      style={{ width: imageSize, height: imageSize, borderRadius: 6 }}
    />
  );
}
