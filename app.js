const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Handlebars setup
app.engine('hbs', exphbs.engine({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: {
        formatDate: function(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString();
        },
        formatCurrency: function(amount) {
            return new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR'
            }).format(amount);
        }
    }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes

// Home - Display all expenses
app.get('/', (req, res) => {
    try {
        const sql = `SELECT * FROM expenses ORDER BY date DESC`;
        const expenses = db.prepare(sql).all();
        
        // Calculate total
        const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        
        // Calculate category summary
        const categorySummary = expenses.reduce((summary, expense) => {
            if (!summary[expense.category]) {
                summary[expense.category] = 0;
            }
            summary[expense.category] += expense.amount;
            return summary;
        }, {});
        
        // Convert to array and sort by amount descending
        const categoryData = Object.keys(categorySummary).map(category => ({
            category,
            total: categorySummary[category],
            percentage: total > 0 ? ((categorySummary[category] / total) * 100).toFixed(1) : 0
        })).sort((a, b) => b.total - a.total);
        
        res.render('home', { 
            expenses, 
            total,
            hasExpenses: expenses.length > 0,
            categoryData,
            hasCategoryData: categoryData.length > 0
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send('Kesalahan saat mengambil data pengeluaran');
    }
});

// Add expense
app.post('/add', (req, res) => {
    try {
        const { description, amount, category, date } = req.body;
        
        const sql = `INSERT INTO expenses (description, amount, category, date) VALUES (?, ?, ?, ?)`;
        db.prepare(sql).run(description, amount, category, date);
        
        res.redirect('/');
    } catch (err) {
        console.error(err);
        return res.status(500).send('Kesalahan saat menambahkan pengeluaran');
    }
});

// Delete expense
app.post('/delete/:id', (req, res) => {
    try {
        const { id } = req.params;
        
        const sql = `DELETE FROM expenses WHERE id = ?`;
        db.prepare(sql).run(id);
        
        res.redirect('/');
    } catch (err) {
        console.error(err);
        return res.status(500).send('Kesalahan saat menghapus pengeluaran');
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
