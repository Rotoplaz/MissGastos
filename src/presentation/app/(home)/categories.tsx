import React from 'react'
import { Layout, Text } from '@ui-kitten/components'
import { SafeAreaView } from 'react-native-safe-area-context'

export const categories = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
        <Layout style={{justifyContent: "center", alignItems: "center", flex: 1}}>
            <Text category="h1">
                Categories Screen
            </Text>
        </Layout>
    </SafeAreaView>
  )
}


export default categories;