const Database = require('better-sqlite3');
const path = require('path');

// Create database
const db = new Database(path.join(__dirname, 'expenses.db'));

console.log('Connected to the SQLite database.');

// Create expenses table
db.exec(`CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL,
    amount REAL NOT NULL,
    category TEXT NOT NULL,
    date TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

console.log('Expenses table ready.');

module.exports = db;
