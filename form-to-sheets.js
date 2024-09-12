class FormToSheets {
    constructor(formId, scriptUrl) {
      this.form = document.getElementById(formId);
      this.scriptUrl = scriptUrl;
      this.init();
    }
  
    init() {
      this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }
  
    handleSubmit(e) {
      e.preventDefault();
      const formData = new FormData(this.form);
      const data = new URLSearchParams(formData);
  
      fetch(this.scriptUrl, {
        method: 'POST',
        body: data,
      })
      .then(response => response.json())
      .then(data => {
        if (data.result === 'success') {
          alert('Form submitted successfully!');
          this.form.reset();
        } else {
          throw new Error('Submission failed');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error submitting form. Please try again.');
      });
    }
  }
