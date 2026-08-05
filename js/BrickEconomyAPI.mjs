// async function convertToJson(res) {
//     const jsonResponse = await res.json();
//     if (res.ok) {
//         return jsonResponse;
//     } else {
//         throw { name: "servicesError", message: jsonResponse };
//     }
// }

// const goLegoURL = "https://go-lego-api.vercel.app/api/allsets";

// export default class GoLegoAPI {

//     async getAllSets() {
//         const response = await fetch(`${goLegoURL}`);
//         return convertToJson(response);
//     }
// }

export async function getBrickEconomyPrice(setNum) {
    const url = `https://www.brickeconomy.com/api/v1/sets/${setNum}`;
    const response = await fetch(url);
    if (!response.ok) return null;

    const data = await response.json();
    return data.retail_price ?? data.current_value ?? null;
}
