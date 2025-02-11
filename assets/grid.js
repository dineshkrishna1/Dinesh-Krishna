document.addEventListener("DOMContentLoaded", function () {
    const popup = document.querySelector(".grid-popup-overlay");
    const popupImage = document.querySelector("#grid-popup-image");
    const popupTitle = document.querySelector("#grid-popup-title");
    const popupPrice = document.querySelector("#grid-popup-price");
    const closePopup = document.querySelector(".grid-close-popup");

    document.querySelectorAll(".grid-popup-btn").forEach(button => {
        button.addEventListener("click", function () {
            let productId = this.dataset.productId;

            // Fetch product details using Shopify's AJAX API
            fetch(`/products/${productId}.json`)
                .then(response => response.json())
                .then(data => {
                    let product = data.product;
                    popupImage.src = product.images[0].src;
                    popupTitle.innerText = product.title;
                    popupPrice.innerText = `$${product.variants[0].price}`;
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
});
