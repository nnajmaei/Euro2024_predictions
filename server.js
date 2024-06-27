const express = require('express');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const app = express();
const PORT = 3000;

app.use(express.static('public'));

// Serve the JSON file
app.get('/jsons/participants.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'jsons/participants.json'));
});

// Endpoint to get participant scores
app.get('/scores/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'results_csv', req.params.filename);
    const results = [];
    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            res.json(results);
        });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
