import RebrickableAPI from "./RebrickableAPI.mjs";
import { renderThemeDropdown } from "./themeDropdown.mjs";
import { renderSetCards } from "./cards.mjs";
import { loadHeaderFooter } from "./utilities.mjs";

loadHeaderFooter();

const rebrick = new RebrickableAPI();

const setList = document.getElementById("setList");
const themeSelect = document.getElementById("themeSelect");
const surpriseBtn = document.getElementById("surpriseBtn");
// surpriseBtn.addEventListener("click", showRandomSet);

const themes = await rebrick.getThemes();
renderThemeDropdown(themes);

async function init() {
    const response = await rebrick.getSets();
    renderSetCards(response.results, setList);
}

init();

themeSelect.addEventListener("change", async (e) => {
    const themeId = e.target.value;
    const response = await rebrick.getSetsByTheme(themeId);
    renderSetCards(response.results, setList);
});

async function openSetModal(setId) {
    const setDetails = await rebrick.getSetById(setId);
    const parts = await rebrick.getPartsForSet(setId);
    const minifigs = await rebrick.getMinifigsForSet(setId);

    renderModal(setDetails, parts, minifigs);
}

