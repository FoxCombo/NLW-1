const buttonSearch = document.querySelector("#page-home main a")
const modal = document.querySelector("#modal")
const closeWindow = document.querySelector("#modal .header a")

buttonSearch.addEventListener("click", () => {
    modal.classList.remove("hide")
});

closeWindow.addEventListener("click", () => {
    modal.classList.add("hide")
});