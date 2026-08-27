
const transactionForm = document.getElementById("transactionForm");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("date");

const transactionList = document.getElementById("transactionList");
const emptyState = document.getElementById("emptyState");

const totalIncome = document.getElementById("totalIncome");
const totalExpense = document.getElementById("totalExpense");
const currentBalance = document.getElementById("currentBalance");

const categoryFilter = document.getElementById("categoryFilter");
const currentDate = document.getElementById("currentDate");

const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");
const formTitle = document.getElementById("formTitle");
const formMessage = document.getElementById("formMessage");

let transactions = [];
let editingId = null;

try {
    transactions = JSON.parse(
        localStorage.getItem("expenseTransactions")
    ) || [];

    if (!Array.isArray(transactions)) {
        transactions = [];
    }
} catch (error) {
    transactions = [];
}

const today = new Date();

currentDate.textContent = today.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
});

dateInput.value = formatDateForInput(today);

function formatDateForInput(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function formatCurrency(amount) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 2
    }).format(amount);
}

function formatDisplayDate(date) {
    const parts = date.split("-");

    if (parts.length !== 3) {
        return date;
    }

    const formattedDate = new Date(
        Number(parts[0]),
        Number(parts[1]) - 1,
        Number(parts[2])
    );

    return formattedDate.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });
}

function saveTransactions() {
    localStorage.setItem(
        "expenseTransactions",
        JSON.stringify(transactions)
    );
}

function updateSummary() {
    const income = transactions
        .filter(transaction => transaction.type === "income")
        .reduce((total, transaction) => {
            return total + Number(transaction.amount);
        }, 0);

    const expense = transactions
        .filter(transaction => transaction.type === "expense")
        .reduce((total, transaction) => {
            return total + Number(transaction.amount);
        }, 0);

    const balance = income - expense;

    totalIncome.textContent = formatCurrency(income);
    totalExpense.textContent = formatCurrency(expense);
    currentBalance.textContent = formatCurrency(balance);
}

function renderTransactions() {
    const selectedCategory = categoryFilter.value;

    let filteredTransactions = [...transactions];

    if (selectedCategory !== "all") {
        filteredTransactions = filteredTransactions.filter(transaction => {
            return transaction.category === selectedCategory;
        });
    }

    filteredTransactions.sort((a, b) => {
        return b.date.localeCompare(a.date);
    });

    transactionList.innerHTML = "";

    if (filteredTransactions.length === 0) {
        transactionList.appendChild(emptyState);
        emptyState.style.display = "block";
        return;
    }

    emptyState.style.display = "none";

    filteredTransactions.forEach(transaction => {
        const transactionItem = document.createElement("div");

        transactionItem.className = "transaction-item";

        const sign = transaction.type === "income" ? "+" : "-";

        transactionItem.innerHTML = `
            <div class="transaction-info">
                <div class="transaction-description">
                    ${escapeHTML(transaction.description)}
                </div>

                <div class="transaction-meta">
                    <span class="transaction-category">
                        ${escapeHTML(transaction.category)}
                    </span>

                    <span>
                        ${formatDisplayDate(transaction.date)}
                    </span>
                </div>
            </div>

            <div class="transaction-right">
                <div class="transaction-amount ${transaction.type}">
                    ${sign}${formatCurrency(transaction.amount)}
                </div>

                <div class="transaction-actions">
                    <button
                        type="button"
                        class="action-btn"
                        title="Edit transaction"
                        data-action="edit"
                        data-id="${transaction.id}">
                        <i class="fa-solid fa-pen"></i>
                    </button>

                    <button
                        type="button"
                        class="action-btn delete"
                        title="Delete transaction"
                        data-action="delete"
                        data-id="${transaction.id}">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        `;

        transactionList.appendChild(transactionItem);
    });
}

function escapeHTML(value) {
    const div = document.createElement("div");

    div.textContent = value;

    return div.innerHTML;
}

transactionForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const description = descriptionInput.value.trim();
    const amount = Number(amountInput.value);
    const type = typeInput.value;
    const category = categoryInput.value;
    const date = dateInput.value;

    if (!description) {
        showMessage("Please enter a description.");
        return;
    }

    if (!Number.isFinite(amount) || amount <= 0) {
        showMessage("Please enter a valid amount.");
        return;
    }

    if (!date) {
        showMessage("Please select a date.");
        return;
    }

    const transaction = {
        id: editingId || Date.now().toString(),
        description,
        amount,
        type,
        category,
        date
    };

    if (editingId) {
        transactions = transactions.map(item => {
            return item.id === editingId ? transaction : item;
        });

        showMessage("Transaction updated successfully.", true);
    } else {
        transactions.push(transaction);

        showMessage("Transaction added successfully.", true);
    }

    saveTransactions();
    updateSummary();
    renderTransactions();
    resetForm();
});

transactionList.addEventListener("click", function (event) {
    const button = event.target.closest("[data-action]");

    if (!button) {
        return;
    }

    const transactionId = button.dataset.id;
    const action = button.dataset.action;

    if (action === "edit") {
        editTransaction(transactionId);
    }

    if (action === "delete") {
        deleteTransaction(transactionId);
    }
});

function editTransaction(id) {
    const transaction = transactions.find(item => {
        return item.id === id;
    });

    if (!transaction) {
        return;
    }

    editingId = id;

    descriptionInput.value = transaction.description;
    amountInput.value = transaction.amount;
    typeInput.value = transaction.type;
    categoryInput.value = transaction.category;
    dateInput.value = transaction.date;

    formTitle.textContent = "Edit Transaction";

    submitBtn.innerHTML = `
        <i class="fa-solid fa-check"></i>
        Update Transaction
    `;

    cancelBtn.hidden = false;

    formMessage.textContent = "";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function deleteTransaction(id) {
    const transaction = transactions.find(item => {
        return item.id === id;
    });

    if (!transaction) {
        return;
    }

    const confirmed = confirm(
        `Delete "${transaction.description}"?`
    );

    if (!confirmed) {
        return;
    }

    transactions = transactions.filter(item => {
        return item.id !== id;
    });

    saveTransactions();
    updateSummary();
    renderTransactions();

    showMessage("Transaction deleted successfully.", true);
}

cancelBtn.addEventListener("click", function () {
    resetForm();
});

categoryFilter.addEventListener("change", function () {
    renderTransactions();
});

function resetForm() {
    editingId = null;

    transactionForm.reset();

    dateInput.value = formatDateForInput(new Date());

    formTitle.textContent = "Add Transaction";

    submitBtn.innerHTML = `
        <i class="fa-solid fa-plus"></i>
        Add Transaction
    `;

    cancelBtn.hidden = true;
}

function showMessage(message, success = false) {
    formMessage.textContent = message;
    formMessage.style.color = success ? "#16a34a" : "#dc2626";

    setTimeout(() => {
        formMessage.textContent = "";
    }, 3000);
}

updateSummary();
renderTransactions();
