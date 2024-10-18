const fetchProfile = () => {
    const username = document.querySelector("#username").value;
    const profileElement = document.querySelector("#profile");

    if (!username) {
        alert("Please enter a valid Github username");
        return;
    }

    profileElement.innerHTML = '<p>Loading...</p>';

    fetch(`https://api.github.com/users/${username}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('User not found');
            }
            return response.json();
        })
        .then(data => {
            displayProfile(data);
        })
        .catch(error => {
            profileElement.innerHTML = `<p class="error">${error.message}</p>`;
        });
};

const displayProfile = (profileData) => {
    const profileElement = document.querySelector("#profile");
    profileElement.innerHTML = `
        <img src="${profileData.avatar_url}" alt="${profileData.name || profileData.login}'s avatar">
        <h2>${profileData.name || profileData.login}</h2>
        ${profileData.bio ? `<p>${profileData.bio}</p>` : ''}
        <p>Followers: ${profileData.followers} | Following: ${profileData.following}</p>
        <p>Public Repositories: ${profileData.public_repos}</p>
        ${profileData.location ? `<p>Location: ${profileData.location}</p>` : ''}
        ${profileData.blog ? `<p>Website: <a href="${profileData.blog}" target="_blank">${profileData.blog}</a></p>` : ''}
        <a href="${profileData.html_url}" target="_blank">View profile on Github</a>
    `;
};