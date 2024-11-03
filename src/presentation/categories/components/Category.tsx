import { Category as CategoryEntity } from '@/src/domain/entities/category.entity'
import { Button, Icon, Layout } from '@ui-kitten/components';
import React from 'react'
import { StyleSheet } from 'react-native';

interface Props {
    category: CategoryEntity;
}

export const Category = ({category}:Props) => {
  return (
    <Button
    appearance="ghost"
    accessoryLeft={() => (
      <Layout
        style={[
          styles.iconCircle,
          { backgroundColor: category.color  }
        ]}
      >
        <Icon name={category.icon} style={[styles.iconInsideCircle]} />
      </Layout>
    )}
  />
  )
}


const styles = StyleSheet.create({
    iconCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
    },
    iconInsideCircle: {
        width: 24,
        height: 24,
        tintColor: "#FFFFFF",
      },
});