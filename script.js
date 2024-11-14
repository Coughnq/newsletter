document.addEventListener('DOMContentLoaded', () => {
    // Handle newsletter subscription
    const subscribeForm = document.querySelector('.subscribe-form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const emailInput = subscribeForm.querySelector('input[type="email"]');
            const email = emailInput.value;
            const button = subscribeForm.querySelector('button');
            const originalText = button.textContent;

            try {
                const response = await fetch('https://script.google.com/macros/s/AKfycbx0sr2i1UEiRu_9sz79Bm2iz95M5KZe0p9bXeYy39cI2iWMyOLhIU8B6Zbu7LjVyUWe/exec', {
                    method: 'POST',
                    mode: 'no-cors',
                    body: JSON.stringify({ email: email }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                button.textContent = 'Subscribed!';
                emailInput.value = '';
                
                // Store locally for stats
                storeSubscriber(email);
            } catch (error) {
                console.error('Subscription error:', error);
                button.textContent = 'Error - Try Again';
            }

            // Reset button text after 2 seconds
            setTimeout(() => {
                button.textContent = originalText;
            }, 2000);
        });
    }

    // Add smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add animation for read more links
    const readMoreLinks = document.querySelectorAll('.read-more');
    readMoreLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateX(5px)';
            link.style.transition = 'transform 0.2s ease';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateX(0)';
        });
    });

    // Search functionality for archive page
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const articles = document.querySelectorAll('.archive-item');
            
            articles.forEach(article => {
                const title = article.querySelector('h2').textContent.toLowerCase();
                const content = article.querySelector('p:not(.article-date)').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || content.includes(searchTerm)) {
                    article.style.display = 'block';
                } else {
                    article.style.display = 'none';
                }
            });
        });
    }

    // Newsletter Statistics
    const stats = {
        subscribers: 0,
        articlesPublished: 1,
        lastUpdated: new Date()
    };

    async function fetchSubscriberCount() {
        try {
            // Replace with your Google Apps Script URL that returns subscriber count
            const response = await fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?action=getCount', {
                method: 'GET'
            });
            const data = await response.json();
            return data.count;
        } catch (error) {
            console.error('Error fetching subscriber count:', error);
            return 0;
        }
    }

    function updateStats() {
        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            // Get actual articles count from archive
            const archiveArticles = document.querySelectorAll('.archive-item');
            stats.articlesPublished = archiveArticles.length || 0;

            statsSection.innerHTML = `
                <div class="stat-item">
                    <h3>${stats.subscribers}</h3>
                    <p>Subscribers</p>
                </div>
                <div class="stat-item">
                    <h3>${stats.articlesPublished}</h3>
                    <p>Articles Published</p>
                </div>
            `;
        }
    }

    // Initialize stats with real data
    async function initializeStats() {
        stats.subscribers = await fetchSubscriberCount();
        updateStats();
    }

    // Update stats when page loads
    initializeStats();

    // Important Resources
    const resources = [
        {
            name: "National Suicide Prevention Lifeline",
            phone: "988",
            link: "https://988lifeline.org/",
            description: "24/7 free and confidential support",
            pageLink: "/resources/suicide-prevention.html"
        },
        {
            name: "SAMHSA's National Helpline",
            phone: "1-800-662-4357",
            link: "https://www.samhsa.gov/find-help/national-helpline",
            description: "Treatment referral and information service",
            pageLink: "/resources/samhsa.html"
        },
        {
            name: "National Alliance on Mental Illness",
            phone: "1-800-950-6264",
            link: "https://www.nami.org/help",
            description: "Mental health support and resources",
            pageLink: "/resources/nami.html"
        },
        {
            name: "Veterans Crisis Line",
            phone: "988, Press 1",
            link: "https://www.veteranscrisisline.net/",
            description: "Support for veterans and their loved ones",
            pageLink: "/resources/veterans-crisis.html"
        }
    ];

    function displayResources() {
        const resourcesSection = document.querySelector('.resources-section');
        if (resourcesSection) {
            resourcesSection.innerHTML = `
                <h2>Important Resources</h2>
                <div class="resources-grid">
                    ${resources.map(resource => `
                        <div class="resource-item">
                            <h3>${resource.name}</h3>
                            <p class="resource-phone">${resource.phone}</p>
                            <p>${resource.description}</p>
                            <div class="resource-links">
                                <a href="${resource.link}" target="_blank">Call Now</a>
                                <a href="${resource.pageLink}" target="_blank">Learn More</a>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }
    }

    // Update subscriber count from Google Sheets
    function storeSubscriber(email) {
        // The count will be updated automatically when the Google Sheet updates
        stats.subscribers += 1; // Increment temporarily for UI feedback
        updateStats();
    }

    // Display resources immediately
    displayResources();
}); 
