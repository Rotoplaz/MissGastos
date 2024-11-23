import { Expense } from "@/src/domain/entities/expense.entity";
import { Income } from "@/src/domain/entities/income.entity";
import { User } from "@/src/domain/entities/user.entity";

export function getPDFLayout(
  incomes: Income[],
  expenses: Expense[],
  user: User
) {
  const incomeRows = incomes
    .map((income) => {
      return `<tr>
              <td>${income.id}</td>
              <td>${income.concept}</td>
              <td>${income.amount}</td>
              <td>${income.date}</td>
              <td>Ingreso</td>
            </tr>`;
    })
    .join("");

  const expenseRows = expenses
    .map(
      (expense) =>
        `<tr>
           <td>${expense.id}</td>
           <td>${expense.concept}</td>
           <td>${expense.amount}</td>
           <td>${expense.date}</td>
           <td>Gasto</td>
         </tr>`
    )
    .join("");

  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
  const totalExpense = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const balance = (totalIncome - totalExpense).toFixed(2);

  const html = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
          }
          .container {
            padding: 20px;
          }
          .header {
            text-align: right;
          }
          .header img {
            width: 150px;
          }
          .info-right {
            text-align: right;
          }
          .info-right h2 {
            margin: 0;
          }
          .invoice-info {
            margin-bottom: 20px;
          }
          .invoice-info h3 {
            margin: 0;
          }
          .table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          .table th, .table td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: center;
          }
          .table th {
            background-color: #f2f2f2;
          }
          .totals {
            text-align: right;
            margin-top: 20px;
          }
          .totals h4 {
            margin: 0;
          }
          .profile {
            text-align: right;
            margin-top: 20px;
          }
          .user-info {
            margin-bottom: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Header -->
          <div class="header">
            <div class="info-right">
              <h2>MissGastos</h2>
              <p>Reporte de ingresos y gastos del usuario</p>
            </div>
          </div>

          <div class="user-info">
            <h3>Usuario: ${user ? user.name : "N/A"}</h3>
            <p>Límite global de presupuesto: ${
              user ? user.globalLimitBudget : "N/A"
            }</p>
          </div>
          <div class="invoice-info">
            <h3>Resumen de Ingresos y Gastos</h3>
            <p>Fecha del reporte: ${new Date().toLocaleDateString()}</p>
          </div>

          
          
          <table class="table">
            <thead>
              <tr>
                <th colspan="5" style="text-align: center;">Ingresos</th>
              </tr>
              <tr>
                <th>ID</th>
                <th>Concepto</th>
                <th>Monto</th>
                <th>Fecha</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              ${incomeRows}
            </tbody>
          </table>

          
          
          <table class="table">
            <thead>
              <tr>
                <th colspan="5" style="text-align: center;">Gastos</th>
              </tr>
              <tr>
                <th>ID</th>
                <th>Concepto</th>
                <th>Monto</th>
                <th>Fecha</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              ${expenseRows}
            </tbody>
          </table>

          
          <div class="totals">
            <h4>Total Ingresos: $${totalIncome}</h4>
            <h4>Total Gastos: $${totalExpense}</h4>
            <h4>Balance: $${balance}</h4>
          </div>

          
        </div>
      </body>
    </html>
  `;
  return html;
}
