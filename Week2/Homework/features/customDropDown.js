export function handleCustomDropDown() {
  document.querySelectorAll(".custom-dropdown").forEach((dropdown) => {
    const selectedItem = dropdown.querySelector(".dropdown-selected");
    const list = dropdown.querySelector(".dropdown-list");

    selectedItem.addEventListener("click", () => {
      document
        .querySelectorAll(".dropdown-list")
        .forEach((ul) => ul !== list && ul.classList.add("hidden"));
      list.classList.toggle("hidden");
    });

    list.querySelectorAll("li").forEach((item) => {
      item.addEventListener("click", () => {
        selectedItem.textContent = item.textContent;
        selectedItem.dataset.value = item.dataset.value;
        list.classList.add("hidden");
      });
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".custom-dropdown")) {
      document
        .querySelectorAll(".dropdown-list")
        .forEach((list) => list.classList.add("hidden"));
    }
  });
}
