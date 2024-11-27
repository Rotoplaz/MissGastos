import { Icon, Layout, Menu, MenuItem, Text } from "@ui-kitten/components";
import { router } from "expo-router";
import * as SqliteDatabase from "expo-sqlite";
import React from "react";
import { useUserStore } from "../store/user/useUserStore";
import { useTheme } from "@react-navigation/native";
import { LayoutWithTopNavigation } from "../common/layouts/LayoutWithTopNavigation";
import { Alert } from "react-native";
import { getDataBase } from "@/src/infrastructure/db/database";
import { useCardsStore } from "../store";
import { useThemeStore } from "../store/theme/useColorThemeStore";
import { useIncomeStore } from "../store/income/useIncomeStore";
import { useExpenseStore } from "../store/expense/useExpenseStore";
import { useCategoryStore } from "../store/categories/useCategoryStore";
import { useRemindersStore } from "../store/remainders/useStoreRemainders";

export const config = () => {
  const theme = useTheme();
  const resetUserStore = useUserStore((state) => state.resetUserStore);
  const resetCardStore = useCardsStore((state) => state.resetCardStore);
  const resetStoreIncome = useIncomeStore((state) => state.resetStoreIncome);
  const resetStoreExpense = useExpenseStore((state) => state.resetStoreExpense);
  const resetCategoryStore = useCategoryStore(state => state.resetStoreCategory);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const resetStoreReminder = useRemindersStore(state=>state.resetStoreReminder);

  const handleDeleteDatabaseInformation = async () => {
    Alert.alert("Cuidado", "¿Seguro de eliminar toda tu información?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Confirmar",
        style: "destructive",
        onPress: async () => {
          try {
            const database = await getDataBase();
            await database.closeAsync();

            await SqliteDatabase.deleteDatabaseAsync(database.databaseName);

            resetUserStore();
            resetCardStore();
            resetStoreIncome();
            resetStoreExpense();
            resetCategoryStore();
            resetStoreReminder();

            router.replace("/");
          } catch (error) {
            console.error("Error while deleting database:", error);
            Alert.alert(
              "Error",
              "No se pudo eliminar la base de datos. Inténtalo de nuevo."
            );
          }
        },
      },
    ]);
  };

  const changeTheme = () => {
    toggleTheme();
  };

  return (
    <LayoutWithTopNavigation titleScreen="Configuración">
      <Layout
        style={{ paddingHorizontal: 10, flex: 1, gap: 10, paddingBottom: 15 }}
      >
        <Menu style={{ backgroundColor: theme.colors.background }}>
          <MenuItem
            title="Usuario"
            accessoryLeft={<Icon name="person" />}
            onPress={() => router.push("/profile")}
          />
          <MenuItem
            title="Recordatorios"
            accessoryLeft={<Icon name="clock-outline" />}
            onPress={() => router.push("/remainders")}
          />
          {/* <MenuItem
            title="Rango de metricas"
            accessoryLeft={<Icon name="calendar-outline" />}
            onPress={() => router.push("/remainders")}
          /> */}
          <MenuItem
            title={`Tema: ${theme.dark ? "oscuro" : "claro"}`}
            accessoryLeft={<Icon name="color-palette-outline" />}
            onPress={changeTheme}
          />
          <MenuItem
            style={{ justifyContent: "flex-start" }}
            title={() => (
              <Text status="danger">Borrar toda mi información</Text>
            )}
            accessoryLeft={<Icon fill="red" name="trash-2-outline" />}
            onPress={handleDeleteDatabaseInformation}
          />
        </Menu>
      </Layout>
    </LayoutWithTopNavigation>
  );
};

export default config;
