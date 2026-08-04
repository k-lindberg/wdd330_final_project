import RebrickableAPI from "./RebrickableAPI.mjs";
import GoLegoAPI from "./GoLegoAPI.mjs";
import { renderThemeDropdown } from "./themeDropdown.mjs";
import { renderSetCards } from "./cards.mjs";
import { findPriceForSet, getLocalStorage, loadHeaderFooter, setLocalStorage } from "./utilities.mjs";

const rebrick = new RebrickableAPI();
const goLego = new GoLegoAPI();

const setList = document.getElementById("setList");
const themeSelect = document.getElementById("themeSelect");
const surpriseBtn = document.getElementById("surpriseBtn");
surpriseBtn.addEventListener("click", async () => {
    const set = await getRandomSet();
    openSetModal(set.set_num);
});

async function init() {
    loadHeaderFooter();

    let themes = getLocalStorage("themes");

    if (!themes) {
        themes = await rebrick.getThemes();
        setLocalStorage("themes", themes);
    }
 
    renderThemeDropdown(themes);

    //window.goLegoSets = await goLego.getAllSets();
}

document.addEventListener("DOMContentLoaded", () => {
    init();
});

themeSelect.addEventListener("change", async (e) => {
    const themeId = e.target.value;
    const sets = await rebrick.getAllSetsByTheme(themeId);
    renderSetCards(sets, setList);
});

async function openSetModal(setId) {
    const setDetails = await rebrick.getSetById(setId);
    const parts = await rebrick.getAllPartsForSet(setId);
    const minifigs = await rebrick.getAllMinifigsForSet(setId);

    const price = findPriceForSet(setId)

    renderModal(setDetails, parts, minifigs, price);
}

async function getRandomSet() {
    try {

        const themes = getLocalStorage("themes");
        const randomTheme = themes[Math.floor(Math.random() * themes.length)];

        const sets = await rebrick.getAllSetsByTheme(randomTheme.id);

        return sets[Math.floor(Math.random() * sets.length)];

    } catch (error) {
        console.error('Error fetching data: ', error);
    }
}

