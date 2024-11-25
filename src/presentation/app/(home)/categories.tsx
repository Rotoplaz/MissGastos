import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCategoryStore } from "../../store/categories/useCategoryStore";
import { Category } from "../../categories/components/Category";
import { StyleSheet } from "react-native";
import { Button, Icon, List, Layout } from "@ui-kitten/components";
import { router } from "expo-router";
import { useTheme } from "@react-navigation/native";

export const Categories = () => {
  const categories = useCategoryStore((state) => state.categories);
  const theme = useTheme();
  const data = [
    ...categories,
    { id: "add-button", isAddButton: true },
  ];

  const renderItem = ({ item }:any) => {
    if (item.isAddButton) {
      return (
        <Layout style={styles.gridItem}>
          <Button
            appearance="ghost"
            style={styles.addButton}
            accessoryRight={<Icon name="plus-outline" fill="#fff" />}
            onPress={() => router.push("/createCategory")}
          />
        </Layout>
      );
    }

    return (
      <Layout style={styles.gridItem}>
        <Category category={item} />
      </Layout>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1,  }}>
      <List
      
        style={{ backgroundColor: theme.colors.background }}
        data={data}
        renderItem={renderItem}
        numColumns={4} 
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    maxWidth: "25%", 
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  addButton: {
    backgroundColor: "black",
    borderRadius: 50,
    width: 50,
    height: 50,
    alignSelf: "center",
  },
});

export default Categories;
