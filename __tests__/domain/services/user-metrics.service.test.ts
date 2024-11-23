import { Category } from "@/src/domain/entities/category.entity";
import { Expense } from "@/src/domain/entities/expense.entity";
import { Income } from "@/src/domain/entities/income.entity";
import { DebitCard } from "@/src/domain/entities/payment-methods.entity";
import { User } from "@/src/domain/entities/user.entity";
import { UserMetricsService } from "@/src/domain/services/user-metrics.service";

describe("UserMetricsService", () => {
  let service: UserMetricsService;

  beforeEach(() => {
    service = new UserMetricsService();
  });

  describe("getExpenseMetrics", () => {
    it("should calculate total expense and percentages correctly", () => {
      const expenses = [
        { type: "Food", totalExpense: 100, color: "red" },
        { type: "Transport", totalExpense: 50, color: "blue" },
      ];
      const result = service.getExpenseMetrics(expenses);

      expect(result.totalSum).toBe(150);
      expect(result.totalExpensePercentages).toEqual([
        { type: "Food", porcentage: 66.66666666666666, color: "red" },
        { type: "Transport", porcentage: 33.33333333333333, color: "blue" },
      ]);
    });
  });

  describe("isDebitCardLimitExede", () => {
    it("should return true if debt exceeds limit", () => {
      const debitCard: DebitCard = {
        id: 1,
        name: "Debit Card",
        lastFourDigits: "1234",
        debt: 1200,
        limitDebit: 1000,
        currentBalance: 500,
        type: "debit",
      };

      expect(service.isDebitCardLimitExede(debitCard)).toBe(true);
    });

    it("should return false if debt is within limit", () => {
      const debitCard: DebitCard = {
        id: 1,
        name: "Debit Card",
        lastFourDigits: "1234",
        debt: 800,
        limitDebit: 1000,
        currentBalance: 500,
        type: "debit",
      };

      expect(service.isDebitCardLimitExede(debitCard)).toBe(false);
    });
  });

  describe("globalMetrics", () => {
    it("should return 1 if total expenses are between 80% and 120% of the budget", () => {
      const user: User = {
        globalLimitBudget: 1000,
        id: 1,
        name: "test",
        profilePictureUrl: "/",
      };
      const expenses = [{ type: "Food", totalExpense: 900 }];

      expect(service.globalMetrics(user, expenses)).toBe(1);
    });

    it("should return 2 if total expenses exceed 120% of the budget", () => {
      const user: User = {
        globalLimitBudget: 1000,
        id: 1,
        name: "test",
        profilePictureUrl: "/",
      };
      const expenses = [{ type: "Food", totalExpense: 1300 }];

      expect(service.globalMetrics(user, expenses)).toBe(2);
    });

    it("should return 0 if total expenses are within 80% of the budget", () => {
      const user: User = {
        globalLimitBudget: 1000,
        id: 1,
        name: "test",
        profilePictureUrl: "/",
      };
      const expenses = [{ type: "Food", totalExpense: 700 }];

      expect(service.globalMetrics(user, expenses)).toBe(0);
    });

  });

  describe("totalAmountIncomes", () => {
    it("should calculate the total sum of incomes", () => {
      const incomes: Income[] = [
        { id: 1, amount: 500, date: new Date() },
        { id: 2, amount: 300, date: new Date() },
      ];

      expect(service.totalAmountIncomes(incomes)).toBe(800);
    });
  });

  describe("highAmountExpense", () => {
    it("should return the highest expense and its category", () => {
      const category: Category = {
        id: 1,
        type: "Food",
        icon: "star-outline",
        color: "red",
      };
      const expenses: Expense[] = [
        {
          id: 1,
          amount: 100,
          concept: "Groceries",
          category,
          paymentMethod: { type: "cash" },
          date: new Date(),
        },
        {
          id: 2,
          amount: 200,
          concept: "Dinner",
          category,
          paymentMethod: { type: "cash" },
          date: new Date(),
        },
      ];

      const result = service.highAmountExpense(expenses);
      expect(result).toEqual({ amount: 200, category });
    });

    it("should return null if there are no expenses", () => {
      expect(service.highAmountExpense([])).toBeNull();
    });
  });
});
