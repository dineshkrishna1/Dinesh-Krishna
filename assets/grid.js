document.addEventListener("DOMContentLoaded", function () {
    const popup = document.querySelector(".grid-popup-overlay");
    const popupImage = document.querySelector("#popup-image");
    const popupTitle = document.querySelector("#popup-title");
    const popupPrice = document.querySelector("#popup-price");
    const popupDescription = document.querySelector("#popup-description");
    const colorOptions = document.querySelector("#color-options");
    const sizeOptions = document.querySelector("#size-options");
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
                    popupDescription.innerText = product.body_html;

                    // Populate colors
                    colorOptions.innerHTML = "";
                    let colors = [...new Set(product.variants.map(variant => variant.option1))];
                    colors.forEach(color => {
                        let btn = document.createElement("button");
                        btn.innerText = color;
                        btn.onclick = () => selectOption(btn, "color");
                        colorOptions.appendChild(btn);
                    });

                    // Populate sizes
                    sizeOptions.innerHTML = `<option>Choose your size</option>`;
                    let sizes = [...new Set(product.variants.map(variant => variant.option2))];
                    sizes.forEach(size => {
                        let option = document.createElement("option");
                        option.innerText = size;
                        sizeOptions.appendChild(option);
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

    function selectOption(element, type) {
        document.querySelectorAll(`#${type}-options button`).forEach(btn => btn.style.background = "none");
        element.style.background = "black";
        element.style.color = "white";
    }
});
