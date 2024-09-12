const fs = require('fs');

const formsJs = fs.readFileSync('forms.js', 'utf8');
let builtFormsJs = formsJs.replace('__GOOGLE_SCRIPT_URL_CONTACT__', process.env.GOOGLE_SCRIPT_URL_CONTACT);
builtFormsJs = builtFormsJs.replace('__GOOGLE_SCRIPT_URL_SUBSCRIBE__', process.env.GOOGLE_SCRIPT_URL_SUBSCRIBE);
fs.writeFileSync('dist/forms.js', builtFormsJs);

// Copy other necessary files
fs.copyFileSync('index.html', 'dist/index.html');
fs.copyFileSync('styles.css', 'dist/styles.css');
