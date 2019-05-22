import * as express from 'express';
import * as path from 'path';
import * as generatePassword from 'password-generator';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/passwords', (req, res) => {
  const count = 5;

  // Generate some passwords
  const passwords = Array.from(Array(count).keys()).map(i =>
    generatePassword(12, false)
  );

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
