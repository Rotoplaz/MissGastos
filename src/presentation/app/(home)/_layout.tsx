import { Tabs } from "expo-router";
import { BottomNavigationHome } from "../../common/navigation/BottomNavigationHome";
import { Layout } from "@ui-kitten/components";
import { useTheme } from "@react-navigation/native";


export default function RootLayout() {
  const theme = useTheme()
  return (
    
    <Tabs
      tabBar={(props) => <BottomNavigationHome {...props} />}
      screenOptions={{
        headerShown: false,
        
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="cards" />
      <Tabs.Screen name="history" /> 
      <Tabs.Screen name="categories" /> 
    </Tabs>
  
  );
}
