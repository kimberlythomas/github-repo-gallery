//Profile info appears here
const overview = document.querySelector(".overview");
//Display repo list
const repoList = document.querySelector(".repo-list");
// Display repo information
const showAllRepoInfo = document.querySelector(".repos");
//Display individual repo data
const repoData = document.querySelector(".repo-data");
//Back to repo gallery button
const viewReposButton = document.querySelector(".view-repos");
//Search repos by name box
const filterInput = document.querySelector(".filter-repos");

const username = "kimberlythomas";

const getData = async function () {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();
    displayUserData(data);
};

getData();

const displayUserData = function(data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = 
    `<figure>
        <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Bio:</strong> ${data.bio}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>`;
    overview.append(div);
    getRepoList();
};

const getRepoList = async function () {
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);
    const repoData = await fetchRepos.json();
    displayRepoData(repoData);
};

const displayRepoData = function(repos) {
    filterInput.classList.remove("hide");
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`
        repoList.append(repoItem);
    }
};

repoList.addEventListener("click", function(e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    }
});

const getRepoInfo = async function(repoName) {
    const fetchRepoInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchRepoInfo.json();
    //console.log(repoInfo);
    const fetchLanguages = await fetch(`https://api.github.com/repos/${username}/${repoName}/languages`);
    const languageData = await fetchLanguages.json();
    //console.log(languageData);
    const languages = [];
    for (const language in languageData) {
        languages.push(language);
        //console.log(languages);
    }
    displayRepoInfo(repoInfo, languages);
};

const displayRepoInfo = async function(repoInfo, languages) {
    repoData.innerHTML = "";
    repoData.classList.remove("hide");
    showAllRepoInfo.classList.add("hide");
    viewReposButton.classList.remove("hide");
    const div = document.createElement("div");
    div.innerHTML = `
        <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
        `;
    repoData.append(div);
};

viewReposButton.addEventListener("click", function() {
    showAllRepoInfo.classList.remove("hide");
    repoData.classList.add("hide");
    viewReposButton.classList.add("hide");
});

filterInput.addEventListener("input", function(e) {
    const searchText = e.target.value;
    const repos = document.querySelectorAll(".repo");
    const searchLowerCase = searchText.toLowerCase();
    for (const repo of repos) {
        const repoLowerCase = repo.innerText.toLowerCase();
        if(repoLowerCase.includes(searchLowerCase)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }
});