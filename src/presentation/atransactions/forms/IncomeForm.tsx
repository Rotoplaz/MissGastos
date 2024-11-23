import React from "react";
import { Button, Datepicker, Input, Layout, Text } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IncomeFormData, incomeSchema } from "../zod-schemas/income/zod-schemas";
import { IncomeSqliteRepositoryImpl } from "@/src/infrastructure";
import { CreateIncomeUseCase } from "@/src/application/use-cases/income/create-income.use-case";
import { router } from "expo-router";


export const IncomeForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IncomeFormData>({
    resolver: zodResolver(incomeSchema),
    defaultValues: {
      amount: 0,
      concept: "",
      date: new Date(),
    },
  });

  const onSubmit = async(data: IncomeFormData) => {
    console.log("Ingreso guardado:", data);
    const incomeRepository = new IncomeSqliteRepositoryImpl();
    const income = new CreateIncomeUseCase(incomeRepository).execute({
      amount: data.amount,
      date: data.date,
      concept: data.concept
    });
    router.back();
  };

  return (
    <Layout style={styles.mainContainer}>
      {/* Cantidad */}
      <Controller
        control={control}
        name="amount"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            style={styles.input}
            label="Cantidad del ingreso"
            placeholder="Cantidad"
            keyboardType="numeric"
            onBlur={onBlur}
            onChangeText={(text) => onChange(text.replace(/[^0-9.]/g, ""))}
          />
        )}
      />
      {errors.amount && <Text style={styles.errorText}>{errors.amount.message}</Text>}

      {/* Concepto */}
      <Controller
        control={control}
        name="concept"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            style={styles.input}
            label="Concepto"
            placeholder="Hasta 25 caracteres"
            maxLength={25}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
          />
        )}
      />
      {errors.concept && <Text style={styles.errorText}>{errors.concept.message}</Text>}

      {/* Fecha */}
      <Controller
        control={control}
        name="date"
        render={({ field: { onChange, value } }) => (
          <Datepicker
            style={styles.input}
            label="Fecha del ingreso"
            date={value}
            onSelect={onChange}
          />
        )}
      />
      {errors.date && <Text style={styles.errorText}>{errors.date.message}</Text>}

      {/* Botón Guardar */}
      <Button style={styles.createButton} onPress={handleSubmit(onSubmit)}>
        Guardar
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  input: {
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
  mainContainer: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});
