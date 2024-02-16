const express = require('express');
const handlebars = require('express-handlebars');
//TODO: Change the port
const PORT = 5000;

const routes = require('./routes');

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));
app.set('view engine', 'hbs');

app.use(routes);


app.listen(PORT, () => console.log(`App is listening on http://localhost:${PORT}`));

