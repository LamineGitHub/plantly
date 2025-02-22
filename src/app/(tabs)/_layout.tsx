import { Redirect, Tabs } from "expo-router";
import { Leaf, User } from "lucide-react-native";
import { theme } from "@/theme";
import { useOnboardingStore } from "@/store/useOnboardingStore";

export default function Layout() {
  const hasFinishedOnboarding = useOnboardingStore.use.hasFinishedOnboarding();

  if (hasFinishedOnboarding) {
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
        name="(home)"
        options={{
          tabBarIcon: ({ color, size }) => <Leaf color={color} size={size} />,
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
