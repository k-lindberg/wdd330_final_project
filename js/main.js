import BricksetAPI from "./BricksetAPI.mjs";
import RebrickableAPI from "./RebrickableAPI.mjs"
import { loadHeaderFooter } from "./utilities.mjs";

loadHeaderFooter();

const brickset = new BricksetAPI();
const rebrick = new RebrickableAPI();

const themes = await brickset.getThemes();
renderThemeDropdown(themes);

themeSelect.addEventListener("change", async (e) => {
    const theme = e.target.value;
    const sets = await brickset.getSetsByTheme(theme);
    renderSetCards(sets);
});

async function openSetModal(setId) {
    const setDetails = await brickset.getSetById(setId);
    const parts = await rebrick.getPartsForSet(setId);
    const minifigs = await rebrick.getMinifigsForSet(setId);

    renderModal(setDetails, parts, minifigs);
}