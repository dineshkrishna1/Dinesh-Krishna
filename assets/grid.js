document.addEventListener("DOMContentLoaded", function () {
    const gridItems = document.querySelectorAll(".grid-item");
    const popup = document.querySelector(".grid-popup-overlay");
    const popupImage = document.querySelector("#grid-popup-image");
    const popupTitle = document.querySelector("#grid-popup-title");
    const popupPrice = document.querySelector("#grid-popup-price");
    const popupVariants = document.querySelector("#grid-popup-variants");
    const closePopup = document.querySelector(".grid-close-popup");
    const addToCart = document.querySelector(".grid-add-to-cart");

    gridItems.forEach(item => {
        item.querySelector(".grid-popup-btn").addEventListener("click", function () {
            let productId = item.dataset.productId;

            // Fetch product details using Shopify's AJAX API
            fetch(`/products/${productId}.json`)
                .then(response => response.json())
                .then(data => {
                    let product = data.product;
                    popupImage.src = product.images[0].src;
                    popupTitle.innerText = product.title;
                    popupPrice.innerText = `$${product.variants[0].price}`;

                    // Populate variants
                    popupVariants.innerHTML = "";
                    product.variants.forEach(variant => {
                        let variantButton = document.createElement("button");
                        variantButton.innerText = variant.title;
                        variantButton.dataset.variantId = variant.id;
                        variantButton.classList.add("grid-variant-option");
                        popupVariants.appendChild(variantButton);
                    });

                    popup.style.display = "flex";
                });
        });
    });

    closePopup.addEventListener("click", function () {
        popup.style.display = "none";
    });

    popup.addEventListener("click", function (e) {
        if (e.target === popup) popup.style.display = "none";
    });

    addToCart.addEventListener("click", function () {
        let selectedVariant = document.querySelector(".grid-variant-option.selected");
        if (!selectedVariant) {
            alert("Please select a variant.");
            return;
        }

        let variantId = selectedVariant.dataset.variantId;

        fetch("/cart/add.js", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: variantId, quantity: 1 })
        })
        .then(response => response.json())
        .then(() => alert("Added to cart!"));
    });

    document.addEventListener("click", function (e) {
        if (e.target.classList.contains("grid-variant-option")) {
            document.querySelectorAll(".grid-variant-option").forEach(btn => btn.classList.remove("selected"));
            e.target.classList.add("selected");
        }
    });
});
