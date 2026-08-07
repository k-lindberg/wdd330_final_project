// Rendering Set Cards
import { openSetModal } from "./modal.mjs";
import { toggleSetInLocalStorage } from "./utilities.mjs";

export function setInitialButtonState(set, card) {
    const ownedSets = JSON.parse(localStorage.getItem("owned")) || [];
    const wishlistSets = JSON.parse(localStorage.getItem("wishlist")) || [];

    const ownedBtn = card.querySelector(".ownedBtn");
    const wishlistBtn = card.querySelector(".wishlistBtn");

    if (ownedSets.some(s => s.set_num === set.set_num)) {
        ownedBtn.textContent = "Owned ✓";
    } else {
        ownedBtn.textContent = "Owned";
    }

    if (wishlistSets.some(s => s.set_num === set.set_num)) {
        wishlistBtn.textContent = "Added to Wishlist ❤️";
    } else {
        wishlistBtn.textContent = "Add to Wishlist";
    }
}

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
        <div class="buttonRow">
            <button type="button" class="ownedBtn">Owned</button>
            <button type="button" class="wishlistBtn">Add to Wishlist</button>
        </div>
        <img src="${set.set_img_url}" alt="${set.name}">
        <h3>${set.name}</h3>
        <button type="button" class="detailsBtn">Details</button>
    `;

    setInitialButtonState(set, card);

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