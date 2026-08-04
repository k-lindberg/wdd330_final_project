// Rendering Set Cards

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

    const img = set.set_img_url;

    card.innerHTML = `
        <img src="${img}" alt="${set.name}">
        <h3>${set.name}</h3>
        <p>Set #: ${set.set_num}</p>
        <p>Year: ${set.year}</p>
        <p>Piece Count: ${set.num_parts}</p>
        <button type="button" class="detailsBtn">Details</button>
    `;

    return card;
}