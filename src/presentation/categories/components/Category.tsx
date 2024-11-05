import { Category as CategoryEntity } from '@/src/domain/entities/category.entity'
import { Button, Icon, Layout } from '@ui-kitten/components';
import React from 'react'
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

interface Props {
  category: CategoryEntity;
  style?: StyleProp<ViewStyle>;
}

export const Category = ({category, style}:Props) => {
  return (
    <Button
    appearance="ghost"
    style={[{
      backgroundColor: category.color,
      borderRadius: 100,
      paddingHorizontal: 12,
      paddingVertical: 12
    }, style]}
    accessoryLeft={() => (

        <Icon name={category.icon} style={[styles.iconCircle]} fill="white" />
    )}
  />
  )
}


const styles = StyleSheet.create({
    iconCircle: {
        width: 30,
        height: 30,
        borderRadius: 50
    },
});