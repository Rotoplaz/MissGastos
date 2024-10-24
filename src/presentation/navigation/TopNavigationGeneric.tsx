import React from "react";
import {
  Icon,
  IconElement,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { TouchableWebElement } from "@ui-kitten/components/devsupport";


interface Props {
  TitleScreen: string;
}

export const TopNavigationGeneric = ({ TitleScreen }:Props): React.ReactElement => {
  const router = useRouter();
  
  const renderBackAction = (): TouchableWebElement => (
    <TopNavigationAction
      icon={<Icon name="arrow-back" />}
      onPress={() => router.back()}
    />
  );

  return (
    <Layout style={styles.container}>
      <TopNavigation alignment="center" accessoryLeft={renderBackAction} title={TitleScreen} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 0,
  },
});
