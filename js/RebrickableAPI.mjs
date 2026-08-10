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

    async getSetById(setId) {
        const response = await fetch(`${rebrickBaseURL}sets/${setId}/?key=${rebrickKey}`);
        
        return convertToJson(response);
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
