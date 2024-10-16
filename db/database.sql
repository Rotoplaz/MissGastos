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
    icon TEXT
);

-- Create cards table (combined for credit and debit)
CREATE TABLE Card (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    lastFourDigits TEXT NOT NULL,
    debt REAL NOT NULL,
    cardType TEXT CHECK(cardType IN ('credit', 'debit')), -- Defines whether it is a credit or debit card
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
);


-- Insert user
INSERT INTO User (name, profilePictureUrl, globalLimitBudget) VALUES 
('Juan Pérez', 'http://example.com/jperez.jpg', 5000.00);
-- Insert categories
INSERT INTO Category (type, icon) VALUES 
('Comida', '🍔'),
('Transporte', '🚗'),
('Entretenimiento', '🎉'),
('Salud', '💊');

-- Insert cards
INSERT INTO Card (name, lastFourDigits, debt, cardType, creditLimit, currentBalance) VALUES 
('Visa Classic', '1234', 1500.00, 'credit', 5000.00, NULL),
('MasterCard Platinum', '5678', 200.00, 'debit', NULL, 1200.00),
('American Express', '9012', 500.00, 'credit', 7000.00, NULL);

-- Insert expenses
INSERT INTO Expense (amount, concept, categoryId, paymentMethod, cardId) VALUES 
(50.00, 'Almuerzo', 1, 'debit', 2),
(100.00, 'Cine', 3, 'credit', 1),
(30.00, 'Medicamentos', 4, 'cash', NULL),
(200.00, 'Gasolina', 2, 'debit', 2);

-- Insert reminders
INSERT INTO Reminder (title, description, dueDate, isItPaid) VALUES 
('Pagar tarjeta de crédito', 'Recuerda pagar la tarjeta de crédito este mes.', '2024-10-10', 0),
('Consulta médica', 'No olvidar la consulta médica de la próxima semana.', '2024-10-07', 1);

-- Insert income
INSERT INTO Income (amount, concept) VALUES 
(3000.00, 'Salario de octubre'),
(150.00, 'Freelance'),
(1200.00, 'Venta de artículos usados');

-- Get all users
SELECT * FROM User;

-- Get all categories
SELECT * FROM Category;

-- Get all credit cards
SELECT * FROM Card WHERE cardType = 'credit';

-- Get all expenses made with debit card
SELECT * FROM Expense WHERE paymentMethod = 'debit';

-- Get all unpaid reminders
SELECT * FROM Reminder WHERE isItPaid = 0;

-- Get total income
SELECT SUM(amount) AS TotalIncome FROM Income;

-- Get expenses grouped by category
SELECT c.type, SUM(e.amount) AS TotalExpense 
FROM Expense e
JOIN Category c ON e.categoryId = c.id
GROUP BY c.type;

-- Get the card with the highest credit limit
SELECT * FROM Card WHERE cardType = 'credit' ORDER BY creditLimit DESC LIMIT 1;


