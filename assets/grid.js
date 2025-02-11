document.addEventListener("DOMContentLoaded", function () {
  const gridContainer = document.getElementById("custom-grid");

  // Sample product data (Replace with actual Shopify Liquid data)
  const products = [
    {
      image: "https://via.placeholder.com/300",
      title: "Product 1",
      price: "$49.99",
      colors: ["Red", "Blue"],
      url: "#"
    },
    {
      image: "https://via.placeholder.com/300",
      title: "Product 2",
      price: "$59.99",
      colors: ["Black", "Grey"],
      url: "#"
    },
    {
      image: "https://via.placeholder.com/300",
      title: "Product 3",
      price: "$39.99",
      colors: ["White", "Yellow"],
      url: "#"
    },
    {
      image: "https://via.placeholder.com/300",
      title: "Product 4",
      price: "$29.99",
      colors: ["Green", "Purple"],
      url: "#"
    },
    {
      image: "https://via.placeholder.com/300",
      title: "Product 5",
      price: "$89.99",
      colors: ["Pink", "Brown"],
      url: "#"
    },
    {
      image: "https://via.placeholder.com/300",
      title: "Product 6",
      price: "$79.99",
      colors: ["Navy", "Beige"],
      url: "#"
    }
  ];

  // Generate grid items dynamically
  let gridHTML = '<div class="grid-container">';
  products.forEach(product => {
    gridHTML += `
      <div class="grid-item">
        <div class="image-container">
          <img src="${product.image}" alt="${product.title}">
          <button class="quick-view" onclick="openPopup('${product.title}', '${product.image}', '${product.price}', '${product.colors.join(", ")}')">+</button>
        </div>
        <h3>${product.title}</h3>
        <p>${product.price}</p>
      </div>
    `;
  });
  gridHTML += "</div>";

  gridContainer.innerHTML = gridHTML;
});

// Popup functionality
function openPopup(title, image, price, colors) {
  const popup = document.createElement("div");
  popup.classList.add("popup-overlay");
  popup.innerHTML = `
    <div class="popup-content">
      <span class="close-popup" onclick="closePopup()">&times;</span>
      <img src="${image}" alt="${title}">
      <h2>${title}</h2>
      <p>${price}</p>
      <p>Available Colors: ${colors}</p>
      <button class="add-to-cart">Add to Cart</button>
    </div>
  `;
  document.body.appendChild(popup);
}

// Close popup
function closePopup() {
  document.querySelector(".popup-overlay").remove();
}
