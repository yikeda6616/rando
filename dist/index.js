"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var generatePassword = require("password-generator");
var app = express();
var PORT = process.env.PORT || 5000;
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('/api/passwords', function (req, res) {
    var count = 5;
    // Generate some passwords
    var passwords = Array.from(Array(count).keys()).map(function (i) {
        return generatePassword(12, false);
    });
    res.json(passwords);
    console.log("Sent " + count + " passwords");
});
/*
 * The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
 *
 */
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});
app.listen(PORT);
console.log("Password generator listening on " + PORT);
