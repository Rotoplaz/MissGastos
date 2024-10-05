import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';



export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ApplicationProvider  {...eva} theme={colorScheme === 'dark' ? eva.dark : eva.light}>
      <IconRegistry icons={EvaIconsPack} />

      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
      </Stack>
    </ApplicationProvider>

  );
}
