import React from 'react';
import {
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { router } from 'expo-router';


export const TopNavigationHome = (): React.ReactElement => {


  const renderRightActions:(() => React.ReactElement) = (): React.ReactElement => (
    <>
      <TopNavigationAction icon={ <Icon name='settings'/>} onPress={()=>router.push("/settings")}/>

    </>
  );


  return (
    <Layout
      style={styles.container}
      
    >
      <TopNavigation
        alignment='center'
        accessoryRight={renderRightActions}
        
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 0,
  },
});