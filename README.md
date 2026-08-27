# 💰 Expense Tracker — CODSOFT Task 3

A responsive and user-friendly **Expense Tracker Web Application** developed as part of my **CODSOFT Web Development Internship — Task 3**.

The application allows users to record their income and expenses, monitor their current balance, and manage their transaction history using browser Local Storage.


## 🔗 Live Demo
https://tanvi-jpeg.github.io/expense-tracker/

## ✨ Features

* 💵 Add income transactions
* 💸 Add expense transactions
* 📊 Automatically calculate total income
* 📉 Automatically calculate total expenses
* 💰 Display current balance
* 🧾 View transaction history
* 📅 Display transaction dates
* 🏷️ Categorize transactions
* 🔎 Filter transactions by category
* ✏️ Edit transactions
* 🗑️ Delete transactions
* 💾 Save transactions using Local Storage
* 📱 Responsive design for mobile, tablet, and desktop
* ⚠️ Input validation
* 📝 Empty-state message when no transactions are available

## 🛠️ Technologies Used

* **HTML5** — Structure
* **CSS3** — Styling and responsive layout
* **JavaScript** — Application functionality
* **Local Storage API** — Persistent transaction data
* **Font Awesome** — Icons

## 📂 Project Structure

```text
codsoft_task3/
│
├── index.html
├── style.css
├── script.js
├── README.md
└── .gitignore
```

## 💡 How It Works

### Add Transaction

Users can enter:

* Transaction description
* Amount
* Transaction type
* Category
* Date

After clicking **Add Transaction**, the transaction is added to the history and the financial summary is updated automatically.

### Edit Transaction

Click the **Edit** button on an existing transaction to modify its details.

### Delete Transaction

Click the **Delete** button to remove a transaction from the history.

### Filter Transactions

Use the category filter to display transactions belonging to a specific category.

## 💾 Local Storage

The application uses the browser's **Local Storage API** to store transaction data.

This allows transactions to remain available even after refreshing or reopening the application in the same browser.

> Local Storage stores data locally in the user's browser and does not provide cloud synchronization.

## 📊 Financial Summary

The dashboard automatically calculates:

```text
Total Income
     ↓
Total Expenses
     ↓
Current Balance
```

The current balance is calculated as:

```text
Current Balance = Total Income - Total Expenses
```

## 📱 Responsive Design

The application adapts to different screen sizes:

* 💻 Desktop
* 💻 Laptop
* 📱 Mobile
* 📟 Tablet

## 📸 Screenshots

Add screenshots of your application here.

```html
<img width="815" height="676" alt="Expense Tracker Screenshot" src="YOUR_SCREENSHOT_URL">
```

## 🌐 Live Demo

🔗 **Live Demo:** Add your Vercel deployment link here.

## 🎯 CODSOFT Task 3

This project was created to demonstrate practical front-end development skills, including:

* HTML structure
* CSS responsive design
* JavaScript DOM manipulation
* Event handling
* Form validation
* Array methods
* Local Storage
* CRUD operations
* Dynamic UI rendering

## 🔮 Future Improvements

Possible future features include:

* 📈 Expense charts and visual analytics
* 📅 Monthly and yearly reports
* 📤 Export transactions as CSV
* 🌙 Dark mode
* 🔐 User authentication
* ☁️ Cloud database
* 💱 Multiple currency support
* 📊 Spending insights and budgets

## 👩‍💻 Author

**Tanvi**

GitHub: [@tanvi-jpeg](https://github.com/tanvi-jpeg)

---

⭐ If you like this project, consider giving the repository a star!
