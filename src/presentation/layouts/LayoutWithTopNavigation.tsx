import { Layout } from '@ui-kitten/components'
import React from 'react'
import { TopNavigationGeneric } from '../navigation/TopNavigationGeneric'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleProp, ViewStyle } from 'react-native';

interface Props {
    TitleScreen: string;
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}

export const LayoutWithTopNavigation = ({ TitleScreen, children, style }:Props) => {
   const { top } =  useSafeAreaInsets();
  return (
    <Layout style={{flex: 1, paddingTop: top}}>
        <TopNavigationGeneric TitleScreen={TitleScreen} />
        <Layout style={[{flex: 1}, style]}>
            {children}
        </Layout>
    </Layout>
  )
}
