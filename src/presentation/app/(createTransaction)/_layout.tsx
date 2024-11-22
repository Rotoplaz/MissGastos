import { Tabs } from "expo-router";
import { TopTabsNavigation } from "../../common/navigation/TopTabsNavigation";

export default function RootLayout() {

  return (
      <Tabs
        tabBar={(props) => <TopTabsNavigation {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen name="index" />
      </Tabs>
  );
}
