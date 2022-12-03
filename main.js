/**
 * index is the main file of the project, this is the which
 * will be run when starting the projec trough node.js.
 */
const express = require('express');
var fs = require('fs');
const path = require('path')

//which port number you want to use when starting the localserver.
const portNumber = 25565;

const app = express();

app.use(express.static(__dirname + '/public'))
app.use('/build/', express.static(path.join(__dirname, 'node_modules/three/build')))
app.use('/jsm/', express.static(path.join(__dirname, 'node_modules/three/examples/jsm')))

app.listen(portNumber, () => console.log('app available on http://localhost:' + portNumber))