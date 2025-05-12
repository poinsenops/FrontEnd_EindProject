// Fetch data from local storage
const data = localStorage.getItem('jsonProducts');

// Use the fetched data
console.log(data);
console.log(JSON.parse(data));

// Get the submit button
const submitButton = document.querySelector('#submit-button');

// Add event listener to the submit button
submitButton.addEventListener('click', function (event) {
    // Prevent the default form submission
    event.preventDefault();

    // Get all the form elements
    const forms = document.querySelectorAll('form');

    let newItem = {};
    let category = '';
    // Loop through the forms
    forms.forEach(function (form) {
        category = form[1].value;

        newItem = {
            id: form[2].value,
            name: form[0].value,
            price: form[3].value,
            image: form[4].value,
            amount: 0,
        };
        console.log(newItem);
    });
    // Push the new item into the jsonProducts.categories.[form[1].value] in the local storage
    const categories = JSON.parse(data).categories;


    if (categories.hasOwnProperty(category)) {
        categories[category].push(newItem);
    } else {
        categories[category] = [newItem];
    }

    // Update the local storage
    localStorage.setItem('jsonProducts', JSON.stringify({ categories }));

    // Display the updated data
    console.log(localStorage.getItem('jsonProducts'));

    alert('Item added successfully!');
    window.location.assign('../admin.html');
});