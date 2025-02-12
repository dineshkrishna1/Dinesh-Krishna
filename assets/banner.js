<script>
document.addEventListener("DOMContentLoaded", function () {
  const button = document.querySelector(".choose-gift-button");
  button.addEventListener("mouseenter", () => {
    button.style.transform = "scale(1.1)";
  });
  button.addEventListener("mouseleave", () => {
    button.style.transform = "scale(1)";
  });
});
</script>