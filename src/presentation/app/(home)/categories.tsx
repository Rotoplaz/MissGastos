import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCategoryStore } from "../../store/categories/useCategoryStore";
import { Category } from "../../categories/components/Category";
import { ScrollView } from "react-native";
import { Button, Icon, Layout } from "@ui-kitten/components";
import { router } from "expo-router";

export const categories = () => {
  const categories = useCategoryStore((state) => state.categories);
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 25 }}>
      <ScrollView style={{ flex: 1 }}>
        <Layout
          style={{ flexDirection: "row", justifyContent: "space-around" }}
        >
          {categories.map((category) => (
            <Category category={category} key={category.id} />
          ))}
          <Button
            appearance="ghost"
            style={{
              backgroundColor: "black",
              borderRadius: 50,
              width: 50,
              height: 50,
            }}
            accessoryRight={<Icon name="plus-outline" fill="#fff" />}
            onPress={()=>router.navigate("/createCategory")}
          />
        </Layout>
      </ScrollView>
    </SafeAreaView>
  );
};

export default categories;
