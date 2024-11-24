import { Input, Layout } from "@ui-kitten/components"
import { LayoutWithTopNavigation } from "../common/layouts/LayoutWithTopNavigation"



export const createCategory = () => {
  return (
    <LayoutWithTopNavigation titleScreen="Crear Categoria">
        <Layout style={{paddingHorizontal: 20}}>
            <Input label="icono de la categoria" placeholder="💦" />
            <Input label="Nombre" placeholder="nombre de la categoria ej (playa)" />
            <Input label="Nombre" placeholder="nombre de la categoria ej (playa)" />
        </Layout>
    </LayoutWithTopNavigation>
  )
}


export default createCategory;