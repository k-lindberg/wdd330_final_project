export function renderThemeDropdown(themes) {
    const themeSelect = document.getElementById("themeSelect");

    themeSelect.innerHTML = "";

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Select a theme";
    themeSelect.appendChild(defaultOption);

    const uniqueThemes = [...new Map(themes.map(t => [t.name, t])).values()];

    uniqueThemes.sort((a, b) => a.name.localeCompare(b.name));

    uniqueThemes.forEach(t => {
        const option = document.createElement("option");
        option.value = t.id;
        option.textContent = t.name;
        themeSelect.appendChild(option);
    });
}