// Retrieve and display products
const data = localStorage.getItem('jsonProducts');
const tableDiv = document.getElementById("table");

if (data) {
    const products = JSON.parse(data);

    // Get div element with id "table"

    // Clear existing content
    tableDiv.innerHTML = "";

    // Iterate over categories
    let count = 0;
    Object.keys(products.categories).forEach(category => {
        // Create table element for each category
        const table = document.createElement("table");
        table.classList.add("table", "w-full", "border-collapse", "border");
        table.style.margin = "10px"; // Add margin around the table

        // Create table row for category name
        const categoryRow = table.insertRow();
        categoryRow.classList.add("bg-gray-200");

        const categoryCell = categoryRow.insertCell();
        categoryCell.classList.add("p-2", "font-bold", "w-40");
        categoryCell.textContent = category;

        // Add padding to category cell
        categoryCell.style.padding = "10px";

        // Iterate over products in category
        products.categories[category].forEach(product => {
            // Create table row for each product
            const productRow = table.insertRow();

            // Create table data cells for product details
            const nameCell = productRow.insertCell();
            nameCell.classList.add("p-2", "w-40");
            nameCell.textContent = product.name;

            const priceCell = productRow.insertCell();
            priceCell.classList.add("p-2", "w-40");
            priceCell.textContent = product.price;

            // Create edit button
            const editButton = document.createElement("button");
            editButton.classList.add("p-2", "bg-blue-500", "text-white", "rounded");
            editButton.textContent = "Edit";
            editButton.addEventListener("click", () => {
                // Open HTML form to change the product
                const form = document.createElement("form");
                form.classList.add("flex", "flex-col", "items-center", "mt-4", "bg-BattleshipGrey", "p-5", "rounded-3xl", "outline");
                form.style.position = "fixed";
                form.style.top = "50%";
                form.style.left = "50%";
                form.style.transform = "translate(-50%, -50%)";

                // Create input field for product name
                const nameInput = document.createElement("input");
                nameInput.type = "text";
                nameInput.placeholder = "Enter new name";
                nameInput.classList.add("p-2", "border", "border-gray-300", "rounded", "mb-2");
                form.appendChild(nameInput);

                // Set the default value of the input field to the current product name
                nameInput.value = product.name || "";

                // Create input field for product price
                const priceInput = document.createElement("input");
                priceInput.type = "number";
                priceInput.placeholder = "Enter new price";
                priceInput.step = "0.01"; // Set step to allow floating point numbers
                priceInput.classList.add("p-2", "border", "border-gray-300", "rounded", "mb-2");
                form.appendChild(priceInput);

                // Set the default value of the input field to the current product price
                priceInput.value = product.price || "";

                // Create submit button
                const submitButton = document.createElement("button");
                submitButton.type = "submit";
                submitButton.textContent = "Submit";
                submitButton.classList.add("p-2", "bg-blue-500", "text-white", "rounded");
                form.appendChild(submitButton);

                // Add event listener to form submit
                form.addEventListener("submit", (event) => {
                    event.preventDefault();

                    // Get the new name and price values
                    const newName = nameInput.value;
                    const newPrice = priceInput.value;

                    // Update the product name and price
                    product.name = newName;
                    product.price = newPrice;

                    // Update the table cell values
                    nameCell.textContent = newName;
                    priceCell.textContent = newPrice;

                    // Update the local storage with the modified data
                    localStorage.setItem('jsonProducts', JSON.stringify(products));

                    // Remove the form from the DOM
                    form.remove();
                });

                // Append the form to the document body
                document.body.appendChild(form);
            });

            // Append edit button to product row
            const editCell = productRow.insertCell();
            editCell.classList.add("p-2", "w-40");
            editCell.appendChild(editButton);

            // Create delete button
            const deleteButton = document.createElement("button");
            deleteButton.classList.add("p-2", "bg-red-500", "text-white", "rounded");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", () => {
                // Find the index of the product in the category
                const index = products.categories[category].indexOf(product);

                // Remove the product from the category
                products.categories[category].splice(index, 1);

                // Update the local storage with the modified data
                localStorage.setItem('jsonProducts', JSON.stringify(products));

                // Remove the product row from the table
                table.deleteRow(productRow.rowIndex);
            });

            // Append delete button to product row
            const deleteCell = productRow.insertCell();
            deleteCell.classList.add("p-2", "w-40");
            deleteCell.appendChild(deleteButton);

            // Append product row to table
            table.appendChild(productRow);
        });

        // Append table to div
        if (count % 2 === 0) {
            const div = document.createElement("div");
            div.classList.add("flex", "justify-between");
            div.appendChild(table);
            tableDiv.appendChild(div);
        } else {
            const div = tableDiv.lastElementChild;
            div.appendChild(table);
        }
        count++;
    });


    // Retrieve and display orders
    const ordersData = localStorage.getItem("orders_SK8");

    if (ordersData) {
        const orders = JSON.parse(ordersData);

        // Get div element with id "orders"
        const ordersDiv = document.getElementById("orders");

        // Clear existing content
        ordersDiv.innerHTML = "";

        // Iterate over orders
        let orderCount = 0;
        for (const order of orders) {
            // Create table element for each order
            const ordersTable = document.createElement("table");
            ordersTable.classList.add("table", "w-full", "border-collapse", "border");
            ordersTable.style.margin = "10px"; // Add margin around the table

            // Create table row for order details
            const orderRow = ordersTable.insertRow();
            orderRow.classList.add("bg-gray-200");

            
            const orderCell = orderRow.insertCell();
            orderCell.classList.add("p-2", "font-bold", "w-40");
            orderCell.textContent = `Order ID: ${order.id}`;
            const totalPriceCell = orderRow.insertCell();
            totalPriceCell.classList.add("p-2", "font-bold", "w-40");
            let total = 0;
            totalPriceCell.textContent = `Total Price: ${total}`;
            // Add padding to order cell
            orderCell.style.padding = "10px";

            // Create Finish Order button
            const finishOrderButton = document.createElement("button");
            finishOrderButton.classList.add("p-2", "bg-green-500", "text-white", "rounded");
            finishOrderButton.textContent = "Finish Order";
            finishOrderButton.addEventListener("click", () => {
                // Find the index of the order in the orders array
                const index = orders.indexOf(order);

                // Remove the order from the orders array
                orders.splice(index, 1);

                // Update the local storage with the modified data
                localStorage.setItem("orders_SK8", JSON.stringify(orders));

                // Remove the order table from the div
                ordersTable.remove();

                // Remove the table if there are no more orders
                if (orders.length === 0) {
                    ordersDiv.innerHTML = "";
                }
            });

            // Append Finish Order button to order row
            const finishOrderCell = orderRow.insertCell();
            finishOrderCell.classList.add("p-2", "w-40");
            finishOrderCell.appendChild(finishOrderButton);

            // Iterate over items in order
            for (const item of order.items) {
                // Create table row for each item
                const itemRow = ordersTable.insertRow();

                // Create table data cells for item details
                const nameCell = itemRow.insertCell();
                nameCell.classList.add("p-2", "w-40");
                nameCell.textContent = item.name;

                const quantityCell = itemRow.insertCell();
                quantityCell.classList.add("p-2", "w-40");
                quantityCell.textContent = item.amount;

                const priceCell = itemRow.insertCell();
                priceCell.classList.add("p-2", "w-40");
                priceCell.textContent = item.price * item.amount;
                total += item.price * item.amount;
                totalPriceCell.textContent = `Total Price: ${total}`;

                // Append item row to table
                ordersTable.appendChild(itemRow);
            }

            // Append table to div
            if (orderCount % 2 === 0) {
                const div = document.createElement("div");
                div.classList.add("flex", "justify-between");
                div.appendChild(ordersTable);
                ordersDiv.appendChild(div);
            } else {
                const div = ordersDiv.lastElementChild;
                div.appendChild(ordersTable);
            }
            orderCount++;
        }
    }
} else {
    console.log("No data found in local storage");
}

// Reset products
const resetButton = document.getElementById("reset");
resetButton.addEventListener("click", async () => {
    try {
        const response = await fetch("../../products.json");
        const products = await response.json();
        localStorage.setItem('jsonProducts', JSON.stringify(products));
        // Clear existing content
        tableDiv.innerHTML = '';

        // Reload the page to reset the products


        // Reload the page to reset the products
        window.location.reload();
    } catch (error) {
        console.error("Error resetting products:", error);
    }
});
