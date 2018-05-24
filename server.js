const sendgridMail = require('@sendgrid/mail');
const functions = require('firebase-functions');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const PORT = 4200;
const SENDGRID_API_KEY = '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';

app.use(express.static('dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/api/mail', (req, res) => {
  sendgridMail.setApiKey(SENDGRID_API_KEY);
  sendgridMail.send(req.body);

  return res.send();
});

app.get('*', (req, res) => {
  return res.sendFile(path.resolve('dist/index.html'));
});

app.listen(PORT, () => {
  console.log('App application listening on port 4200!');
})

functions.https.onRequest(app);