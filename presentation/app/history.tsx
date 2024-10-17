import { Button, Icon, Layout, Text } from "@ui-kitten/components";
import { StyleSheet, View, ScrollView } from "react-native";

export default function History() {
  return (
    <Layout style={style.mainContainer}>
      <View style={style.header}>
        <Button
          style={style.exit}
          appearance="ghost"
          accessoryLeft={<Icon name="arrow-back-outline" fill="white" />}
        />
        <Text category="h5" style={style.title}>
          Historial
        </Text>
      </View>

      <ScrollView style={style.scrollContainer}>
        <View style={style.itemContainer}>
          <Button
            style={style.itemButton}
            appearance="ghost"
            accessoryLeft={<Icon name="image-outline" fill="white" s />}
          >
            {() => (
              <>
                <Text style={style.itemTitle}>Arte</Text>
                <Text style={[style.itemAmount, style.expense]}>2000$</Text>
              </>
            )}
          </Button>
        </View>

        <View style={style.itemContainer}>
          <Button
            style={style.itemButton}
            appearance="ghost"
            accessoryLeft={<Icon name="briefcase-outline" fill="white" />}
          >
            {() => (
              <>
                <Text style={style.itemTitle}>Trabajo</Text>
                <Text style={[style.itemAmount, style.income]}>12000$</Text>
              </>
            )}
          </Button>
        </View>

        <View style={style.itemContainer}>
          <Button
            style={style.itemButton}
            appearance="ghost"
            accessoryLeft={<Icon name="shopping-cart-outline" fill="white" />}
          >
            {() => (
              <>
                <Text style={style.itemTitle}>Comida</Text>
                <Text style={[style.itemAmount, style.expense]}>200$</Text>
              </>
            )}
          </Button>
        </View>

        <View style={style.itemContainer}>
          <Button
            style={style.itemButton}
            appearance="ghost"
            accessoryLeft={<Icon name="star-outline" fill="white" />}
          >
            {() => (
              <>
                <Text style={style.itemTitle}>Loteria</Text>
                <Text style={[style.itemAmount, style.income]}>1000000$</Text>
              </>
            )}
          </Button>
        </View>
      </ScrollView>
    </Layout>
  );
}

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "68%",
    paddingHorizontal: 20,
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
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#3D3D3D",
  },
  itemButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  itemTitle: {
    color: "white",
  },
  itemAmount: {
    fontWeight: "bold",
  },
  income: {
    color: "#80FF80",
  },
  expense: {
    color: "#FF4F37",
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
  },
});
