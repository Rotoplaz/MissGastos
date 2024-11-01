import React from 'react'
import { LayoutWithTopNavigation } from '../../common/layouts/LayoutWithTopNavigation'
import { FullLoaderScreen } from '../../common/screens/loaders/FullLoaderScreen';
import { useLocalSearchParams } from 'expo-router';
import { Text } from '@ui-kitten/components';


export const DebitCardScreen = () => {
    const params = useLocalSearchParams<{ id: string }>();
    if (!params.id) {
        return <FullLoaderScreen />;
      }
  return (
    <LayoutWithTopNavigation titleScreen='DebitCard'>
        <Text>Holaaaaaaa</Text>
    </LayoutWithTopNavigation>
  )
}
