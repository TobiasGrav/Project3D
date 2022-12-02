/**
 * index is the main file of the project, this is the which
 * will be run when starting the projec trough node.js.
 */
const express = require('express');
var fs = require('fs');

//which port number you want to use when starting the localserver.
const portNumber = 3000;

const app = express();

app.use(express.static("public"))

app.get('/', (request, response) => {

    fs.readFile('./webPage.html', 'utf8', (err, html) => {
        response.send(html);
    });

} );

app.listen(portNumber, () => console.log('app available on http://localhost:' + portNumber))