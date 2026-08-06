import FakeStoreAPI from "./FakeStoreAPI.mjs";

// Set detail modal
export async function renderModal(set, minifigs) {
    
    const modalContent = document.getElementById("modalContent");

    const formattedSetNum = set.set_num.split("-")[0];

    const fakeStore = new FakeStoreAPI();
    const randomProductId = Math.floor(Math.random() * 20) + 1;
    const marketPrice = await fakeStore.getPrice(randomProductId);

    const minifigHTML = minifigs.length
        ? minifigs.map(fig => {
            const imgHTML = fig.set_img_url
                ? `<img src="${fig.set_img_url}" alt="${fig.set_name}">`
                : `<p>No Image Available.</p>`;

            return `
            <div class="minifig">
                <p>${fig.set_name}</p>    
                ${imgHTML} 
            </div>
        `;
        }).join('')
        : `<p>No minifigures included.</p>`;
    
    modalContent.innerHTML = `
        <img src="${set.set_img_url}" alt="${set.name}">
        <h3>${set.name}</h3>
        <p>Set #: ${formattedSetNum}</p>
        <p>Piece Count: ${set.num_parts}</p>
        <p>Year: ${set.year}</p>
        <p>Price: ${marketPrice ? `"$${marketPrice}"` : "Not Available"}</p>
        <h4>Minifigures: </h4>
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