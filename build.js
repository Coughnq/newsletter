const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
let builtHtml = html.replace('__GOOGLE_SCRIPT_URL_CONTACT__', process.env.GOOGLE_SCRIPT_URL_CONTACT);
builtHtml = builtHtml.replace('__GOOGLE_SCRIPT_URL_SUBSCRIBE__', process.env.GOOGLE_SCRIPT_URL_SUBSCRIBE);
fs.writeFileSync('dist/index.html', builtHtml);
