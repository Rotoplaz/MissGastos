import React from "react";
import {
  Layout,
  Tab,
  TabBar,
  Icon,
  Button,
  Input,
  Text,
  OverflowMenu,
  MenuItem,
} from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { LayoutWithTopNavigation } from "../common/layouts/LayoutWithTopNavigation";

const useTabBarState = (initialState = 0) => {
  const [selectedIndex, setSelectedIndex] = React.useState(initialState);
  return { selectedIndex, onSelect: setSelectedIndex };
};

const circleColors = ["#e67e22", "#229954", "#d4ac0d", "#884ea0"];

export const TabBarAccessoriesShowcase = () => {
  const bottomState = useTabBarState();
  const [selectedIcon, setSelectedIcon] = React.useState<number | null>(null);
  const [expenseValue, setExpenseValue] = React.useState("");
  const [paymentMethod, setPaymentMethod] = React.useState<string | null>(null);
  const [visible, setVisible] = React.useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = React.useState<
    number | null
  >(null);

  const cards = [
    { name: "Nu", lastFour: "**1234" },
    { name: "BBVA", lastFour: "**5678" },
    { name: "Banamex", lastFour: "**9012" },
  ];

  const handleIconPress = (index: number) => {
    setSelectedIcon(index);
    console.log(`Icono ${index + 1} presionado`);
  };

  // Cambia el texto del botón según la tarjeta seleccionada
  const renderToggleButton = () => (
    <Button onPress={() => setVisible(true)}>
      {selectedCardIndex !== null
        ? cards[selectedCardIndex].name
        : "Selecciona tu tarjeta"}
    </Button>
  );

  const onSelect = (index: number) => {
    setSelectedCardIndex(index);
    console.log(`Tarjeta seleccionada: ${cards[index].name}`);
    setVisible(false);
  };

  return (
    <LayoutWithTopNavigation titleScreen="Crear Transacción">
      <Layout style={styles.mainContainer}>
        <TabBar {...bottomState}>
          <Tab title="Gasto" />
          <Tab title="Ingreso" />
        </TabBar>

        {bottomState.selectedIndex === 0 ? (
          <>
            <Layout style={styles.amountContainer}>
              <Text style={styles.dollarSign}>$</Text>
              <Input
                placeholder="Cantidad"
                style={styles.input}
                keyboardType="numeric"
                value={expenseValue}
                onChangeText={(text) => {
                  const numericText = text.replace(/[^0-9]/g, "");
                  setExpenseValue(numericText);
                }}
              />
            </Layout>

            <Text style={styles.sectionTitle}>Tipo de gasto:</Text>
            <Layout style={styles.iconRow}>
              {[
                "image-outline",
                "briefcase-outline",
                "shopping-cart-outline",
                "plus-outline",
              ].map((iconName, index) => (
                <Button
                  key={index}
                  appearance="ghost"
                  accessoryLeft={() => (
                    <Layout
                      style={[
                        styles.iconCircle,
                        { backgroundColor: circleColors[index] },
                        selectedIcon === index && styles.selectedIconBackground,
                      ]}
                    >
                      <Icon name={iconName} style={styles.iconInsideCircle} />
                    </Layout>
                  )}
                  onPress={() => handleIconPress(index)}
                />
              ))}
            </Layout>

            <Text style={styles.sectionTitle}>Concepto:</Text>
            <Input
              placeholder="Hasta 25 caracteres"
              style={styles.input}
              maxLength={25}
            />
            <Text style={styles.sectionTitle}>Método de pago</Text>
            <Layout style={styles.container}>
              <Button
                onPress={() => setPaymentMethod("Efectivo")}
                style={[
                  styles.paymentButton,
                  paymentMethod === "Efectivo" && styles.selectedPaymentButton,
                ]}
                status={paymentMethod === "Efectivo" ? "primary" : "basic"}
              >
                Efectivo
              </Button>
              <Button
                onPress={() => setPaymentMethod("Tarjeta")}
                style={[
                  styles.paymentButton,
                  paymentMethod === "Tarjeta" && styles.selectedPaymentButton,
                ]}
                status={paymentMethod === "Tarjeta" ? "primary" : "basic"}
              >
                Tarjeta
              </Button>
            </Layout>

            {paymentMethod === "Tarjeta" && (
              <>
                <Text style={styles.sectionTitle}>Selecciona tu tarjeta:</Text>
                <OverflowMenu
                  anchor={renderToggleButton}
                  visible={visible}
                  onBackdropPress={() => setVisible(false)}
                >
                  {cards.map((card, index) => (
                    <MenuItem
                      key={index}
                      accessoryLeft={(props) => (
                        <Icon {...props} name="credit-card-outline" />
                      )}
                      title={() => (
                        <Layout style={styles.cardMenuItem}>
                          <Text style={styles.cardName}>{card.name}</Text>
                          <Text appearance="hint" style={styles.cardLastFour}>
                            {card.lastFour}
                          </Text>
                        </Layout>
                      )}
                      onPress={() => onSelect(index)}
                    />
                  ))}
                </OverflowMenu>
              </>
            )}

            <Button style={styles.createButton}>Crear</Button>
          </>
        ) : (
          <>
            <Layout style={styles.amountContainer}>
              <Text style={styles.dollarSign}>$</Text>
              <Input
                placeholder="Cantidad"
                style={styles.input}
                keyboardType="numeric"
                value={expenseValue}
                onChangeText={(text) => {
                  const numericText = text.replace(/[^0-9]/g, "");
                  setExpenseValue(numericText);
                }}
              />
            </Layout>
            <Text style={styles.sectionTitle}>Concepto:</Text>
            <Input
              placeholder="Hasta 25 carácteres"
              style={styles.input}
              maxLength={25}
            />
            <Text style={styles.sectionTitle}>Método de pago</Text>
            <Layout style={styles.container}>
              <Button
                onPress={() => setPaymentMethod("Efectivo")}
                style={[
                  styles.paymentButton,
                  paymentMethod === "Efectivo" && styles.selectedPaymentButton,
                ]}
                status={paymentMethod === "Efectivo" ? "primary" : "basic"}
              >
                Efectivo
              </Button>
              <Button
                onPress={() => setPaymentMethod("Tarjeta")}
                style={[
                  styles.paymentButton,
                  paymentMethod === "Tarjeta" && styles.selectedPaymentButton,
                ]}
                status={paymentMethod === "Tarjeta" ? "primary" : "basic"}
              >
                Tarjeta
              </Button>
            </Layout>

            {paymentMethod === "Tarjeta" && (
              <>
                <Text style={styles.sectionTitle}>Selecciona tu tarjeta:</Text>
                <OverflowMenu
                  anchor={renderToggleButton}
                  visible={visible}
                  onBackdropPress={() => setVisible(false)}
                >
                  {cards.map((card, index) => (
                    <MenuItem
                      key={index}
                      accessoryLeft={(props) => (
                        <Icon {...props} name="credit-card-outline" />
                      )}
                      title={() => (
                        <Layout style={styles.cardMenuItem}>
                          <Text style={styles.cardName}>{card.name}</Text>
                          <Text appearance="hint" style={styles.cardLastFour}>
                            {card.lastFour}
                          </Text>
                        </Layout>
                      )}
                      onPress={() => onSelect(index)}
                    />
                  ))}
                </OverflowMenu>
              </>
            )}
            <Button style={styles.registerButton}>Crear</Button>
          </>
        )}
      </Layout>
    </LayoutWithTopNavigation>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  iconBar: {
    width: 24,
    height: 24,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    marginLeft: 10,
  },
  input: {
    marginVertical: 10,
    width: "70%",
    paddingTop: 20,
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  iconButton: {
    width: 30,
    height: 30,
  },
  selectedIcon: {
    tintColor: "#3366FF",
  },
  sectionTitle: {
    fontSize: 18,
    marginVertical: 10,
  },
  createButton: {
    position: "absolute",
    bottom: 0,
    width: "120%",
    alignSelf: "center",
    marginBottom: 0,
  },
  registerButton: {
    position: "absolute",
    bottom: 0,
    width: "120%",
    alignSelf: "center",
    marginBottom: 0,
  },
  dollarSign: {
    fontSize: 18,
    marginLeft: -20,
    marginHorizontal: 20,
    marginTop: 20,
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  paymentButton: {
    marginHorizontal: 8,
    width: "42%",
    marginTop: 20,
  },
  selectedPaymentButton: {
    borderWidth: 2,
  },
  cardMenuItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardName: {
    fontWeight: "bold",
    marginRight: 10,
  },
  cardLastFour: {
    fontSize: 12,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#3366FF",
    alignItems: "center",
    justifyContent: "center",
  },
  iconInsideCircle: {
    width: 24,
    height: 24,
    tintColor: "#FFFFFF",
  },
  selectedIconBackground: {
    backgroundColor: "#154360",
  },
});

export default TabBarAccessoriesShowcase;
