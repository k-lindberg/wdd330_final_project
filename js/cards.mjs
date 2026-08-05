// Rendering Set Cards

import { openSetModal } from "./main.mjs";

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

    card.querySelector(".detailsBtn").addEventListener("click", () => {
        openSetModal(set.set_num);
    });

    return card;
}