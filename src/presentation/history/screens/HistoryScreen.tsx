import { Button, Icon, Layout, Text } from "@ui-kitten/components";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const HistoryScreen = () => {
  const { top } = useSafeAreaInsets();
  const circleColors = ["#e67e22", "#229954", "#d4ac0d", "#884ea0"];

  return (
    <Layout style={[style.mainContainer, { paddingTop: top }]}>
      <ScrollView style={style.scrollContainer}>
        <Layout style={style.itemContainer}>
          <Button
            style={style.itemButton}
            appearance="ghost"
            accessoryLeft={() => (
              <Layout style={style.iconContainer}>
                <Icon name="image-outline" style={style.icon} />
              </Layout>
            )}
          >
            {() => (
              <Layout style={style.itemContent}>
                <Text style={style.itemTitle}>Arte</Text>
                <Text style={[style.itemAmount, style.expense]}>2000$</Text>
              </Layout>
            )}
          </Button>
        </Layout>

        <Layout style={style.itemContainer}>
          <Button
            style={style.itemButton}
            appearance="ghost"
            accessoryLeft={() => (
              <Layout style={style.iconContainer}>
                <Icon name="briefcase-outline" style={style.icon} />
              </Layout>
            )}
          >
            {() => (
              <Layout style={style.itemContent}>
                <Text style={style.itemTitle}>Trabajo</Text>
                <Text style={[style.itemAmount, style.income]}>12000$</Text>
              </Layout>
            )}
          </Button>
        </Layout>

        <Layout style={style.itemContainer}>
          <Button
            style={style.itemButton}
            appearance="ghost"
            accessoryLeft={() => (
              <Layout style={style.iconContainer}>
                <Icon name="shopping-cart-outline" style={style.icon} />
              </Layout>
            )}
          >
            {() => (
              <Layout style={style.itemContent}>
                <Text style={style.itemTitle}>Comida</Text>
                <Text style={[style.itemAmount, style.expense]}>200$</Text>
              </Layout>
            )}
          </Button>
        </Layout>

        <Layout style={style.itemContainer}>
          <Button
            style={style.itemButton}
            appearance="ghost"
            accessoryLeft={() => (
              <Layout style={style.iconContainer}>
                <Icon name="star-outline" style={style.icon} />
              </Layout>
            )}
          >
            {() => (
              <Layout style={style.itemContent}>
                <Text style={style.itemTitle}>Loteria</Text>
                <Text style={[style.itemAmount, style.income]}>1000000$</Text>
              </Layout>
            )}
          </Button>
        </Layout>
      </ScrollView>
    </Layout>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "68%",
    paddingHorizontal: 15,
    paddingVertical: 50,
    justifyContent: "space-between",
  },
  exit: {
    width: 50,
  },
  scrollContainer: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  itemButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  itemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  itemTitle: {
    flex: 1,
    fontWeight: "bold",
  },
  itemAmount: {
    fontWeight: "bold",
    flex: 1,
    textAlign: "right",
  },
  income: {
    color: "#229954",
  },
  expense: {
    color: "#c0392b",
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    marginRight: 15,
  },
  icon: {
    width: 25,
    height: 25,
  },
});
