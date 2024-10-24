import { Tabs } from "expo-router";
import { BottomNavigationHome } from "../../navigation/BottomNavigationHome";


export default function RootLayout() {

  return (
    <Tabs
      tabBar={(props) => <BottomNavigationHome {...props} />}
      screenOptions={{
        headerShown: false
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="cards" />
      <Tabs.Screen name="history" /> 
      <Tabs.Screen name="config" /> 
    </Tabs>
  );
}
