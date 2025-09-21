document.addEventListener('DOMContentLoaded', (click) => {
  let expenseForm = document.getElementById('expense-form');
  let expenseNameInput = document.getElementById('expense-name');
  let expenseAmountInput = document.getElementById('expense-amount');
  let expenseList = document.getElementById('expense-list');
  let totalAmountDisplay = document.getElementById('total-amount');

  let expenses = [];
  let totalAmount = calculateTotal();

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

      //clear input
      expenseNameInput.value = "";
      expenseAmountInput.value = "";
    }
  })

  function calculateTotal() {
    return expenses = 
  }

  function saveExpensesToLocal() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }

})