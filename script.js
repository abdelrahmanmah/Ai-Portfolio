document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                 observer.unobserve(entry.target); // Optionally unobserve after it's animated
            }
        });
    }, {
        threshold: 0.2 // Threshold at which element becomes visible
    });

    document.querySelectorAll('.fade-in').forEach((element) => {
        observer.observe(element);
    });

    const projectsList = document.getElementById('projects-list');
    // Function to fetch GitHub repos
   async function fetchGithubRepos() {
        const username = 'YOUR_GITHUB_USERNAME';
        const url = `https://api.github.com/users/${username}/repos`;

        try {
          const response = await fetch(url);
          const repos = await response.json();

          if (!Array.isArray(repos)) {
             console.error('Error fetching or parsing github repos data');
             return;
           }

          repos.forEach(repo => {
               const projectDiv = document.createElement('div');
               projectDiv.classList.add('project');
               projectDiv.innerHTML = `
                  <h3>${repo.name}</h3>
                   <p>${repo.description || 'No description provided'}</p>
                  <a href="${repo.html_url}" target="_blank" class="button">View on GitHub</a>
               `;
               projectsList.appendChild(projectDiv);
             });
        } catch(error) {
           console.error('Failed to fetch repositories', error);
        }

    }
   fetchGithubRepos();
});