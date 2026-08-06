// Rendering Set Cards
import { openSetModal } from "./modal.mjs";
import { toggleSetInLocalStorage } from "./utilities.mjs";

export function renderSetCards(sets, container) {
    container.innerHTML = "";

    sets.forEach(set => {
        const card = createSetCard(set);
        container.appendChild(card);
    });
}

export function createSetCard(set) {
    const card = document.createElement("div");
    card.classList.add("set-card");

    card.innerHTML = `
        <button type="button" class="ownedBtn">Owned</button>
        <button type="button" class="wishlistBtn">Add to Wishlist</button>
        <img src="${set.set_img_url}" alt="${set.name}">
        <h3>${set.name}</h3>
        <button type="button" class="detailsBtn">Details</button>
    `;

    card.querySelector(".ownedBtn").addEventListener("click", () => {
        const action = toggleSetInLocalStorage("owned", set);

        if (action === "Added") {
            card.querySelector(".ownedBtn").textContent = "Owned ✓";
        } else {
            card.querySelector(".ownedBtn").textContent = "Owned";
        }
        
    });

    card.querySelector(".wishlistBtn").addEventListener("click", () => {
        const action = toggleSetInLocalStorage("wishlist", set);

        if (action === "Added") {
            card.querySelector(".wishlistBtn").textContent = "Added to Wishlist ❤️";
        } else {
            card.querySelector(".wishlistBtn").textContent = "Add to Wishlist";
        }
    });

    card.querySelector(".detailsBtn").addEventListener("click", () => {
        openSetModal(set.set_num);
    });

    return card;
}