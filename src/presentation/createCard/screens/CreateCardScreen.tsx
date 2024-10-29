

import React, { useState } from 'react'
import { LayoutWithTopNavigation } from '../../common/layouts/LayoutWithTopNavigation'
import { IndexPath, Layout, Select, SelectItem, Text } from '@ui-kitten/components'
import { StyleSheet } from 'react-native'
import { DebitCardForm } from '../components/DebitCardForm'
import { CreditCardForm } from '../components/CreditCardForm'

export const CreateCardScreen = () => {
    const [selectedIndex, setSelectedIndex] = useState<IndexPath>(
        new IndexPath(0)
      );
      const options = ["Crédito", "Débito"];
    

  return (
    <LayoutWithTopNavigation TitleScreen="Añadir Tarjeta">
      <Layout style={style.mainContainer}>
        <Layout style={style.container}>
          <Layout style={style.rowContainer}>
            <Text style={style.text} category="h1">
              Tipo
            </Text>
            <Select
              selectedIndex={selectedIndex}
              value={options[selectedIndex.row]}
              onSelect={(index) => setSelectedIndex(index as IndexPath)}
              style={style.select}
            >
              {options.map((option, index) => (
                <SelectItem key={index} title={option} />
              ))}
            </Select>
          </Layout>
          
            {
              options[selectedIndex.row] === "Débito" ? (
                <DebitCardForm />
              ) : (
                <CreditCardForm />
              )
            }

        </Layout>
      </Layout>
    </LayoutWithTopNavigation>
  )
}


const style = StyleSheet.create({
    mainContainer: {
      flex: 1,
      alignItems: "center",
    },
    title: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 30,
      right: 20,
    },
    container: {
      width: "90%",
      flex: 1, 
      justifyContent: "space-evenly"
    },
    rowContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    text: {
      color: "white",
      fontSize: 20,
      marginBottom: 20,
      marginLeft: "10%",
    },
    select: {
      flex: 1,
      marginLeft: 130,
    },

    label: {
      color: "white",
      fontSize: 18,
      marginBottom: 8,
    },
    input: {
      marginBottom: 20,
      borderRadius: 8,
    },
    submitButton: {
      width: "30%",
      marginLeft: "35%",
    },
  });
  