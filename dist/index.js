"use strict";
exports.__esModule = true;
var express = require("express");
var generatePassword = require("password-generator");
var path = require("path");
var app = express();
var PORT = process.env.PORT || 5000;
// Serve static files from the React
app.use(express.static(path.join(__dirname, '..', 'client/build')));
// Put all API endpoints under '/api'
app.get('/api/passwords', function (req, res) {
    var count = 5;
    // Generate some passwords
    var passwords = Array.from(Array(count).keys()).map(function (i) {
        return generatePassword(12, false);
    });
    // Return them as json
    res.json(passwords);
    console.log("Sent " + count + " passwords");
});
/*
 * The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
 *
 */
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '..', '/client/build/index.html'));
});
app.listen(PORT);
console.log("Password generator listening on " + PORT);
