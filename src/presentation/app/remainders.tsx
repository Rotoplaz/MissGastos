import { Button, Icon, Layout, List, Card, Text } from "@ui-kitten/components";
import React from "react";
import { LayoutWithTopNavigation } from "../common/layouts/LayoutWithTopNavigation";
import { StyleSheet } from "react-native";
import { router } from "expo-router";
import { useRemindersStore } from "../store/remainders/useStoreRemainders";
import { Reminder } from "@/src/domain/entities/reminders.entity";

export const Remainders = () => {
  const reminders = useRemindersStore((state) => state.reminders);

  const renderItem = (item: Reminder) => (
    <Card style={styles.card} onPress={() => router.push({pathname: "/updateReminder", params: {id: item.id}})}>
      <Text category="h6">{item.title}</Text>
      <Text appearance="hint" category="s1">
        {item.description || "Sin descripción"}
      </Text>
    </Card>
  );

  return (
    <LayoutWithTopNavigation titleScreen="Recordatorios" style={{ flex: 1 }}>
      <Button
        style={styles.button}
        appearance="ghost"
        status="primary"
        size="large"
        accessoryLeft={<Icon name="plus-outline" />}
        onPress={() => router.push("/createRemainder")}
      >
        Crear recordatorio
      </Button>

      <List
        // style={{ backgroundColor: theme.colors.background }}
        contentContainerStyle={styles.listContainer}
        data={reminders}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={(item) => `${item.id}`}
      />
    </LayoutWithTopNavigation>
  );
};

export default Remainders;

const styles = StyleSheet.create({
  button: {
    width: "90%",
    alignSelf: "center",
    marginVertical: 16,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  card: {
    marginVertical: 8,
  },
});
