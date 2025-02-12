import { Link, Redirect, Tabs } from "expo-router";
import { CirclePlus, Leaf, User } from "lucide-react-native";
import { useUserStore } from "@/store/useStore";
import { Pressable } from "react-native";
import { theme } from "@/theme";

export default function Layout() {
  const hasFinishedOnboarding = useUserStore((s) => s.hasFinishedOnboarding);

  if (!hasFinishedOnboarding) {
    return <Redirect href="/" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colorGreen,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: true,
          headerTitleStyle: {
            fontFamily: "Inter-semibold",
            fontSize: 20,
          },
          tabBarIcon: ({ color, size }) => <Leaf color={color} size={size} />,
          headerRight: () => (
            <Link href="/newPlant" asChild>
              <Pressable hitSlop={20} onPress={() => {}} className="mr-4">
                <CirclePlus size={24} color={theme.colorGreen} />
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
