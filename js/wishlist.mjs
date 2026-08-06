import { loadHeaderFooter, getLocalStorage } from "./utilities.mjs";
import { renderSetCards } from "./cards.mjs";

loadHeaderFooter();

const containerElement = document.querySelector("#wishlistCards");

const wishlistSets = getLocalStorage("wishlist") || [];

renderSetCards(wishlistSets, containerElement);

if (wishlistSets.length === 0) {
    containerElement.textContent = "You haven't added any sets to your wishlist yet.";
}