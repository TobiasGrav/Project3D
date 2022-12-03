/**
 * main.js is the main file of the project, this wil run a server on your computer.
 */
const express = require('express');
var fs = require('fs');
const path = require('path')

//which port number you want to listen on when starting the server
const portNumber = 3000;

const app = express();

app.use(express.static(__dirname + '/public'))
app.use('/build/', express.static(path.join(__dirname, 'node_modules/three/build')))
app.use('/jsm/', express.static(path.join(__dirname, 'node_modules/three/examples/jsm')))

app.listen(portNumber, () => console.log('app available on http://localhost:' + portNumber))