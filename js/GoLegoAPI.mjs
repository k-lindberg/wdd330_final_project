async function convertToJson(res) {
    const jsonResponse = await res.json();
    if (res.ok) {
        return jsonResponse;
    } else {
        throw { name: "servicesError", message: jsonResponse };
    }
}

const goLegoURL = "https://go-lego-api.vercel.app/api/allsets";

export default class GoLegoAPI {

    async getAllSets() {
        const response = await fetch(`${goLegoURL}`);
        return convertToJson(response);
    }
}