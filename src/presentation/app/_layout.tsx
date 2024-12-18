import { Stack } from "expo-router";
import { ApplicationProvider, IconRegistry, Layout } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { ThemeProvider } from "@react-navigation/native";
import { default as customThemeDark } from "../theme/custom-theme-dark.json";
import { default as customThemeLight } from "../theme/theme-light.json"
import { useThemeStore } from "../store/theme/useColorThemeStore";

export default function RootLayout() {
  const { theme: themeScheme } = useThemeStore(); 
  const isDarkTheme = themeScheme === "dark"; 

  const theme = isDarkTheme ? {...eva.dark, ...customThemeDark} : {...eva.light, ...customThemeLight};
  const backgroundColor =
    isDarkTheme
      ? theme["color-basic-800"]
      : theme["color-basic-100"];

  return (
    <ApplicationProvider {...eva} theme={theme}>
      <IconRegistry icons={EvaIconsPack} />
      <ThemeProvider
        value={{
          dark: isDarkTheme,
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
            <Stack.Screen name="index" />
            <Stack.Screen name="profile"  />
            <Stack.Screen name="settings" />
            <Stack.Screen name="initial" />
            <Stack.Screen name="creditCard" />
            <Stack.Screen name="createCard" />
            <Stack.Screen name="debitCard" />
            <Stack.Screen name="remainders" />
            <Stack.Screen name="createTransaction" />
            <Stack.Screen name="createCategory" />
            <Stack.Screen name="categoryInformation" />
            <Stack.Screen name="ExpenseInformation" />
            <Stack.Screen name="incomeInformation" />
            <Stack.Screen name="updateExpense" />
            <Stack.Screen name="createRemainder" />
            <Stack.Screen name="updateReminder" />
            
          </Stack>
        </Layout>
      </ThemeProvider>
    </ApplicationProvider>
  );
}
