/**
 * Load event listener
 */
window.addEventListener("load", () => {
  init();
});

/**
 * Init since first time load
 */
function init() {
  const url = `https://api.github.com/users/tutorjs/repos`;
  fetch(url, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(data => {
      const el = createReposElement(data);
      mountElement(el);
    })
    .catch(error => console.error(error));
}

/**
 * Handle get data from rest api
 * @param {array} data
 */
function createReposElement(data) {
  let div = document.createElement('div');
  div.classList.add('clearfix')
  const repoItem = data.map(createRepoItemElement).join("");
  div.innerHTML = repoItem;
  return div;
}

/**
 * Handle create repo item element.
 * @param {object} repo
 */
function createRepoItemElement(repo) {
  return `
    <div class="repo-item">
      <a href="${repo.html_url}"><strong>${repo.name}</strong></a>
      <p class="repo-item-description">${
    repo.description == null ? "" : repo.description
    }</p>
      <a href="${repo.homepage == null ? "#" : repo.homepage}" class="repo-item-homepage">
        ${repo.homepage == null ? "" : "homepage"}
      </a>
      <p class="repo-item-language">${repo.language}</p>
    </div>
  `;
}

/**
 * Handle mount element.
 * @param {DOMElement} el
 */
function mountElement(el) {
  const repo = document.getElementById("repos");
  repo.appendChild(el);
}
