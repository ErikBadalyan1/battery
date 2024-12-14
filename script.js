// Get references to form, table, and income section
const form = document.getElementById("batteryForm");
const tableBody = document.querySelector("#batteryTable tbody");
const monthlyIncomeElement = document.getElementById("monthlyIncome");

// Load saved data from localStorage
const loadEntries = () => {
    const entries = JSON.parse(localStorage.getItem("batteryEntries")) || [];
    entries.forEach(entry => addRowToTable(entry));
    updateMonthlyIncome(entries);
};

// Save entries to localStorage
const saveEntry = (entry) => {
    const entries = JSON.parse(localStorage.getItem("batteryEntries")) || [];
    entries.push(entry);
    localStorage.setItem("batteryEntries", JSON.stringify(entries));
    updateMonthlyIncome(entries);
};

// Add a row to the table
const addRowToTable = (entry) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${entry.batteryName}</td>
        <td>${entry.amperes}</td>
        <td>${entry.customerPhone}</td>
        <td>${entry.chargedAmount}</td>
        <td>${entry.entryDate}</td>
        <td>${entry.batteryStatus}%</td>
    `;
    tableBody.appendChild(row);
};

// Update monthly income
const updateMonthlyIncome = (entries) => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const monthlyIncome = entries
        .filter(entry => {
            const entryDate = new Date(entry.entryDate);
            return (
                entryDate.getMonth() === currentMonth &&
                entryDate.getFullYear() === currentYear
            );
        })
        .reduce((sum, entry) => sum + parseFloat(entry.chargedAmount), 0);

    monthlyIncomeElement.textContent = `$${monthlyIncome.toFixed(2)}`;
};

// Handle form submission
form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Get form values
    const batteryName = document.getElementById("batteryName").value;
    const amperes = document.getElementById("amperes").value;
    const customerPhone = document.getElementById("customerPhone").value;
    const chargedAmount = document.getElementById("chargedAmount").value;
    const entryDate = document.getElementById("entryDate").value;
    const batteryStatus = document.getElementById("batteryStatus").value;

    // Create an entry object
    const entry = {
        batteryName,
        amperes,
        customerPhone,
        chargedAmount,
        entryDate,
        batteryStatus
    };

    // Save entry and add to table
    saveEntry(entry);
    addRowToTable(entry);

    // Reset form
    form.reset();
});

// Initialize table with saved data
loadEntries();
