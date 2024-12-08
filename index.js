const expenseAmountInput = document.getElementById("expenseAmount");
        const expenseDescriptionInput = document.getElementById("expenseDescription");
        const expenseCategoryInput = document.getElementById("expenseCategory");
        const addExpenseBtn = document.getElementById("addExpenseBtn");
        const expenseList = document.getElementById("expenseList");

        // Load expenses from local storage
        let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

        // Function to save expenses to local storage
        function saveToLocalStorage() {
            localStorage.setItem("expenses", JSON.stringify(expenses));
        }

        // Function to render the expense list
        function renderExpenses() {
            expenseList.innerHTML = "";
            expenses.forEach((expense, index) => {
                const expenseItem = document.createElement("li");
                expenseItem.classList.add("expense-item");

                expenseItem.innerHTML = `
                    <div>
                        <strong>Amount:</strong> $${expense.amount} | 
                        <strong>Description:</strong> ${expense.description} | 
                        <strong>Category:</strong> ${expense.category}
                    </div>
                    <div class="expense-actions">
                        <button class="btn btn-warning btn-sm" onclick="editExpense(${index})">Edit</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteExpense(${index})">Delete</button>
                    </div>
                `;

                expenseList.appendChild(expenseItem);
            });
        }

        // Function to add a new expense
        function addExpense() {
            const amount = expenseAmountInput.value.trim();
            const description = expenseDescriptionInput.value.trim();
            const category = expenseCategoryInput.value;

            if (amount === "" || description === "") {
                alert("Please enter all details");
                return;
            }

            const newExpense = { amount, description, category };
            expenses.push(newExpense);
            saveToLocalStorage();
            renderExpenses();

            // Clear the input fields
            expenseAmountInput.value = "";
            expenseDescriptionInput.value = "";
            expenseCategoryInput.value = "Movie";
        }

        // Function to delete an expense
        function deleteExpense(index) {
            if (confirm("Are you sure you want to delete this expense?")) {
                expenses.splice(index, 1);
                saveToLocalStorage();
                renderExpenses();
            }
        }

        // Function to edit an expense
        function editExpense(index) {
            const expense = expenses[index];
            const newDescription = prompt("Edit description:", expense.description);

            if (newDescription !== null && newDescription.trim() !== "") {
                expenses[index].description = newDescription.trim();
                saveToLocalStorage();
                renderExpenses();
            } else {
                alert("Description cannot be empty.");
            }
        }

        // Event Listener for Add Expense Button
        addExpenseBtn.addEventListener("click", addExpense);

        // Render expenses on page load
        renderExpenses();