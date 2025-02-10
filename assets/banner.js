document.addEventListener("DOMContentLoaded", function () {
  const button = document.querySelectorAll(".choose-gift-button");

  button.forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      btn.style.transform = "scale(1.1)";
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "scale(1)";
    });
  });
});
