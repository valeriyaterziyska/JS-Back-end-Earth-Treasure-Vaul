const express = require('express');
//TODO: Change the port
const PORT = 5000;

const app = express();

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.listen(PORT, () => console.log(`App is listening on http://localhost:${PORT}`));

