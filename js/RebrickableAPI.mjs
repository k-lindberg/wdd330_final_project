function convertToJson(res) {
    const jsonResponse = res.json();
    if (res.ok) {
        return jsonResponse;
    } else {
        throw { name: "servicesError", message: jsonResponse };
    }
}

const rebrickBaseURL = "https://rebrickable.com/api/v3/lego/";
const rebrickKey = "a088bdcd41c17fb4b78efae67b940bb4";

export default class RebrickableAPI {
    
    async getSets(page = 1) {
        const response = await fetch(`${rebrickBaseURL}sets/?page=${page}&key=${rebrickKey}`);
        
        return convertToJson(response);
    }
    async getSetById(setId) {
        const response = await fetch(`${rebrickBaseURL}sets/${setId}/?key=${rebrickKey}`);
        
        return convertToJson(response);
    }
    async getMinifigs(page = 1) {
        const response = await fetch(`${rebrickBaseURL}minifigs/?page=${page}&key=${rebrickKey}`);

        return convertToJson(response);
    }
    async getMinifigById(minifigId) {
        const response = await fetch(`${rebrickBaseURL}minifigs/${minifigId}/?key=${rebrickKey}`);

        return convertToJson(response);
    }
    async getPartsForSet(setId) {
        const response = await fetch(`${rebrickBaseURL}sets/${setId}/parts/?key=${rebrickKey}`);

        return convertToJson(response);
    }
    async getMinifigsForSet(setId) {
        const response = await fetch(`${rebrickBaseURL}sets/${setId}/minifigs/?key=${rebrickKey}`);

        return convertToJson(response);
    }
}
