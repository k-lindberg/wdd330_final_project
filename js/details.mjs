import { getBrickEconomyPrice } from "./BrickEconomyAPI.mjs";

// Set detail modal
export async function renderModal(set, minifigs) {
    
    const modalContent = document.getElementById("modalContent");

    const retailPrice = await getBrickEconomyPrice(set.set_num);

    const minifigHTML = minifigs.length
        ? minifigs.map(fig => `
            <div class="minifig">
                <img src="${fig.set_thumbnail_url}" alt="${fig.name}">
                <p>${fig.name}</p>
            </div>
            `).join('')
        : `<p>No minifigures included.</p>`
    
    modalContent.innerHTML = `
        <img src="${set.set_thumbnail_url}" alt="${set.name}">
        <h3>${set.name}</h3>
        <p>Set #: ${set.set_num}</p>
        <p>Theme: ${set.themes.name} ${set.subtheme?.name || ""}</p>
        <p>Piece Count: ${set.num_parts}</p>
        <p>Year: ${set.year}</p>
        <p>Original Retail Price: ${retailPrice ? `$${retailPrice}` : "Not Available"}</p>
        <p>Minifigures: </p>
        ${minifigHTML}
    `;
    modal.renderModal();
}

document.getElementById("closeBtn").addEventListener("click", () => {
    modal.close();
});

export const modal = {
    renderModal() {
        document.getElementById("setModal").showModal();
    },
    close() {
        document.getElementById("setModal").close();
    }
};