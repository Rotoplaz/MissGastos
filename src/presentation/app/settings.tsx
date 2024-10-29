import { Icon, Layout, Menu, MenuItem, Text } from "@ui-kitten/components";
import { router } from "expo-router";
import * as SqliteDatabase from "expo-sqlite";
import React from "react";
import { useUserStore } from "../store/user/useUserStore";
import { useTheme } from "@react-navigation/native";
import { LayoutWithTopNavigation } from "../common/layouts/LayoutWithTopNavigation";
import { Alert } from "react-native";

export const config = () => {
  const theme = useTheme();
  const setUser = useUserStore(state=>state.setUser);
  
  const handleDeleteDatabaseInformation = async()=> {
    Alert.alert("Cuidado", "Seguro de eliminar toda tu información",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Confirmar",
          style: "destructive",
          onPress: async() => {
            try {
              const database = await SqliteDatabase.openDatabaseAsync("MissGastosDataBase");
              await database.closeAsync();
              await SqliteDatabase.deleteDatabaseAsync("MissGastosDataBase");
              setUser(null);
              router.replace("/");
            } catch (error) {
              console.log(error)
            }
          }, 
        },
      ]
    )
  }

  return (
    <LayoutWithTopNavigation TitleScreen="Configuración">
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
            
            style={{justifyContent: "flex-start"}}
            title={(evaProps) => (
              <Text status="danger" >
                Borrar toda mi información
              </Text>
            )}
            accessoryLeft={<Icon fill='red' name="trash-2-outline" />}
            onPress={handleDeleteDatabaseInformation}
          />
        </Menu>
      </Layout>
    </LayoutWithTopNavigation>
  );
};

export default config;
