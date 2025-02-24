'use strict';

import express from 'express';
const app = express();
const PORT = 3000;

app.use(express.urlencoded({extended: true}));

app.use(express.static("public_html"));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});