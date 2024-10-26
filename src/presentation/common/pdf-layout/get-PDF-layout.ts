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
              <td>${income.amount}</td>
              <td>${income.concept}</td>
              <td>${income.date}</td>
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
            text-align: left;
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
              <p>Centro Universitario de Ciencias Exactas e Ingenierías (CUCEI)</p>
            </div>
          </div>

          <div class="user-info">
            <h3>Reporte para el usuario: ${user ? user.name : "N/A"}</h3>
            <p>Límite global de presupuesto: ${user ? user.globalLimitBudget : "N/A"}</p>
          </div>
          <div class="invoice-info">
            <h3>Resumen de Ingresos y Gastos</h3>
            <p>Fecha del reporte: ${new Date().toLocaleDateString()}</p>
          </div>

          
          <h3>Ingresos</h3>
          <table class="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Descripción</th>
                <th>Monto</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              ${incomeRows}
            </tbody>
          </table>

          
          <h3>Gastos</h3>
          <table class="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Concepto</th>
                <th>Monto</th>
                <th>Fecha</th>
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
