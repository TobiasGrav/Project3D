const express = require('express');
var fs = require('fs');

const portNumber = 3000;

const app = express();

app.get('/', (request, response) => {

    fs.readFile('./src/WebPage.html', 'utf8', (err, html) => {
        response.send(html);
    });

} );

app.listen(portNumber, () => console.log('app available on http://localhost:' + portNumber))