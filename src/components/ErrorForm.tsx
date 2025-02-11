import { Text } from "react-native";

export default function ErrorForm({ message }: { message: string }) {
  return <Text className="mt-2 text-red-500">{message}</Text>;
}
