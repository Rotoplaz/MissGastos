import { getDataBase } from "./database";

export async function migrateDbIfNeeded() {
  const db = await getDataBase();
  try {
    const DATABASE_VERSION = 1;
    const userVersion = await db.getFirstAsync<{ user_version: number }>(
      "PRAGMA user_version"
    );
    if (userVersion!.user_version >= DATABASE_VERSION) {
      return;
    }
    if (userVersion!.user_version === 0) {
      db.execSync(`
    PRAGMA journal_mode = 'wal';
-- Create users table
CREATE TABLE User (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    profilePictureUrl TEXT,
    globalLimitBudget REAL
);

-- Create categories table
CREATE TABLE Category (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    color TEXT,
    icon TEXT
);

-- Create cards table (combined for credit and debit)
CREATE TABLE Card (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    color TEXT,
    lastFourDigits TEXT NOT NULL,
    debt REAL NOT NULL,
    type TEXT CHECK(type IN ('credit', 'debit')), -- Defines whether it is a credit or debit card
    limitDebit REAL, -- Only for debit cards
    dueDate DATE, -- Only for credit cards
    creditLimit REAL,   -- Only for credit cards
    currentBalance REAL -- Only for debit cards
);

-- Create expenses table
CREATE TABLE Expense (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    amount REAL NOT NULL,
    concept TEXT,
    categoryId INTEGER NOT NULL,
    paymentMethod TEXT CHECK(paymentMethod IN ('cash', 'credit', 'debit')), 
    cardId INTEGER,  -- This field is null if paymentMethod is "cash"
    date DATE NOT NULL,  -- Add date field
    FOREIGN KEY (categoryId) REFERENCES Category(id),
    FOREIGN KEY (cardId) REFERENCES Card(id)
);

-- Create reminders table
CREATE TABLE Reminder (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    dueDate DATE NOT NULL,
    isItPaid BOOLEAN NOT NULL
);

-- Create income table
CREATE TABLE Income (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    amount REAL NOT NULL,
    date DATE NOT NULL,  -- Add date field
    concept TEXT
);
  `);        
      const categories = [
        { color: "#e67e22", icon: '🍔', type: "Alimento" },
        { color: "#884ea0", icon: '🚗', type: 'Transporte' },
        { color: "#d4ac0d", icon: '🎉', type: 'Entretenimiento' },
        { color: "#229954", icon: '👗', type: 'Ropa' },
      ];

      for (const category of categories) {
        await db.execAsync(`
            INSERT INTO Category (type, color, icon)
            VALUES ('${category.type}', '${category.color}', '${category.icon}');
          `);
      }

      userVersion!.user_version = 1;
    }
    // if (currentDbVersion === 1) {
    //   Add more migrations
    // }
    await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
  } catch (error) {
    console.log(error);
  } 
  finally{
    await db.closeAsync();
  }
}
