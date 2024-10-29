import { Button, Icon, Layout, Menu, MenuItem, Text } from '@ui-kitten/components'
import { router } from 'expo-router'
import * as SqliteDatabase from 'expo-sqlite'
import React from 'react'
import { useUserStore } from '../store/user/useUserStore'
import { useTheme } from '@react-navigation/native'
import { LayoutWithTopNavigation } from '../common/layouts/LayoutWithTopNavigation'

export const config = () => {
  const setUser = useUserStore(state => state.setUser);
  const theme = useTheme();

  return (
    <LayoutWithTopNavigation TitleScreen="Configuración">
      <Layout style={{paddingHorizontal: 10, flex: 1, gap: 10,paddingBottom: 15}} >


        <Menu style={{ backgroundColor: theme.colors.background}}>
          <MenuItem title='Usuario' accessoryLeft={<Icon name="person" />} onPress={()=>router.push("/profile")}/>

        </Menu>


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