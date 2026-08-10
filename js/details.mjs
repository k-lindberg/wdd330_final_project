import FakeStoreAPI from "./FakeStoreAPI.mjs";
import RebrickableAPI from "./RebrickableAPI.mjs";

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
        <img id="detailImg" loading="lazy" src="${set.set_img_url}" alt="${set.name}">
        <h3>${set.name}</h3>
        <p>Set #: ${formattedSetNum}</p>
        <p>Piece Count: ${set.num_parts}</p>
        <p>Year: ${set.year}</p>
        <p>Price: ${marketPrice ? `"$${marketPrice}"` : "Not Available"}</p>
        <h4>Minifigures: </h4>
        ${minifigHTML}
    `;
    const img = document.getElementById("detailImg");

    if (img.complete) {
        modal.renderModal();
    } else {
        img.addEventListener("load", () => {
            modal.renderModal();
        });
    }
}

export const modal = {
    renderModal() {
        document.getElementById("setModal").showModal();
    },
    close() {
        document.getElementById("setModal").close();
    }
};

document.getElementById("closeBtn").addEventListener("click", () => {
    modal.close();
});

export async function renderSurpriseModal(set) {
    const modalContent = document.getElementById("surpriseContent");
    const modal = document.getElementById("surpriseModal");

    if (!modalContent || !modal) return;

    const formattedSetNum = set.set_num.split("-")[0];

    const fakeStore = new FakeStoreAPI();
    const randomProductId = Math.floor(Math.random() * 20) + 1;
    const marketPrice = await fakeStore.getPrice(randomProductId);

    const rebrick = new RebrickableAPI();
    const minifigs = await rebrick.getMinifigsForSet(set.set_num);

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
        <img id="surpriseImg" src="${set.set_img_url}" alt="${set.name}">
        <h3>${set.name}</h3>
        <p>Set #: ${formattedSetNum}</p>
        <p>Piece Count: ${set.num_parts}</p>
        <p>Year: ${set.year}</p>
        <p>Price: ${marketPrice ? `"$${marketPrice}"` : "Not Available"}</p>
        <h4>Minifigures: </h4>
        ${minifigHTML}
    `;

    const img = document.getElementById("surpriseImg");

    if (img.complete) {
        surpriseModalController.renderModal();
    } else {
        img.addEventListener("load", () => {
            surpriseModalController.renderModal();
        });
    }
}

export const surpriseModalController = {
    renderModal() {
        document.getElementById("surpriseModal").showModal();
    },
    close() {
        document.getElementById("surpriseModal").close();
    }
};

const surpriseCloseBtn = document.getElementById("surpriseCloseBtn");
if (surpriseCloseBtn) {
    surpriseCloseBtn.addEventListener("click", () => {
        surpriseModalController.close();
    });
}