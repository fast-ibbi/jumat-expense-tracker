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

// TODO: Halaman Utama - Tampilkan semua pengeluaran
// GET '/' - Ambil data pengeluaran dari database, hitung total dan ringkasan kategori, render view home
app.get('/', (req, res) => {
    // TODO: Implementasikan logika di sini
    res.render('home', { 
        expenses: [], 
        total: 0,
        hasExpenses: false,
        categoryData: [],
        hasCategoryData: false
    });
});

// TODO: Tambah pengeluaran
// POST '/add' - Masukkan pengeluaran baru ke database
app.post('/add', (req, res) => {
    // TODO: Implementasikan logika di sini
    res.redirect('/');
});

// TODO: Hapus pengeluaran
// POST '/delete/:id' - Hapus pengeluaran dari database berdasarkan ID
app.post('/delete/:id', (req, res) => {
    // TODO: Implementasikan logika di sini
    res.redirect('/');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
