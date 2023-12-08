// Select the main list element and all radio buttons
const listElement = document.querySelector('[wb-dash-el="list"]');
const radios = document.querySelectorAll('[wb-dash-el="radio"]');

// Clone the list element's children to use as templates for rendering items
const itemTemplates = Array.from(listElement.cloneNode(true).children);

// Function to calculate the total price of items in the list
function calculateTotal() {
  // Convert NodeList to Array, map to extract prices, and reduce to sum them up
  const total = Array.from(listElement.querySelectorAll('[wb-dash-el="price"]'))
    .map((el) => Number(el.textContent)) // Convert text content to number
    .reduce((acc, curr) => acc + curr, 0); // Sum up all prices

  return total;
}

// Function to update the total price display
function updateTotal(total) {
  const totalElement = document.querySelector('[wb-dash-el="total"]');
  totalElement.textContent = total; // Update the text content with the total price
}

// Function to filter items by category
function filterItemsByCategory(category) {
  return itemTemplates.filter((item) => {
    if (category === "All") return true; // If 'All' category is selected, return all items
    const itemCategory = item.querySelector(
      '[wb-dash-el="category"]'
    ).textContent;
    return itemCategory === category; // Return items that match the selected category
  });
}

// Function to render items based on the selected category
function renderItems() {
  // Get the currently selected category
  const selectedCategory = document.querySelector(
    '[wb-dash-el="radio"]:checked'
  ).nextElementSibling.textContent;

  listElement.innerHTML = ""; // Clear the current list

  const filteredItems = filterItemsByCategory(selectedCategory); // Filter items by selected category

  // Append each filtered item to the list
  filteredItems.forEach((item) => {
    listElement.appendChild(item.cloneNode(true)); // Clone the node to avoid removing it from the template
  });

  updateTotal(calculateTotal()); // Update the total price display
}

// Add change event listeners to all radio buttons
radios.forEach((radio) => {
  radio.addEventListener("change", renderItems);
});

// Initial calculation and rendering of total
updateTotal(calculateTotal());
