// FakeStoreAPI.mjs
export default class FakeStoreAPI {
    constructor() {
        this.baseUrl = "https://fakestoreapi.com/products";
    }

    async getPrice(productId) {
        try {
            const response = await fetch(`${this.baseUrl}/${productId}`);
            if (!response.ok) {
                console.error("FakeStoreAPI error:", response.status);
                return null;
            }

            const data = await response.json();
            return data.price ?? null;
        } catch (error) {
            console.error("FakeStoreAPI fetch failed:", error);
            return null;
        }
    }
}
