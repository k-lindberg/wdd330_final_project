// Surprise Me set picker

// Header and Footer

// retrieve data from localstorage
export function getLocalStorage(key) {
    // console.log(JSON.parse(localStorage.getItem(key)));
    return JSON.parse(localStorage.getItem(key));
}

// save data to local storage
export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}


export function renderWithTemplate(template, parentElement, data, callback) {
    parentElement.innerHTML = template;
    // if clear is true we need to clear out the contents of the parent.
    if (callback) {
        callback(data);
    }
}

export async function loadTemplate(path) {
    const res = await fetch(path);
    const template = await res.text();
    return template;
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../partials/header.html");
  const headerElement = document.querySelector("#header");

  renderWithTemplate(headerTemplate, headerElement);

  const footerTemplate = await loadTemplate("../partials/footer.html");
  const footerElement = document.querySelector("#footer");

  renderWithTemplate(footerTemplate, footerElement);
}