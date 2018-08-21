const express = require('express');
const path = require('path');
const app = require('express')();
// static file serve
app.use(express.static(path.join(__dirname, 'dist')));
// not found in static files, so default to index.html
app.use((req, res) => res.sendFile(`${__dirname}/dist/index.html`));
app.listen(3000);