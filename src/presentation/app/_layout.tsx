import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { ApplicationProvider, IconRegistry, Layout } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { ThemeProvider } from "@react-navigation/native";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? eva.dark : eva.light;
  const backgroundColor =
    colorScheme === "dark"
      ? theme["color-basic-800"]
      : theme["color-basic-100"];

  return (
    <ApplicationProvider {...eva} theme={theme}>
      <IconRegistry icons={EvaIconsPack} />
      <ThemeProvider
        value={{
          dark: colorScheme === "dark",
          colors: {
            primary: theme["color-primary-500"],
            background: backgroundColor,
            card: theme["color-basic-100"],
            text: theme["text-basic-color"],
            border: theme["color-basic-800"],
            notification: theme["color-primary-500"],
          },
        }}
      >
        <Layout style={{flex: 1, backgroundColor: backgroundColor}}>
          <Stack
            screenOptions={{
              headerShown: false,
              
            }}
          >
            <Stack.Screen name="(home)" />
            <Stack.Screen name="profile"  />
            <Stack.Screen name="config" />
            
          </Stack>
        </Layout>
      </ThemeProvider>
    </ApplicationProvider>
  );
}
