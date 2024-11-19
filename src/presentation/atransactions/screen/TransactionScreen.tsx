import React, { useEffect, useState } from "react";
import {
  Layout,
  Icon,
  Button,
  Input,
  Text,
  OverflowMenu,
  MenuItem,
} from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { Category as CategoryEntity } from "@/src/domain/entities/category.entity";
import { CategoryRepositoryImpl } from "@/src/infrastructure";
import { GetAllCategoriesUseCase } from "@/src/application/use-cases/category/get-all-categories.use-case";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Cash, CreditCard, DebitCard } from "@/src/domain/entities/payment-methods.entity";
import { LayoutWithTopNavigation } from "../../common/layouts/LayoutWithTopNavigation";
import { Category } from "../../categories/components/Category";
import { zodSchemaTransaction } from "../zod-schemas/zod-schemas";


const cards = [
  { name: "Nu", lastFour: "**1234" },
  { name: "BBVA", lastFour: "**5678" },
  { name: "Banamex", lastFour: "**9012" },
];


interface FormData {
  amount: string;
  concept: string;
  selectedCategory: CategoryEntity | null;
  paymentMethod: CreditCard | Cash | DebitCard | null;
}



export const TransactionScreen = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(zodSchemaTransaction),
    defaultValues: {
      amount: "",
      concept: "",
      selectedCategory: null,
      paymentMethod: null
    },
  });

  const [selectedCategory, setSelectedCategory] = useState<null | CategoryEntity>(null);

  const onSelectCategory = (category: CategoryEntity) => {
    setSelectedCategory(category);
    setValue("selectedCategory", category);
  };

  const [paymentMethod, setPaymentMethod] = useState<CreditCard | Cash | DebitCard | null>(null);
  const [visible, setVisible] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState<null | number>(
    null
  );
  const [categories, setCategories] = useState<CategoryEntity[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      const categoriesRepository = new CategoryRepositoryImpl();
      const categories = await new GetAllCategoriesUseCase(
        categoriesRepository
      ).execute();
      setCategories(categories);
    };
    getCategories();
  }, []);

  const renderToggleButton = () => (
    <Button onPress={() => setVisible(true)}>
      {selectedCardIndex !== null
        ? cards[selectedCardIndex].name
        : "Selecciona tu tarjeta"}
    </Button>
  );

  const onSelect = (index: number) => {
    setSelectedCardIndex(index);
    setVisible(false);
  };

  const onSubmit = (data: FormData) => {
    console.log("Transacción creada", data);
  };

  const handleSelectPaymentMethod = (paymentMethod: CreditCard | Cash | DebitCard)=> {
    setPaymentMethod(paymentMethod);
    setValue("paymentMethod", paymentMethod);
  }

  return (
    <LayoutWithTopNavigation titleScreen="Crear Transacción">
      <Layout style={styles.mainContainer}>
          
            <Layout style={styles.amountContainer}>
              <Input
                label={"Dinero gastado"}
                placeholder="Cantidad"
                keyboardType="numeric"
                {...register("amount")}
                value={watch("amount")}
                onChangeText={(text) => {
                  const numericText = text.replace(/[^0-9]/g, "");
                  setValue("amount", numericText);
                }}
              />
              {errors.amount && (
                <Text style={styles.errorText}>{errors.amount.message}</Text>
              )}
            </Layout>

            <Text style={styles.sectionTitle}>Tipo de gasto:</Text>
            <Layout style={styles.iconRow}>
              {categories.map((category) => (
                <Category
                  key={category.id}
                  category={category}
                  style={{
                    backgroundColor:
                      selectedCategory?.id === category.id
                        ? "#000"
                        : category.color,
                  }}
                  onPress={()=>onSelectCategory(category)}
                />
              ))}

            </Layout>
            {errors.selectedCategory && (
                <Text style={styles.errorText}>{errors.selectedCategory.message}</Text>
              )}
            <Input
              label={"Concepto:"}
              placeholder="Hasta 25 caracteres"
              maxLength={25}
              {...register("concept")}
              value={watch("concept")}
              onChangeText={(text) => setValue("concept", text)}
            />

            <Text style={styles.sectionTitle}>Método de pago</Text>
            <Layout style={styles.container}>
              <Button
                onPress={()=>handleSelectPaymentMethod({type: "cash"})}
                style={[
                  styles.paymentButton,
                  paymentMethod?.type === "cash" && styles.selectedPaymentButton,
                ]}
                status={paymentMethod?.type === "cash" ? "primary" : "basic"}
              >
                Efectivo
              </Button>
              <Button
                onPress={() => setPaymentMethod({type:"cash"})}
                style={[
                  styles.paymentButton,
                  paymentMethod?.type === "credit" && styles.selectedPaymentButton,
                ]}
                status={paymentMethod?.type === "credit" ? "primary" : "basic"}
              >
                Tarjeta
              </Button>
            </Layout>

            {/* {paymentMethod.type === "Tarjeta" && (
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
            )} */}
            {errors.paymentMethod && (
                <Text style={styles.errorText}>{errors.paymentMethod.message}</Text>
              )}


            <Button style={styles.createButton} onPress={handleSubmit(onSubmit)}>
              Crear
            </Button>
          
      </Layout>
    </LayoutWithTopNavigation>
  );
};

const styles = StyleSheet.create({
  iconBar: {
    width: 24,
    height: 24,
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

  dollarSign: {
    fontSize: 18,
    marginLeft: -20,
    marginHorizontal: 20,
    marginTop: 20,
  },
  amountContainer: {
    marginVertical: 10,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
  mainContainer: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
});