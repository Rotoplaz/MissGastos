import React from 'react';
import { TabBar, Tab } from '@ui-kitten/components';

interface Props {
    setTabIndex: React.Dispatch<React.SetStateAction<number>>;
    index: number;
}

export const TopTabsNavigation = ({ index, setTabIndex }:Props) => (
  <TabBar
    selectedIndex={index}
    onSelect={setTabIndex}>
    <Tab title='Gasto'/>
    <Tab title='Ingreso'/>
  </TabBar>
);

