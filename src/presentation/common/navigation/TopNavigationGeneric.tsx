import React from "react";
import {
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { TouchableWebElement } from "@ui-kitten/components/devsupport";


interface Props {
  titleScreen: string;
}

export const TopNavigationGeneric = ({ titleScreen }:Props): React.ReactElement => {
  const router = useRouter();
  
  const renderBackAction = (): TouchableWebElement => (
    <TopNavigationAction
      icon={<Icon name="arrow-back" />}
      onPress={() => router.back()}
    />
  );

  return (
    <Layout style={styles.container}>
      <TopNavigation alignment="center" accessoryLeft={renderBackAction} title={titleScreen} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 0,
  },
});
