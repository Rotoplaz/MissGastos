import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Icon,
  Input,
  Layout,
  MenuItem,
  OverflowMenu,
  Text,
} from "@ui-kitten/components";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { Category as CategoryEntity } from "@/src/domain/entities/category.entity";
import {
  Cash,
  CreditCard,
  DebitCard,
} from "@/src/domain/entities/payment-methods.entity";
import { zodSchemaTransaction } from "../zod-schemas/expense/zod-schemas";
import { useCardsStore } from "../../store";
import { ExpenseSqliteRepositoryImpl } from "@/src/infrastructure";
import { CreateExpenseUseCase } from "@/src/application/use-cases/expense/create-expense.use-case";
import { Category } from "../../categories/components/Category";
import { useExpenseStore } from "../../store/expense/useExpenseStore";
import { router } from "expo-router";
import { useCategoryStore } from "../../store/categories/useCategoryStore";
import { List, ListItem } from "@ui-kitten/components";
import { useTheme } from "@react-navigation/native";

interface FormData {
  amount: string;
  concept: string;
  selectedCategory: CategoryEntity | null;
  paymentMethod: CreditCard | Cash | DebitCard | null;
}

export const ExpenseForm = () => {
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
      paymentMethod: null,
    },
  });

  const theme = useTheme();

  const addExpenseStore = useExpenseStore((state) => state.addExpense);

  const [selectedCategory, setSelectedCategory] =
    useState<null | CategoryEntity>(null);

  const onSelectCategory = (category: CategoryEntity) => {
    setSelectedCategory(category);
    setValue("selectedCategory", category);
  };

  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card" | null>(
    null
  );
  const [visible, setVisible] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState<null | number>(
    null
  );
  const cards = useCardsStore((state) => state.cards);
  const categories = useCategoryStore((state) => state.categories);

  const renderToggleButton = () => (
    <Button onPress={() => setVisible(true)}>
      {selectedCardIndex !== null
        ? cards[selectedCardIndex].name
        : "Selecciona tu tarjeta"}
    </Button>
  );

  const onSelect = (index: number) => {
    setSelectedCardIndex(index);
    setValue("paymentMethod", cards[index]);

    setVisible(false);
  };

  const onSubmit = async (data: FormData) => {
    const expensesRepository = new ExpenseSqliteRepositoryImpl();
    const transaction = await new CreateExpenseUseCase(
      expensesRepository
    ).execute({
      amount: +data.amount,
      category: data.selectedCategory!,
      date: new Date(),
      paymentMethod: data.paymentMethod!,
      concept: data.concept,
      type: "expense",
    });
    addExpenseStore(transaction);
    router.back();
  };

  const handleSelectPaymentMethod = (
    paymentMethod: CreditCard | Cash | DebitCard
  ) => {
    setPaymentMethod("cash");
    setValue("paymentMethod", paymentMethod);
  };

  const renderCategory = ({ item }: { item: CategoryEntity }) => (
    <Layout style={{ padding: 10 }}>
      <Category
        category={item}
        onPress={() => onSelectCategory(item)}
        style={{
          backgroundColor:
            selectedCategory?.id === item.id ? "#000" : item.color,
        }}
      />
    </Layout>
  );

  return (
    <Layout style={styles.mainContainer}>
      <Layout style={styles.amountContainer}>
        <Input
          size='large'
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
        {/* {categories.slice(0, 4).map((category) => (
          <Category
            key={category.id}
            category={category}
            style={{
              backgroundColor:
                selectedCategory?.id === category.id ? "#000" : category.color,
            }}
            onPress={() => onSelectCategory(category)}
          />
        ))} */}
        <List
          style={{ maxHeight: 300, backgroundColor: theme.colors.background }}
          horizontal
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          showsHorizontalScrollIndicator={false}
        />
      </Layout>
      {errors.selectedCategory && (
        <Text style={styles.errorText}>{errors.selectedCategory.message}</Text>
      )}
      <Input
        size='large'        label={"Concepto:"}
        placeholder="Hasta 25 caracteres"
        maxLength={25}
        {...register("concept")}
        value={watch("concept")}
        onChangeText={(text) => setValue("concept", text)}
      />

      <Text style={styles.sectionTitle}>Método de pago</Text>
      <Layout style={styles.container}>
        <Button
          onPress={() => handleSelectPaymentMethod({ type: "cash" })}
          style={[
            styles.paymentButton,
            paymentMethod === "cash" && styles.selectedPaymentButton,
          ]}
          status={paymentMethod === "cash" ? "primary" : "basic"}
          appearance={paymentMethod === "cash" ? "filled": 'outline'}
        >
          Efectivo
        </Button>
        <Button
          onPress={() => setPaymentMethod("card")}
          style={[
            styles.paymentButton,
            paymentMethod === "card" && styles.selectedPaymentButton,
          ]}
          status={paymentMethod === "card" ? "primary" : "basic"}
          appearance={paymentMethod === "card" ? "filled": 'outline'}
        >
          Tarjeta
        </Button>
      </Layout>

      {paymentMethod === "card" && (
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
                      {card.lastFourDigits}
                    </Text>
                  </Layout>
                )}
                onPress={() => onSelect(index)}
              />
            ))}
          </OverflowMenu>
        </>
      )}
      {errors.paymentMethod && (
        <Text style={styles.errorText}>{errors.paymentMethod.message}</Text>
      )}

      <Button style={styles.createButton} onPress={handleSubmit(onSubmit)}>
        Crear
      </Button>
    </Layout>
  );
};

export default ExpenseForm;

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
    paddingVertical: 16,
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
