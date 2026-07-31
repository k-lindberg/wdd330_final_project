function convertToJson(res) {
    const jsonResponse = res.json();
    if (res.ok) {
        return jsonResponse;
    } else {
        throw { name: "servicesError", message: jsonResponse };
    }
}

const bricksetBaseURL = "https://brickset.com/api/v3/json/";
const bricksetKey = "3-bNQh-AVhc-7ymuS";
const bricksetUser = "MinnietheMoose18"

export default class BricksetAPI {

    async getThemes() {
        const payload = {
            apiKey: bricksetKey,
            username: bricksetUser
        };

        const response = await fetch(`${bricksetBaseURL}getThemes`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        return convertToJson(response);
    }
    async getSetsByTheme(theme) {
        const payload = {
            apiKey: bricksetKey,
            username: bricksetUser,
            theme: theme
        };

        const response = await fetch(`${bricksetBaseURL}getSets`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        return convertToJson(response);
    }
    async getSetById(setNumber) {
        const payload = {
            apiKey: bricksetKey,
            username: bricksetUser,
            setNumber: setNumber
        };

        const response = await fetch(`${bricksetBaseURL}getSets`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        return convertToJson(response);
    }
}