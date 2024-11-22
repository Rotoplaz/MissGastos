import React from 'react';
import { TabBar, Tab } from '@ui-kitten/components';


export const TopTabsNavigation = ({ navigation, state }:any) => (
  <TabBar
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <Tab title='Gasto'/>
  </TabBar>
);

