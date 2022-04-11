//Profile info appears here
const overview = document.querySelector('.overview');
//Display repo list
const repoList = document.querySelector('.repo-list');

const username = 'kimberlythomas';

const getData = async function () {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();
    displayUserData(data);
};

getData();

const displayUserData = function(data) {
    const div = document.createElement('div');
    div.classList.add('user-info');
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
    for (const repo of repos) {
        const repoItem = document.createElement('li');
        repoItem.classList.add('repo');
        repoItem.innerHTML = `<h3>${repo.name}</h3>`
        repoList.append(repoItem);
    }
};
