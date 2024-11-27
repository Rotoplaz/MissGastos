import { Button, Icon } from "@ui-kitten/components";
import { router } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

export const CreateTransactionButton = () => {
  return (
    <Button
      onPress={() => router.push("/createTransaction")}
      style={styles.fabButton}
      accessoryLeft={
        <Icon
          name="plus-outline"
          fill="white"
          style={{ width: 30, height: 30 }}
        />
      }
    ></Button>
  );
};

const styles = StyleSheet.create({
  fabButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    borderRadius: 50,
    height: 65,
    width: 65,
  },
});
