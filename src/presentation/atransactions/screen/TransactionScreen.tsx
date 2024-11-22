
import { LayoutWithTopNavigation } from "../../common/layouts/LayoutWithTopNavigation";
import * as z from 'zod';
import ExpenseForm from "../forms/ExpenseForm";



export const TransactionScreen = () => {


  return (
    <LayoutWithTopNavigation titleScreen="Crear Transacción">
      <ExpenseForm></ExpenseForm>
    </LayoutWithTopNavigation>
  );
};

