import { Layout } from "@ui-kitten/components";
import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Category as CategoryEntity } from "@/src/domain/entities/category.entity";
import { Category } from "../../categories/components/Category";

const categories: CategoryEntity[] = [
  {
    id: 5,
    type: "Casa",
    color: "#e67e22",
    icon: "home-outline",
  },
  {
    id: 8,
    type: "Trabajo",
    color: "#229954",
    icon: "briefcase-outline",
  },
  {
    id: 9,
    type: "Comida",
    color: "#d4ac0d",
    icon: "shopping-cart-outline",
  },
];

export const HistoryScreen = () => {
  const { top } = useSafeAreaInsets();

  return (
    <Layout style={[styles.mainContainer, { paddingTop: top }]}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => console.log(`Clicked on ${item.type}`)}
          >
            <Category
              category={item}
              style={styles.iconContainer}
              showTitle={false}
            />
          </TouchableOpacity>
        )}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  row: {
    justifyContent: "space-around",
    marginBottom: 20,
  },
  itemContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
