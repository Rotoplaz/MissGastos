import { Button, Icon } from '@ui-kitten/components'
import { router } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'

export const CreateTransactionButton = () => {
  return (

    <Button
    onPress={() => router.push("/createTransaction")}
    style={styles.fabButton}
    accessoryLeft={
      <Icon
        name="plus-outline"
        fill="white"
        style={{ width: 24, height: 24 }}
      />
    }
  ></Button>
  )
}


const styles = StyleSheet.create({
    fabButton: {
        position: "absolute",
        right: 15,
        bottom: 30,
        borderRadius: 50,
        padding: 20,
        height: 60,
      },
    
})