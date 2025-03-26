// Select the main list element and all radio buttons
const listElement = document.querySelector('[wb-dash-el="list"]');
const radios = document.querySelectorAll('[wb-dash-el="radio"]');

const itemTemplates = Array.from(listElement.cloneNode(true).children);

// Function to calculate the total price of items in the list
function calculateTotal() {
  const total = Array.from(listElement.querySelectorAll('[wb-dash-el="price"]'))
    .map((el) => Number(el.textContent))
    .reduce((acc, curr) => acc + curr, 0);
  return total;
}

// Function to update the total price display
function updateTotal(total) {
  const totalElement = document.querySelector('[wb-dash-el="total"]');
  totalElement.textContent = total;
}

// Function to filter items by category
function filterItemsByCategory(category) {
  return itemTemplates.filter((item) => { 
    if (category === "All") return true;
    const itemCategory = item.querySelector(
      '[wb-dash-el="category"]'
      ).textContent;
    return itemCategory === category;
});
}

// Function to render items based on the selected category
function renderItems() {
  const selectedCategory = document.querySelector(
    '[wb-dash-el="radio"]:checked'
  ).nextElementSibling.textContent;

  listElement.innerHTML = "";

  const filteredItems = filterItemsByCategory(selectedCategory);

  filteredItems.forEach((item) => {
    listElement.appendChild(item.cloneNode(true));
  });
  updateTotal(calculateTotal());
}

// Add change event listeners to all radio buttons
radios.forEach((radio) => {
  radio.addEventListener("change", renderItems);
});

// Initial calculation and rendering of total
updateTotal(calculateTotal());

