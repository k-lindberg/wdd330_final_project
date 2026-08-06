import RebrickableAPI from "./RebrickableAPI.mjs";
import FakeStoreAPI from "./FakeStoreAPI.mjs";
import { renderThemeDropdown } from "./themeDropdown.mjs";
import { renderSetCards } from "./cards.mjs";
import { renderModal } from "./details.mjs";
import { openSetModal } from "./modal.mjs";
import { getLocalStorage, loadHeaderFooter, setLocalStorage } from "./utilities.mjs";

const rebrick = new RebrickableAPI();

const setList = document.getElementById("setList");

const surpriseBtn = document.getElementById("surpriseBtn");
if (surpriseBtn) {
    surpriseBtn.addEventListener("click", async () => {
        const set = await getRandomSet();
        openSetModal(set.set_num);
    });
}

async function init() {
    loadHeaderFooter();

    let themes = getLocalStorage("themes");

    if (!themes) {
        themes = await rebrick.getThemes();
        setLocalStorage("themes", themes);
    }
 
    renderThemeDropdown(themes);
}

document.addEventListener("DOMContentLoaded", () => {
    init();
});

const themeSelect = document.getElementById("themeSelect");
if (themeSelect) {
    themeSelect.addEventListener("change", async (e) => {
        const themeId = e.target.value;
        const sets = await rebrick.getAllSetsByTheme(themeId);
        renderSetCards(sets, setList);
    });
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

