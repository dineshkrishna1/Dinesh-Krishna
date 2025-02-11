document.addEventListener("DOMContentLoaded", function () {
  function openPopup(element) {
    let productId = element.getAttribute("data-product-id");

    fetch(`/products/${productId}.json`)
      .then(response => response.json())
      .then(data => {
        let product = data.product;

        document.getElementById("popup-image").src = product.images[0].src;
        document.getElementById("popup-title").innerText = product.title;
        document.getElementById("popup-price").innerText = `$${product.variants[0].price}`;
        document.getElementById("popup-description").innerText = product.body_html;

        let colorOptions = product.options.find(opt => opt.name === "Color");
        let colorContainer = document.getElementById("popup-colors");
        colorContainer.innerHTML = "";
        if (colorOptions) {
          colorOptions.values.forEach(color => {
            let colorBtn = document.createElement("button");
            colorBtn.innerText = color;
            colorBtn.classList.add("color-option");
            colorBtn.onclick = () => selectColor(color);
            colorContainer.appendChild(colorBtn);
          });
        }

        let sizeOptions = product.options.find(opt => opt.name === "Size");
        let sizeSelect = document.getElementById("popup-sizes");
        sizeSelect.innerHTML = "<option>Select Size</option>";
        if (sizeOptions) {
          sizeOptions.values.forEach(size => {
            let sizeOption = document.createElement("option");
            sizeOption.innerText = size;
            sizeSelect.appendChild(sizeOption);
          });
        }

        document.getElementById("popup").style.display = "flex";
      });
  }

  function closePopup() {
    document.getElementById("popup").style.display = "none";
  }

  window.openPopup = openPopup;
  window.closePopup = closePopup;
});
