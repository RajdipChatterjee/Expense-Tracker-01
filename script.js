document.addEventListener('DOMContentLoaded', (click) => {
  let expenseForm = document.getElementById('expense-form');
  let expenseNameInput = document.getElementById('expense-name');
  let expenseAmountInput = document.getElementById('expense-amount');
  let expenseList = document.getElementById('expense-list');
  let totalAmountDisplay = document.getElementById('total-amount');

  let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  let totalAmount = calculateTotal();
  renderExpenses();
  updateTotal();

  expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value.trim());

    if(name !== "" && !isNaN(amount) && amount > 0) {
      const newExpense = {
        id: Date.now(),
        name,
        amount
      }
      expenses.push(newExpense);
      saveExpensesToLocal();
      renderExpenses();
      updateTotal();

      //clearInput
      expenseNameInput.value = "";
      expenseAmountInput.value = "";
    }
  });

  function renderExpenses() {
    expenseList.innerHTML = "";
    expenses.forEach(expense => {
      const li = document.createElement('li');
      li.innerHTML = `
        ${expense.name} - $${expense.amount}
        <button data-id="${expense.id}">Delete</button>
      `
      expenseList.appendChild(li);
    })
  }

  function calculateTotal() {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }

  function saveExpensesToLocal() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }

  function updateTotal() {
    totalAmount = calculateTotal();
    totalAmountDisplay.textContent = totalAmount.toFixed(2);
  }

  expenseList.addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON') {
      const expenseId = JSON.parse(e.target.getAttribute('data-id'));
      expenses = expenses.filter(expense => expense.id !== expenseId);
      saveExpensesToLocal();
      renderExpenses();
      updateTotal();
    }
  })
})