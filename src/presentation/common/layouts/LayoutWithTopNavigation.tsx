import { Layout } from "@ui-kitten/components";
import React from "react";
import { TopNavigationGeneric } from "../navigation/TopNavigationGeneric";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  KeyboardAvoidingView,
  StyleProp,
  ViewStyle,
} from "react-native";

interface Props {
  titleScreen: string;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  accessoryRight?: (() => React.ReactElement) | undefined;
}

export const LayoutWithTopNavigation = ({
  titleScreen,
  children,
  style,
  accessoryRight
}: Props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={"padding"}>
        <Layout style={{ flex: 1 }}>
          <TopNavigationGeneric titleScreen={titleScreen} accessoryRight={accessoryRight}/>
          <Layout style={[{ flex: 1 }, style]}>{children}</Layout>
        </Layout>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
