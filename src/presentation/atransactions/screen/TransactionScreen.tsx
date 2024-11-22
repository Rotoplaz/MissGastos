import { LayoutWithTopNavigation } from "../../common/layouts/LayoutWithTopNavigation";
import ExpenseForm from "../forms/ExpenseForm";
import { TopTabsNavigation } from "../../common/navigation/TopTabsNavigation";
import { useState } from "react";
import { Text } from "@ui-kitten/components";

const tabs = [
  {
    index: 0,
    component: <ExpenseForm />,
  },
];

export const TransactionScreen = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <LayoutWithTopNavigation titleScreen="Crear Transacción">
      <TopTabsNavigation index={tabIndex} setTabIndex={setTabIndex} />
      {tabs[tabIndex]?.component || <Text>Componente no encontrado</Text>}
    </LayoutWithTopNavigation>
  );
};
