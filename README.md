# Expense Tracker

A simple expense tracking application built with Express.js, Handlebars, SQLite, and Bootstrap.

## Features

- Add new expenses with description, amount, category, and date
- View all expenses in a table format
- Delete expenses
- Total expense calculation
- Responsive design with Bootstrap
- Clean and modern UI

## Installation

1. Install dependencies:

```bash
npm install
```

2. Start the application:

```bash
npm start
```

For development with auto-restart:

```bash
npm run dev
```

3. Open your browser and navigate to:

```
http://localhost:3000
```

## Technologies Used

- **Express.js** - Web framework
- **Handlebars** - Template engine
- **SQLite3** - Database
- **Bootstrap 5** - CSS framework
- **Bootstrap Icons** - Icons

## Project Structure

```
expense-tracker/
├── app.js              # Main application file
├── database.js         # Database setup and configuration
├── package.json        # Project dependencies
├── views/
│   ├── layouts/
│   │   └── main.handlebars    # Main layout template
│   └── home.handlebars        # Home page view
└── public/
    └── css/
        └── style.css          # Custom styles
```

## Usage

1. **Add Expense**: Fill in the form on the left with description, amount, category, and date, then click "Add Expense"
2. **View Expenses**: All expenses are displayed in the table on the right, sorted by date (newest first)
3. **Delete Expense**: Click the trash icon button next to any expense to delete it
4. **View Total**: The total of all expenses is displayed in the header of the expense list

## Categories

- Food
- Transportation
- Entertainment
- Bills
- Shopping
- Health
- Other
