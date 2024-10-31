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
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const LayoutWithTopNavigation = ({
  titleScreen,
  children,
  style,
}: Props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={"padding"}>
        <Layout style={{ flex: 1 }}>
          <TopNavigationGeneric titleScreen={titleScreen} />
          <Layout style={[{ flex: 1 }, style]}>{children}</Layout>
        </Layout>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
