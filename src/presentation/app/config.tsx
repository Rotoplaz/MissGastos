import { Button, Layout, Text } from '@ui-kitten/components'
import { router } from 'expo-router'
import * as SqliteDatabase from 'expo-sqlite'
import React from 'react'
import { useUserStore } from '../store/useUserStore'
import { LayoutWithTopNavigation } from '../layouts/LayoutWithTopNavigation'

export const config = () => {
  const setUser = useUserStore(state => state.setUser);

  return (
    <LayoutWithTopNavigation TitleScreen="Configuración">
      <Layout style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
          <Button onPress={async()=> {
            try {
              const database = await SqliteDatabase.openDatabaseAsync("MissGastosDataBase");
              await database.closeAsync();
              await SqliteDatabase.deleteDatabaseAsync("MissGastosDataBase");
              setUser(null);
              router.replace("/initial");
            } catch (error) {
              console.log(error)
            }
          }} status='danger'>Borrar Base de datos</Button>
      </Layout>
    </LayoutWithTopNavigation>
  )
}

export default config;