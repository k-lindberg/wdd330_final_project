async function convertToJson(res) {
    const jsonResponse = await res.json();
    if (res.ok) {
        return jsonResponse;
    } else {
        throw { name: "servicesError", message: jsonResponse };
    }
}

const rebrickBaseURL = "https://rebrickable.com/api/v3/lego/";
const rebrickKey = "a088bdcd41c17fb4b78efae67b940bb4";

export default class RebrickableAPI {
    
    async getThemes() {
        let allThemes = [];
        let url = `${rebrickBaseURL}themes/?key=${rebrickKey}`;

        while (url) {
            const response = await fetch(url);
            const data = await convertToJson(response);

            allThemes.push(...data.results);
            url = data.next;
        } 
        return allThemes;
    }

    async getSetsByTheme(themeId) {
        const response = await fetch(`${rebrickBaseURL}sets/?theme_id=${themeId}&key=${rebrickKey}`);
        return convertToJson(response);
    }

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
