import { Button, Layout, Text } from '@ui-kitten/components'
import { deleteDatabaseSync } from 'expo-sqlite'
import * as Slite from 'expo-sqlite'

import React from 'react'
import { useUserStore } from '../store/useUserStore'
import { router } from 'expo-router'


export const home = () => {
    const user = useUserStore(state => state.user);
    const setUser = useUserStore(state => state.setUser);
    
  return (
    <Layout style={{flex: 1, alignItems: 'center', justifyContent: "center"}}>
        
        <Text category='h1'>
            HomeScreen
        </Text>
        <Text category='h2'>
            {user?.name}
        </Text>
        <Button status='danger' onPress={async ()=>{
            try {
                const db = await Slite.openDatabaseAsync("MissGastosDataBase");
                await db.closeAsync()
                await Slite.deleteDatabaseAsync("MissGastosDataBase");
            } catch (error) {
                console.log(error)
            }
            setUser(null);
            router.replace("/");
        }}>Borrar DB</Button>
    </Layout>
  )
}


export default home;