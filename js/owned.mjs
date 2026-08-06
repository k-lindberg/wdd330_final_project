import { loadHeaderFooter, getLocalStorage } from "./utilities.mjs";
import { renderSetCards } from "./cards.mjs";

loadHeaderFooter();

const containerElement = document.querySelector("#ownedCards");

const ownedSets = getLocalStorage("owned") || [];

renderSetCards(ownedSets, containerElement);

if (ownedSets.length === 0) {
    containerElement.textContent = "You haven't added any owned sets yet.";
}