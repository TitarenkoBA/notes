const express = require('express');

const fs = require('fs');

const app = express();

app.use(express.json());
app.use('/', express.static('dist'));

app.get('/api/notes', (req, res) => {
  fs.readFile('server/db/notes.json', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
    } else {
      res.send(data);
    }
  });
});

app.post('/api/updateNotes', (req, res) => {
  fs.writeFile('server/db/notes.json', JSON.stringify(req.body, null, 4), (err) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
    } else {
      res.send({ result: 1, text: 'Success' });
    }
  });
});

app.listen(3000, () => console.log('listening at port 3000...'));
