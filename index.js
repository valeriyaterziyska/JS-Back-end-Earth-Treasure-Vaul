const express = require('express');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
//TODO: Change the port

const PORT = 5000;
const dbName = 'course-book';

const routes = require('./routes');

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));
app.set('view engine', 'hbs');

app.use(routes);


//TODO: change database name
mongoose.connect(`mongodb://localhost27017/${dbName}`);
mongoose.connection.on('connected', () => console.log(`DB is connected!`));
mongoose.connection.on('disconnected', () => console.log(`DB is disconnected!`));
mongoose.connection.on('error', (err) => console.log(`DB error ${err}`));


app.listen(PORT, () => console.log(`App is listening on http://localhost:${PORT}`));

