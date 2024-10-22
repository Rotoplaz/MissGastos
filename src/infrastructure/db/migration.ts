import { SQLiteDatabase } from "expo-sqlite";

export function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 1;
  const userVersion = db.getFirstSync<{ user_version: number }>(
    "PRAGMA user_version"
  );
  if (userVersion!.user_version >= DATABASE_VERSION) {
    return;
  }
  if (userVersion!.user_version === 0) {
    db.execSync(`
  PRAGMA journal_mode = 'wal';
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
    icon TEXT
);

-- Create cards table (combined for credit and debit)
CREATE TABLE Card (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    lastFourDigits TEXT NOT NULL,
    debt REAL NOT NULL,
    cardType TEXT CHECK(cardType IN ('credit', 'debit')), -- Defines whether it is a credit or debit card
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
    concept TEXT
);`);

    userVersion!.user_version = 1;
  }
  // if (currentDbVersion === 1) {
  //   Add more migrations
  // }
  db.execSync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}
