import { Button, Layout, Text } from '@ui-kitten/components'
import { router } from 'expo-router'
import * as SqliteDatabase from 'expo-sqlite'
import React from 'react'
import { useUserStore } from '../store/useUserStore'
import { TopNavigationGeneric } from '../navigation/TopNavigationGeneric'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export const config = () => {
  const setUser = useUserStore(state => state.setUser);
  const {top} = useSafeAreaInsets()
  return (
    <Layout style={{flex: 1, paddingTop: top}}>
      <TopNavigationGeneric TitleScreen='Configuración' />
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
    </Layout>
  )
}

export default config;