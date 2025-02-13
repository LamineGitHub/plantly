import { Pressable } from "react-native";
import { Link, Stack } from "expo-router";
import { CirclePlus } from "lucide-react-native";
import { theme } from "@/theme";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: true,
          headerBackVisible: false,
          headerTitleStyle: {
            fontFamily: "Inter-bold",
            fontSize: 24,
          },
          headerRight: () => (
            <Link href="/newPlant" asChild>
              <Pressable hitSlop={20} className="mr-4">
                <CirclePlus size={24} color={theme.colorGreen} />
              </Pressable>
            </Link>
          ),
        }}
      />
      <Stack.Screen name="plant/[plantId]" />
    </Stack>
  );
}
