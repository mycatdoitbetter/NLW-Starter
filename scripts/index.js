const searchButton = document.querySelector("#page-home main a");
const modal = document.querySelector("#modal");
const close = document.querySelector("#modal .header a");

searchButton.addEventListener("click", () => {
  modal.classList.remove("hide");
});

close.addEventListener("click", () => {
  modal.classList.add("hide");
});
