import { Button, Input, Layout } from "@ui-kitten/components"
import { LayoutWithTopNavigation } from "../common/layouts/LayoutWithTopNavigation"
import { Modal } from "react-native";

import ColorPicker, { Panel1, Swatches, Preview, OpacitySlider, HueSlider } from 'reanimated-color-picker';
import { useState } from "react";

export const createCategory = () => {
    const [showModal, setShowModal] = useState(false);
    const onSelectColor = ({ hex }: any) => {
        // do something with the selected color.
        console.log(hex);
      };
    
  return (
    <LayoutWithTopNavigation titleScreen="Crear Categoria">
        <Layout style={{paddingHorizontal: 20}}>
            <Input label="icono de la categoria" placeholder="💦" />
            <Input label="Nombre" placeholder="nombre de la categoria ej (playa)" />
            <Input label="Nombre" placeholder="nombre de la categoria ej (playa)" />
            <Button onPress={() => setShowModal(true)}>Seleccionar color </Button>
        <Modal visible={showModal} animationType='slide'>
            <ColorPicker style={{ width: '70%' }} value='red' onComplete={onSelectColor}>
            <Preview />
            <Panel1 />
            <HueSlider />
            <OpacitySlider />
            <Swatches />
            </ColorPicker>

            <Button onPress={() => setShowModal(false)}>Ok </Button>
        </Modal>
        </Layout>
    </LayoutWithTopNavigation>
  )
}


export default createCategory;