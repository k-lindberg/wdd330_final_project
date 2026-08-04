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

    async getAllSets() {
        let allSets = [];
        let url = `${rebrickBaseURL}sets/?key=${rebrickKey}`;

        while (url) {
            const response = await fetch(url);
            const data = await convertToJson(response);

            allSets.push(...data.results);
            url = data.next;
        }

        return allSets;
    }

    async getAllSetsByTheme(themeId) {
        let allSets = [];
        let url = `${rebrickBaseURL}sets/?theme_id=${themeId}&key=${rebrickKey}`;

        while (url) {
            const response = await fetch(url);
            const data = await convertToJson(response);

            allSets.push(...data.results);
            url = data.next;
        }

        return allSets;
    }

    async getSets(page = 1) {
        const response = await fetch(`${rebrickBaseURL}sets/?page=${page}&key=${rebrickKey}`);
        
        return convertToJson(response);
    }
    async getSetById(setId) {
        const response = await fetch(`${rebrickBaseURL}sets/${setId}/?key=${rebrickKey}`);
        
        return convertToJson(response);
    }
    async getAllMinifigs() {
        let allMinifigs = [];
        let url = `${rebrickBaseURL}minifigs/?key=${rebrickKey}`;

        while (url) {
            const response = await fetch(url);
            const data = await convertToJson(response);

            allMinifigs.push(...data.results);
            url = data.next;
        }

        return allMinifigs;
    }
    async getMinifigById(minifigId) {
        const response = await fetch(`${rebrickBaseURL}minifigs/${minifigId}/?key=${rebrickKey}`);

        return convertToJson(response);
    }
    async getAllPartsForSet(setId) {
        let allParts = [];
        let url = `${rebrickBaseURL}sets/${setId}/parts/?key=${rebrickKey}`;

        while (url) {
            const response = await fetch(url);
            const data = await convertToJson(response);

            allParts.push(...data.results);
            url = data.next;
        }

        return allParts;
    }
    async getMinifigsForSet(setId) {
        let allMinifigs = [];
        let url = `${rebrickBaseURL}sets/${setId}/minifigs/?key=${rebrickKey}`;

        while (url) {
            const response = await fetch(url);
            const data = await convertToJson(response);

            allMinifigs.push(...data.results);
            url = data.next;
        }

        return allMinifigs;
    }
}
