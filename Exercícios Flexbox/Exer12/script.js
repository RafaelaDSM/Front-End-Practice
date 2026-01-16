const hamburger = document.getElementById("hamburger");
const menu = document.querySelector(".menu");
const icon = document.getElementById("icon");
const links = document.querySelectorAll(".menu a");

function fecharMenu() {
    menu.classList.remove("active");
    hamburger.setAttribute("aria-expanded", false);
    icon.classList.replace("fa-xmark", "fa-bars");
}

hamburger.addEventListener("click", () => {
    const isActive = menu.classList.toggle("active");
    hamburger.setAttribute("aria-expanded", isActive);

    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-xmark");
});

links.forEach(link => {
    link.addEventListener("click", fecharMenu);
});

document.addEventListener("click", (event) => {
    if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
        fecharMenu();
    }
});