document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const subscribeForm = document.getElementById('subscribe-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitForm(this, 'https://script.google.com/macros/s/AKfycby0B5ad6XseKF_TttaJ-TtqqPfqjDafAV7i1I8bofsnDwuIDtxiqNfChKiJuWfK2mp_/exec');
        });
    }

    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Submitting to:', 'https://script.google.com/macros/s/AKfycbzFrjP0SzFOitwkfSvj4VkPFwwF27_y74eEfgAUC0rUI2pfQZrrzvulk_Qx2e-TO2Hr-g/exec');
            submitForm(this, '__GOOGLE_SCRIPT_URL_SUBSCRIBE__');
        });
    }

    function submitForm(form, url) {
        fetch(url, {
            method: 'POST',
            body: new FormData(form)
        })
        .then(response => response.json())
        .then(data => {
            if (data.result === 'success') {
                alert('Submission successful!');
                form.reset();
            } else {
                throw new Error('Submission failed');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error submitting form. Please try again.');
        });
    }
});
