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


-- Insert user
INSERT INTO User (name, profilePictureUrl, globalLimitBudget) VALUES 
('Juan Pérez', 'http://example.com/jperez.jpg', 5000.00);

-- Insert categories
INSERT INTO Category (type, color, icon) VALUES 
('Comida', '#FF5733', '🍔'),          
('Transporte', '#3498DB', '🚗'),       
('Entretenimiento', '#F1C40F', '🎉'),  
('Salud', '#2ECC71', '💊'),            
('Educación', '#8E44AD', '📚'),        
('Ropa', '#E67E22', '👗');            

-- Insert cards
INSERT INTO Card (name, lastFourDigits, debt, cardType, limitDebit, currentBalance) VALUES 
('Debit Card Bank A', '1234', 0.00, 'debit', 5000.00, 1000.00),
('Credit Card Bank B', '5678', 200.00, 'credit', '2024-11-01', 10000.00);

-- Insert expenses
INSERT INTO Expense (amount, concept, categoryId, paymentMethod, cardId, date)
VALUES 
    (50.00, 'Groceries at Walmart', 1, 'debit', 2, '2024-10-01'),
    (15.00, 'Uber ride', 2, 'credit', 1, '2024-10-03'),
    (80.00, 'Movie night', 3, 'cash', NULL, '2024-10-05'),
    (100.00, 'Electricity bill', 4, 'credit', 3, '2024-10-07');


-- Insert reminders
INSERT INTO Reminder (title, description, dueDate, isItPaid) VALUES 
('Pagar tarjeta de crédito', 'Recuerda pagar la tarjeta de crédito este mes.', '2024-10-10', 0),
('Consulta médica', 'No olvidar la consulta médica de la próxima semana.', '2024-10-07', 1);

-- Insert income
INSERT INTO Income (amount, date, concept)
VALUES 
    (1500.00, '2024-10-01', 'Salary'),
    (200.00, '2024-10-03', 'Freelance project'),
    (100.00, '2024-10-05', 'Gift from family');
    
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


-- This query selects all expenses made within a specified date range.
SELECT 
    id,                 
    amount,              
    concept,              
    categoryId,          
    paymentMethod,        
    cardId,              
    date                
FROM 
    Expense
WHERE 
    date BETWEEN '2024-10-01' AND '2024-10-31'
ORDER BY 
    date;                

-- This query selects all incomes recorded within a specified date range.
SELECT 
    id,                   
    amount,               
    concept,             
    date                 
FROM 
    Income
WHERE 
    date BETWEEN '2024-10-01' AND '2024-10-31'
ORDER BY 
    date;
