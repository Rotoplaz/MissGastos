import { Button, Input, Layout } from "@ui-kitten/components";
import { LayoutWithTopNavigation } from "../common/layouts/LayoutWithTopNavigation";

import ColorPicker, { Panel1, HueSlider } from "reanimated-color-picker";
import { useState } from "react";

export const createCategory = () => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [color, setColor] = useState("#fff");
  const onSelectColor = ({ hex }: any) => {
    console.log(hex);
    setColor(hex);
  };

  return (
    <LayoutWithTopNavigation titleScreen="Crear Categoria">
      <Layout style={{ paddingHorizontal: 20 }}>
        <Input label="icono de la categoria" placeholder="💦" />
        <Input label="Nombre" placeholder="nombre de la categoria ej (playa)" />
        <Input label="Nombre" placeholder="nombre de la categoria ej (playa)" />
        <Layout
          style={{ backgroundColor: color, width: 25, height: 25 }}
        ></Layout>
        <Button
          style={{ marginTop: 20 }}
          onPress={() => setShowColorPicker(true)}
        >
          Seleccionar color{" "}
        </Button>
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
              Ok{" "}
            </Button>
          </Layout>
        )}
      </Layout>
    </LayoutWithTopNavigation>
  );
};

export default createCategory;
