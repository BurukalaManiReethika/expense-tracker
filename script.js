const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const form = document.getElementById("transaction-form");
const list = document.getElementById("list");

let transactions =
    JSON.parse(localStorage.getItem("transactions")) || [];

function updateUI() {

    list.innerHTML = "";

    const amounts = transactions.map(t => t.amount);

    const total =
        amounts.reduce((acc, item) => acc + item, 0);

    const incomeTotal =
        amounts
            .filter(item => item > 0)
            .reduce((acc, item) => acc + item, 0);

    const expenseTotal =
        amounts
            .filter(item => item < 0)
            .reduce((acc, item) => acc + item, 0);

    balance.innerText = `₹${total.toFixed(2)}`;
    income.innerText = `₹${incomeTotal.toFixed(2)}`;
    expense.innerText = `₹${Math.abs(expenseTotal).toFixed(2)}`;

    transactions.forEach(transaction => {

        const li = document.createElement("li");

        li.classList.add(
            transaction.amount > 0 ? "plus" : "minus"
        );

        li.innerHTML = `
            ${transaction.text}
            <span>
                ₹${transaction.amount}
                <button
                    class="delete-btn"
                    onclick="removeTransaction(${transaction.id})">
                    X
                </button>
            </span>
        `;

        list.appendChild(li);
    });

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );
}

function addTransaction(e) {

    e.preventDefault();

    const text =
        document.getElementById("text").value;

    const amount =
        +document.getElementById("amount").value;

    const transaction = {
        id: Date.now(),
        text,
        amount
    };

    transactions.push(transaction);

    updateUI();

    form.reset();
}

function removeTransaction(id) {

    transactions =
        transactions.filter(
            transaction => transaction.id !== id
        );

    updateUI();
}

form.addEventListener("submit", addTransaction);

updateUI();
