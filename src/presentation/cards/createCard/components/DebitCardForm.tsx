import { Button, Input, Layout, Text } from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";

import { DebitCard } from "@/src/domain/entities/payment-methods.entity";
import { useDebitCardForm } from "../hooks/useDebitCardForm";
import ColorPicker, { HueSlider, Panel1 } from "reanimated-color-picker";

interface Props {
  debitCard: DebitCard | null;
}

export const DebitCardForm = ({ debitCard }: Props) => {
  const {
    errors,
    handleSubmit,
    setValue,
    watch,
    onSubmit,
    color,
    onSelectColor,
    setShowColorPicker,
    showColorPicker,
  } = useDebitCardForm(debitCard);
  return (
    <>
      <Layout style={style.inputContainer}>
        <Text style={style.label}>Alias de la tarjeta</Text>
        <Input
          placeholder="Alias de la tarjeta"
          onChangeText={(text) => setValue("name", text)}
          value={watch("name")}
        />
        {errors.name && <Text style={style.error}>{errors.name.message}</Text>}
      </Layout>

      <Layout style={style.inputContainer}>
        <Text style={style.label}>Últimos 4 dígitos</Text>
        <Input
          placeholder="****"
          keyboardType="numeric"
          maxLength={4}
          onChangeText={(text) =>
            setValue("lastFourDigits", text.replace(/[^0-9]/g, ""))
          }
          value={watch("lastFourDigits")}
        />
        {errors.lastFourDigits && (
          <Text style={style.error}>{errors.lastFourDigits.message}</Text>
        )}
      </Layout>

      <Layout style={style.inputContainer}>
        <Text style={style.label}>Deuda</Text>
        <Input
          placeholder="Cantidad"
          keyboardType="numeric"
          onChangeText={(text) => setValue("debt", text.replace(/[^0-9]/g, ""))}
          value={watch("debt")}
        />
        {errors.debt && <Text style={style.error}>{errors.debt.message}</Text>}
      </Layout>

      <Layout style={style.inputContainer}>
        <Text style={style.label}>Límite de gasto</Text>
        <Input
          placeholder="Solo números"
          keyboardType="numeric"
          onChangeText={(text) =>
            setValue("limit", text.replace(/[^0-9]/g, ""))
          }
          value={watch("limit")}
        />
        {errors.limit && (
          <Text style={style.error}>{errors.limit.message}</Text>
        )}
      </Layout>

      <Layout style={style.inputContainer}>
        <Text style={style.label}>Saldo actual</Text>
        <Input
          placeholder="Solo números"
          keyboardType="numeric"
          onChangeText={(text) =>
            setValue("currentBalance", text.replace(/[^0-9]/g, ""))
          }
          value={watch("currentBalance")}
        />
        {errors.currentBalance && (
          <Text style={style.error}>{errors.currentBalance.message}</Text>
        )}
      </Layout>
      <Layout style={style.colorRow}>
        <Button onPress={() => setShowColorPicker(true)}>
          Seleccionar color
        </Button>
        <Button
          appearance="ghost"
          style={[style.colorPreview, { backgroundColor: color }]}
          onPress={() => setShowColorPicker(true)}
        />
      </Layout>
      {showColorPicker && (
        <Layout
          style={{
            margin: "auto",
            width: "90%",
            marginTop: 10,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
            backgroundColor: "#151515",
            borderRadius: 50,
          }}
        >
          <ColorPicker
            style={{ width: "80%" }}
            value="#fff"
            onComplete={onSelectColor}
          >
            <Panel1 />
            <HueSlider />
          </ColorPicker>
          <Button
            style={{ marginTop: 10 }}
            onPress={() => setShowColorPicker(false)}
          >
            Ok
          </Button>
        </Layout>
      )}
      <Layout style={{ alignSelf: "center", marginTop: 20 }}>
        <Button onPress={handleSubmit(onSubmit)}>Guardar</Button>
      </Layout>
    </>
  );
};

const style = StyleSheet.create({
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 5,
  },
  colorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    gap: 25,
  },
  colorPreview: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  colorPickerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
});
