function dotCart() {
    const cartItems = JSON.parse(localStorage.getItem("cart_SK8"));
    const cartDot = document.getElementById("cartDot");
    if (cartItems.length > 0) {
        cartDot.classList.remove("hidden");
        cartDot.classList.add("visible");
    } else {
        cartDot.classList.remove("visible");
        cartDot.classList.add("hidden");
    }
}

function fetchData() {
    fetch("../../products.json")
        .then((response) => response.json())
        .then((data) => {
            if (!localStorage.getItem("jsonProducts")) {
                localStorage.setItem("cart_SK8", JSON.stringify([]));
                localStorage.setItem("jsonProducts", JSON.stringify(data));
            }
            dotCart();
            waitForFetchData(); // Call the function here to ensure it runs after data is fetched
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

console.log("jsonProducts local:");
console.log(JSON.parse(localStorage.getItem("jsonProducts")));

fetchData();

console.log("cart_SK8 local:");
console.log(JSON.parse(localStorage.getItem("cart_SK8")));

function waitForFetchData() {
    let jsonProducts = JSON.parse(localStorage.getItem("jsonProducts"));

    const recommendedDiv = document.getElementById("recomended");

    Object.entries(jsonProducts.categories).forEach(([, products]) => {
        products.slice(0, 1).forEach((product) => {
            const productCard = document.createElement("div");
            productCard.classList.add(
                "product-card",
                "outline",
                "rounded-3xl",
                "flex",
                "flex-col",
                "justify-center",
                "items-center",
                "shadow-md",
                "lg:w-56",
                "duration-500",
                "hover:scale-105",
                "hover:shadow-xl"
            );
            const imgCard = document.createElement("div");
            imgCard.classList.add("img-card", "p-4");
            const img = document.createElement("img");
            img.classList.add("h-24");
            img.src = product.image;
            img.alt = product.name;
            imgCard.appendChild(img);
            productCard.appendChild(imgCard);

            const textCard = document.createElement("div");
            textCard.classList.add(
                "text-card",
                "p-4",
                "bg-BattleshipGrey",
                "rounded-b-3xl",
                "w-full",
                "h-full"
            );
            const name = document.createElement("h3");
            name.classList.add("text-lg", "font-semibold");
            name.textContent = product.name;
            textCard.appendChild(name);
            const price = document.createElement("p");
            price.classList.add("text-sm", "font-semibold");
            price.textContent = "€" + product.price;
            const amountInput = document.createElement("input");
            amountInput.classList.add(
                "amount-input",
                "w-16",
                "px-2",
                "py-1",
                "rounded-md",
                "text-sm",
                "font-semibold"
            );
            amountInput.type = "number";
            amountInput.min = 1;
            amountInput.value = 1;

            textCard.appendChild(amountInput);
            textCard.appendChild(price);
            const addToCartButton = document.createElement("button");
            addToCartButton.classList.add(
                "add-to-cart-button",
                "bg-blue-500",
                "text-white",
                "px-4",
                "py-2",
                "rounded-md",
                "text-sm",
                "font-semibold"
            );
            addToCartButton.id = product.name;
            addToCartButton.textContent = "Add to Cart";
            addToCartButton.addEventListener("click", () => {
                const cartItems = JSON.parse(localStorage.getItem("cart_SK8"));
                const amount = parseInt(amountInput.value);
                const existingItem = cartItems.find(
                    (item) => item.name === product.name
                );

                if (existingItem) {
                    existingItem.amount += amount;
                } else {
                    product.amount = amount;
                    cartItems.push(product);
                }

                localStorage.setItem("cart_SK8", JSON.stringify(cartItems));
                dotCart();
            });

            textCard.appendChild(addToCartButton);
            productCard.appendChild(textCard);

            recommendedDiv.appendChild(productCard);
        });
    });

    const categoryDiv = document.getElementById("categories");

    Object.entries(jsonProducts.categories).forEach(
        ([categoryName, products]) => {
            const categoryCard = document.createElement("div");
            categoryCard.classList.add(
                "product-card",
                "outline",
                "rounded-3xl",
                "flex",
                "flex-col",
                "justify-center",
                "items-center",
                "shadow-md",
                "lg:w-56",
                "duration-500",
                "hover:scale-105",
                "hover:shadow-xl"
            );

            const textCard = document.createElement("div");
            const img = document.createElement("img");
            img.classList.add("h-24");
            img.src = products[0].image;
            img.alt = products[0].name;
            textCard.appendChild(img);
            textCard.classList.add(
                "text-card",
                "p-4",
                "rounded-3xl",
                "w-48",
                "h-48",
                "flex",
                "flex-col",
                "justify-center",
                "items-center"
            );
            const name = document.createElement("h3");
            name.classList.add("text-lg", "font-semibold");
            name.textContent = categoryName;
            textCard.appendChild(name);
            categoryCard.appendChild(textCard);

            categoryCard.addEventListener("click", () => {
                const allProductsDiv = document.getElementById("all-products");
                allProductsDiv.innerHTML = "";

                products.forEach((product) => {
                    const productCard = document.createElement("div");
                    productCard.classList.add(
                        "product-card",
                        "outline",
                        "rounded-3xl",
                        "flex",
                        "flex-col",
                        "justify-center",
                        "items-center",
                        "shadow-md",
                        "sm:w-48",
                        "duration-500",
                        "hover:scale-105",
                        "hover:shadow-xl"
                    );
                    const imgCard = document.createElement("div");
                    imgCard.classList.add("img-card", "p-4");
                    const img2 = document.createElement("img");
                    img2.classList.add("h-24");
                    img2.src = product.image;
                    img2.alt = product.name;
                    imgCard.appendChild(img2);
                    productCard.appendChild(imgCard);

                    const textCard2 = document.createElement("div");
                    textCard2.classList.add(
                        "text-card",
                        "p-4",
                        "bg-BattleshipGrey",
                        "rounded-b-3xl",
                        "w-full",
                        "h-full"
                    );
                    const name2 = document.createElement("h3");
                    name2.classList.add("text-lg", "font-semibold");
                    name2.textContent = product.name;
                    textCard2.appendChild(name2);
                    const price = document.createElement("p");
                    price.classList.add("text-sm", "font-semibold");
                    price.textContent = "€" + product.price;
                    const amountInput = document.createElement("input");
                    amountInput.classList.add(
                        "amount-input",
                        "w-16",
                        "px-2",
                        "py-1",
                        "rounded-md",
                        "text-sm",
                        "font-semibold"
                    );
                    amountInput.type = "number";
                    amountInput.min = 1;
                    amountInput.value = 1;
                    textCard2.appendChild(amountInput);

                    const addToCartButton = document.createElement("button");
                    addToCartButton.classList.add(
                        "add-to-cart-button",
                        "bg-blue-500",
                        "text-white",
                        "px-4",
                        "py-2",
                        "rounded-md",
                        "text-sm",
                        "font-semibold"
                    );
                    addToCartButton.id = product.name;
                    addToCartButton.textContent = "Add to Cart";
                    addToCartButton.addEventListener("click", () => {
                        const cartItems = JSON.parse(localStorage.getItem("cart_SK8"));
                        const amount = parseInt(amountInput.value);
                        const existingItem = cartItems.find(
                            (item) => item.name === product.name
                        );

                        if (existingItem) {
                            existingItem.amount += amount;
                        } else {
                            product.amount = amount;
                            cartItems.push(product);
                        }

                        localStorage.setItem("cart_SK8", JSON.stringify(cartItems));
                    });

                    textCard2.appendChild(price);
                    textCard2.appendChild(addToCartButton);
                    productCard.appendChild(textCard2);

                    allProductsDiv.appendChild(productCard);
                    dotCart();
                });
            });

            categoryDiv.appendChild(categoryCard);
        }
    );

    const allProductsDiv = document.getElementById("all-products");

    Object.entries(jsonProducts.categories).forEach(
        ([categoryName, products]) => {
            products.forEach((product) => {
                const productCard = document.createElement("div");
                productCard.classList.add(
                    "product-card",
                    "outline",
                    "rounded-3xl",
                    "flex",
                    "flex-col",
                    "justify-center",
                    "items-center",
                    "shadow-md",
                    "lg:w-56",
                    "duration-500",
                    "hover:scale-105",
                    "hover:shadow-xl"
                );
                const imgCard = document.createElement("div");
                imgCard.classList.add("img-card", "p-4");
                const img = document.createElement("img");
                img.classList.add("h-24");
                img.src = product.image;
                img.alt = product.name;
                imgCard.appendChild(img);
                productCard.appendChild(imgCard);

                const textCard = document.createElement("div");
                textCard.classList.add(
                    "text-card",
                    "p-4",
                    "bg-BattleshipGrey",
                    "rounded-b-3xl",
                    "w-full",
                    "h-full"
                );
                const name = document.createElement("h3");
                name.classList.add("text-lg", "font-semibold");
                name.textContent = product.name;
                textCard.appendChild(name);
                const price = document.createElement("p");
                price.classList.add("text-sm", "font-semibold");
                price.textContent = "€" + product.price;
                const amountInput = document.createElement("input");
                amountInput.classList.add(
                    "amount-input",
                    "w-16",
                    "px-2",
                    "py-1",
                    "rounded-md",
                    "text-sm",
                    "font-semibold"
                );
                amountInput.type = "number";
                amountInput.min = 1;
                amountInput.value = 1;
                textCard.appendChild(amountInput);

                const addToCartButton = document.createElement("button");
                addToCartButton.classList.add(
                    "add-to-cart-button",
                    "bg-blue-500",
                    "text-white",
                    "px-4",
                    "py-2",
                    "rounded-md",
                    "text-sm",
                    "font-semibold"
                );
                addToCartButton.id = product.name;
                addToCartButton.textContent = "Add to Cart";
                addToCartButton.addEventListener("click", () => {
                    const cartItems = JSON.parse(localStorage.getItem("cart_SK8"));
                    const amount = parseInt(amountInput.value);
                    const existingItem = cartItems.find(
                        (item) => item.name === product.name
                    );

                    if (existingItem) {
                        existingItem.amount += amount;
                    } else {
                        product.amount = amount;
                        cartItems.push(product);
                    }

                    localStorage.setItem("cart_SK8", JSON.stringify(cartItems));
                    dotCart();
                });

                textCard.appendChild(price);
                textCard.appendChild(addToCartButton);
                productCard.appendChild(textCard);

                allProductsDiv.appendChild(productCard);
            });
        }
    );
}

const cartButton = document.getElementById("cartButton");

cartButton.addEventListener("click", () => {
    // Create a container for the shopping cart
    const cartContainer = document.createElement("div");
    cartContainer.classList.add(
        "cart-container",
        "rounded-3xl",
        "p-4",
        "z-50",
        "bg-DarkerKhaki",
        "w-1/2",
        "h-fit",
        "shadow-md"
    );
    cartContainer.style.position = "fixed";
    cartContainer.style.top = "50%";
    cartContainer.style.left = "50%";
    cartContainer.style.transform = "translate(-50%, -50%)";

    const closeTitleDiv = document.createElement("div");
    closeTitleDiv.classList.add("flex", "justify-between", "items-center");

    const closeButton = document.createElement("button");
    closeButton.textContent = "x";
    closeButton.classList.add(
        "bg-red-500",
        "text-white",
        "px-2",
        "py-1",
        "rounded-md",
        "text-sm",
        "font-semibold"
    );
    closeButton.addEventListener("click", () => {
        cartContainer.remove();
        dotCart();
    });

    closeTitleDiv.appendChild(closeButton);

    const title = document.createElement("h2");
    title.textContent = "Cart";
    title.classList.add("text-lg", "font-semibold");
    closeTitleDiv.appendChild(title);

    cartContainer.appendChild(closeTitleDiv);

    // Get the cart items from local storage
    const cartItems = JSON.parse(localStorage.getItem("cart_SK8"));

    // Loop through the cart items and create a cart item element for each item
    cartItems.forEach((item) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add(
            "cart-item",
            "flex",
            "flex-col",
            "sm:flex-row",
            "justify-between",
            "items-center",
            "p-2",
            "bg-BattleshipGrey",
            "rounded-md",
            "mb-2"
        );

        const itemimagediv = document.createElement("div");
        itemimagediv.classList.add(
            "flex",
            "md:flex-row",
            "flex-col",
            "justify-center",
            "items-center"
        );

        const itemImage = document.createElement("img");
        itemImage.src = item.image;
        itemImage.alt = item.name;
        itemImage.classList.add("h-24");
        itemimagediv.appendChild(itemImage);

        const itemName = document.createElement("p");
        itemName.classList.add("ml-1");
        itemName.textContent = item.name;
        itemimagediv.appendChild(itemName);

        cartItem.appendChild(itemimagediv);

        const itemdiv = document.createElement("div");
        itemdiv.classList.add(
            "flex",
            "md:flex-row",
            "flex-col",
            "justify-between",
            "items-center"
        );

        const itemPrice = document.createElement("p");
        itemPrice.classList.add("mx-5");
        itemPrice.textContent = "€" + (item.price * item.amount).toFixed(2);
        itemdiv.appendChild(itemPrice);

        const amountdiv = document.createElement("div");
        amountdiv.classList.add(
            "flex",
            "justify-between",
            "items-center",
            "mx-1",
            "mb-2",
            "mt-2"
        );

        const decreaseButton = document.createElement("button");
        decreaseButton.textContent = "-";
        decreaseButton.classList.add(
            "bg-blue-500",
            "text-white",
            "px-2",
            "py-1",
            "rounded-md",
            "text-sm",
            "font-semibold"
        );
        decreaseButton.addEventListener("click", () => {
            if (item.amount > 1) {
                item.amount--;
                itemAmount.textContent = item.amount;
                localStorage.setItem("cart_SK8", JSON.stringify(cartItems));
                itemPrice.textContent = "€" + (item.price * item.amount).toFixed(2);
            }
        });
        amountdiv.appendChild(decreaseButton);
        amountdiv.classList.add("bg-white", "rounded-md");

        const itemAmount = document.createElement("p");

        itemAmount.textContent = item.amount;
        itemAmount.classList.add("mx-2");
        amountdiv.appendChild(itemAmount);

        const increaseButton = document.createElement("button");
        increaseButton.textContent = "+";
        increaseButton.classList.add(
            "bg-blue-500",
            "text-white",
            "px-2",
            "py-1",
            "rounded-md",
            "text-sm",
            "font-semibold"
        );

        increaseButton.addEventListener("click", () => {
            item.amount++;
            itemAmount.textContent = item.amount;
            localStorage.setItem("cart_SK8", JSON.stringify(cartItems));
            itemPrice.textContent = "€" + (item.price * item.amount).toFixed(2);
        });
        amountdiv.appendChild(increaseButton);

        itemdiv.appendChild(amountdiv);

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.classList.add(
            "bg-red-500",
            "text-white",
            "px-2",
            "py-1",
            "rounded-md",
            "text-sm",
            "font-semibold"
        );
        removeButton.addEventListener("click", () => {
            const newCartItems = cartItems.filter(
                (cartItem2) => cartItem2.name !== item.name
            );
            localStorage.setItem("cart_SK8", JSON.stringify(newCartItems));
            itemPrice.textContent = "€" + (item.price * item.amount).toFixed(2);
            cartItem.remove();
            dotCart();
        });
        itemdiv.appendChild(removeButton);

        cartItem.appendChild(itemdiv);

        // Add the cart item to the cart container
        cartContainer.appendChild(cartItem);
    });

    const confirmOrderButton = document.createElement("button");
    confirmOrderButton.textContent = "Confirm Order";
    confirmOrderButton.classList.add(
        "bg-green-500",
        "text-white",
        "px-4",
        "py-2",
        "rounded-md",
        "text-sm",
        "font-semibold"
    );
    confirmOrderButton.addEventListener("click", () => {
        // Get the cart items from local storage
        const cartItems2 = JSON.parse(localStorage.getItem("cart_SK8"));

        // Store the order in local storage or send it to the server
        const order = {
            id: Math.floor(Math.random() * 1000000),
            items: cartItems2,
            date: new Date().toISOString(),
        };
        const orders = JSON.parse(localStorage.getItem("orders_SK8")) || [];
        orders.push(order);
        localStorage.setItem("orders_SK8", JSON.stringify(orders));

        // Reset the cart by setting an empty array in local storage
        localStorage.setItem("cart_SK8", JSON.stringify([]));

        // Remove the cart container from the DOM
        cartContainer.remove();

        // Display a success message or redirect to a confirmation page
        alert("Order confirmed! Thank you for your purchase.");
        dotCart();
    });

    cartContainer.appendChild(confirmOrderButton);

    // Append the cart container to the body
    document.body.appendChild(cartContainer);

    // Create a local storage item for orders
});

const searchButton = document.getElementById("search");
const searchInput = document.getElementById("search-input");

const jsonProducts = JSON.parse(localStorage.getItem("jsonProducts"));
console.log("jsonProducts local:", jsonProducts);

searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (searchTerm !== "") {
        // Perform search logic here
        const products = Object.values(jsonProducts.categories).flat();
        const searchResults = products.filter((product) =>
            product.name.toLowerCase().includes(searchTerm)
        );
        console.log("Search results:", searchResults);

        // Clear the previous search results
        const allProductsDiv = document.getElementById("all-products");
        allProductsDiv.innerHTML = "";
        const categoryDiv = document.getElementById("categories");
        categoryDiv.innerHTML = "";
        const recommendedDiv = document.getElementById("recomended");
        recommendedDiv.innerHTML = "";
        document.getElementById("hidden").classList.add("hidden");
        document.getElementById("hidden2").classList.add("hidden");

        document.getElementById("results").innerText = `results`;

        // Display the search results
        searchResults.forEach((product) => {
            const productCard = document.createElement("div");
            productCard.classList.add(
                "product-card",
                "outline",
                "rounded-3xl",
                "flex",
                "flex-col",
                "justify-center",
                "items-center",
                "shadow-md",
                "w-60",
                "duration-500",
                "hover:scale-105",
                "hover:shadow-xl"
            );
            const imgCard = document.createElement("div");
            imgCard.classList.add("img-card", "p-4");
            const img = document.createElement("img");
            img.classList.add("h-24");
            img.src = product.image;
            img.alt = product.name;
            imgCard.appendChild(img);
            productCard.appendChild(imgCard);

            const textCard = document.createElement("div");
            textCard.classList.add(
                "text-card",
                "p-4",
                "bg-BattleshipGrey",
                "rounded-b-3xl",
                "w-full",
                "h-full"
            );
            const name = document.createElement("h3");
            name.classList.add("text-lg", "font-semibold");
            name.textContent = product.name;
            textCard.appendChild(name);
            const price = document.createElement("p");
            price.classList.add("text-sm", "font-semibold");
            price.textContent = "€" + product.price;
            const amountInput = document.createElement("input");
            amountInput.classList.add(
                "amount-input",
                "w-16",
                "px-2",
                "py-1",
                "rounded-md",
                "text-sm",
                "font-semibold"
            );
            amountInput.type = "number";
            amountInput.min = 1;
            amountInput.value = 1;
            textCard.appendChild(amountInput);

            const addToCartButton = document.createElement("button");
            addToCartButton.classList.add(
                "add-to-cart-button",
                "bg-blue-500",
                "text-white",
                "px-4",
                "py-2",
                "rounded-md",
                "text-sm",
                "font-semibold"
            );
            addToCartButton.id = product.name;
            addToCartButton.textContent = "Add to Cart";
            addToCartButton.addEventListener("click", () => {
                const cartItems = JSON.parse(localStorage.getItem("cart_SK8"));
                const amount = parseInt(amountInput.value);
                const existingItem = cartItems.find(
                    (item) => item.name === product.name
                );

                if (existingItem) {
                    existingItem.amount += amount;
                } else {
                    product.amount = amount;
                    cartItems.push(product);
                }

                localStorage.setItem("cart_SK8", JSON.stringify(cartItems));
                dotCart();
            });

            textCard.appendChild(price);
            textCard.appendChild(addToCartButton);
            productCard.appendChild(textCard);

            allProductsDiv.appendChild(productCard);
        });
    } else {
        // Reset the page
        const allProductsDiv = document.getElementById("all-products");
        allProductsDiv.innerHTML = "";
        document.getElementById("hidden").classList.remove("hidden");
        document.getElementById("hidden2").classList.remove("hidden");
        waitForFetchData();
    }
});
