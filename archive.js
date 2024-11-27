// Sample article data - In a real application, this would come from a backend
const articles = [
    {
        id: 1,
        title: "The Intro",
        date: "November 2024",
        excerpt: "The beginning of something new.",
        url: "/archive/pages/Newsletter1.html"
    },
    {
        id: 2,
        title: "A journey lit by AI: Reflections from the Founder",
        date: "November 2024",
        excerpt: "Abner Sanabria-Cruz reflects on the journey of Intelliquinte and the role of AI in his life.",
        url: "/archive/pages/Newsletter2.html"
    },

    // Add more articles as needed
];

// DOM Elements
const searchInput = document.getElementById('searchInput');
const articlesContainer = document.getElementById('articlesContainer');

// Render articles function
function renderArticles(articlesToRender) {
    if (articlesToRender.length === 0) {
        articlesContainer.innerHTML = `
            <div class="no-results">
                No articles found matching your search.
            </div>
        `;
        return;
    }

    articlesContainer.innerHTML = articlesToRender.map(article => `
        <article class="article-card">
            <div class="article-date">${article.date}</div>
            <h2 class="article-title">${article.title}</h2>
            <p class="article-excerpt">${article.excerpt}</p>
            <a href="${article.url}" class="read-more">Read More</a>
        </article>
    `).join('');
}

// Search functionality
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredArticles = articles.filter(article => 
        article.title.toLowerCase().includes(searchTerm) ||
        article.excerpt.toLowerCase().includes(searchTerm)
    );
    renderArticles(filteredArticles);
}

// Event listeners
searchInput.addEventListener('input', handleSearch);

// Initial render
renderArticles(articles); 