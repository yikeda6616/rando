"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const path = __importStar(require("path"));
const generatePassword = __importStar(require("password-generator"));
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('/api/passwords', (req, res) => {
    const count = 5;
    // Generate some passwords
    const passwords = Array.from(Array(count).keys()).map(i => generatePassword(12, false));
    res.json(passwords);
    console.log(`Sent ${count} passwords`);
});
/*
 * The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
 *
 */
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});
app.listen(PORT);
console.log(`Password generator listening on ${PORT}`);
