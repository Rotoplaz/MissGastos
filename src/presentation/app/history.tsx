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
            accessoryLeft={() => (
              <View style={style.iconContainer}>
                <Icon name="image-outline" fill="white" style={style.icon} />
              </View>
            )}
          >
            {() => (
              <View style={style.itemContent}>
                <Text style={style.itemTitle}>Arte</Text>
                <Text style={[style.itemAmount, style.expense]}>2000$</Text>
              </View>
            )}
          </Button>
        </View>

        <View style={style.itemContainer}>
          <Button
            style={style.itemButton}
            appearance="ghost"
            accessoryLeft={() => (
              <View style={style.iconContainer}>
                <Icon
                  name="briefcase-outline"
                  fill="white"
                  style={style.icon}
                />
              </View>
            )}
          >
            {() => (
              <View style={style.itemContent}>
                <Text style={style.itemTitle}>Trabajo</Text>
                <Text style={[style.itemAmount, style.income]}>12000$</Text>
              </View>
            )}
          </Button>
        </View>

        <View style={style.itemContainer}>
          <Button
            style={style.itemButton}
            appearance="ghost"
            accessoryLeft={() => (
              <View style={style.iconContainer}>
                <Icon
                  name="shopping-cart-outline"
                  fill="white"
                  style={style.icon}
                />
              </View>
            )}
          >
            {() => (
              <View style={style.itemContent}>
                <Text style={style.itemTitle}>Comida</Text>
                <Text style={[style.itemAmount, style.expense]}>200$</Text>
              </View>
            )}
          </Button>
        </View>

        <View style={style.itemContainer}>
          <Button
            style={style.itemButton}
            appearance="ghost"
            accessoryLeft={() => (
              <View style={style.iconContainer}>
                <Icon name="star-outline" fill="white" style={style.icon} />
              </View>
            )}
          >
            {() => (
              <View style={style.itemContent}>
                <Text style={style.itemTitle}>Loteria</Text>
                <Text style={[style.itemAmount, style.income]}>1000000$</Text>
              </View>
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
  itemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  itemTitle: {
    color: "white",
    flex: 1,
    fontWeight: "bold",
  },
  itemAmount: {
    fontWeight: "bold",
    flex: 1,
    textAlign: "right",
  },
  income: {
    color: "#80FF80",
  },
  expense: {
    color: "#FF4F37",
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
  },
  iconContainer: {
    width: 40, // Ancho del círculo
    height: 40,
    borderRadius: 20,
    backgroundColor: "#1F1F1F",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "black",
    marginRight: 15,
  },
  icon: {
    width: 25,
    height: 25,
  },
});
