import React from "react";
import { Icon, Layout, Tab, TabBar, TabBarProps } from "@ui-kitten/components";
import { StyleSheet } from "react-native";

const useTabBarState = (initialState = 0): Partial<TabBarProps> => {
  const [selectedIndex, setSelectedIndex] = React.useState(initialState);
  return { selectedIndex, onSelect: setSelectedIndex };
};

export const TabBarAccessoriesShowcase = (): React.ReactElement => {
  const bottomState = useTabBarState();

  return (
    <Layout style={styles.mainContainer}>
      <TabBar {...bottomState}>
        <Tab
          title="USERS"
          icon={(props) => (
            <Icon
              {...props}
              name="person-outline"
              style={{ width: 24, height: 24 }}
            />
          )}
        />
        <Tab
          title="ORDERS"
          icon={(props) => (
            <Icon
              {...props}
              name="bell-outline"
              style={{ width: 24, height: 24 }}
            />
          )}
        />
        <Tab
          title="TRANSACTIONS"
          icon={(props) => (
            <Icon
              {...props}
              name="email-outline"
              style={{ width: 24, height: 24 }}
            />
          )}
        />
      </TabBar>
    </Layout>
  );
};

export default TabBarAccessoriesShowcase;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 20,
  },
  button: {
    margin: 4,
  },
});
