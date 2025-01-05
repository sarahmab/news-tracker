const newsList = document.getElementById('news-list');

async function fetchNews() {
    const category = document.getElementById('category').value;
    const searchQuery = document.getElementById('searchQuery').value.trim();
    const query = searchQuery ? `&q=${searchQuery}` : ''; 

    const url = `http://localhost:3000/news?category=${category}${query}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.articles) {
            alert('Error fetching news articles.');
            return;
        }

        newsList.innerHTML = ''; 

        data.articles.forEach(article => {
            const articleElement = document.createElement('div');
            articleElement.classList.add('news-item');

            articleElement.innerHTML = `
                <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
                <p>${article.description || 'No description available.'}</p>
                <p><strong>Source:</strong> ${article.source.name}</p>
            `;

            newsList.appendChild(articleElement);
        });
    } catch (error) {
        alert('Failed to fetch news. Please try again later.');
        console.error(error);
    }
}
