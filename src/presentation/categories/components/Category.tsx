import { Category as CategoryEntity } from "@/src/domain/entities/category.entity";
import { Button, Icon, Layout, Text } from "@ui-kitten/components";
import React from "react";
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";

interface Props {
  category: CategoryEntity;
  style?: StyleProp<ViewStyle>;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  showTitle?: boolean;
}

export const Category = ({ category, style, onPress, showTitle = true }: Props) => {
  return (
    <Layout style={{ justifyContent: "center", alignItems: "center", gap: 5 }}>
      <Button
        appearance="ghost"
        style={[
          {
            backgroundColor: category.color,
            borderRadius: 100,
            paddingHorizontal: 12,
            paddingVertical: 12,
          },
          style,
        ]}
        onPress={onPress}
        accessoryLeft={() => (
          <Icon name={category.icon} style={[styles.iconCircle]} fill="white" />
        )}
      />
      {
        showTitle && (
          <Text category="c2" appearance="hint">
            {category.type}
          </Text>
        )
      }
    </Layout>
  );
};

const styles = StyleSheet.create({
  iconCircle: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
});
