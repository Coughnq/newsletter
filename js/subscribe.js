document.getElementById('subscribeForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formMessage = document.getElementById('formMessage');
    const submitButton = document.querySelector('.submit-button');
    const nameInput = document.querySelector('input[name="name"]');
    const emailInput = document.querySelector('input[type="email"]');
    
    // Disable button during submission
    submitButton.disabled = true;
    submitButton.textContent = 'Subscribing...';
    
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbw4JPMMTbonDhZ5MOWs3zvygWdFvfM74jZ8oYJulQZbWOVUhTm7jCPfUbFWK_qY955K/exec', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'text/plain',
            },
            body: JSON.stringify({
                name: nameInput.value,
                email: emailInput.value
            })
        });

        formMessage.className = 'form-message success';
        formMessage.textContent = 'Thank you for subscribing! Please check your email to confirm your subscription.';
        e.target.reset();

    } catch (error) {
        formMessage.className = 'form-message error';
        formMessage.textContent = 'Sorry, there was an error. Please try again later.';
        console.error('Subscription error:', error);
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Subscribe';
    }
});

// Update the getCount function as well
async function updateSubscriberCount() {
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbw4JPMMTbonDhZ5MOWs3zvygWdFvfM74jZ8oYJulQZbWOVUhTm7jCPfUbFWK_qY955K/exec?action=getCount', {
            method: 'GET',
            mode: 'no-cors'
        });
        const countElement = document.querySelector('.stat-number');
        if (countElement) {
            countElement.textContent = 'Subscribed!';
        }
    } catch (error) {
        console.error('Error fetching subscriber count:', error);
    }
}

document.addEventListener('DOMContentLoaded', updateSubscriberCount); 