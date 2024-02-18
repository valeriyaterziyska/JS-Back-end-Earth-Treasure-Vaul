const express = require('express');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const PORT = 3000;
const dbName = 'earth-treasure';

const routes = require('./routes');
const { authMiddleware } = require('./middlewares/authMiddleware');

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(authMiddleware);

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));
app.set('view engine', 'hbs');
app.use(routes);

//TODO: change database name
mongoose.connect(`mongodb://localhost:27017/${dbName}`);
mongoose.connection.on('connected', () => console.log(`DB is connected!`));
// mongoose.connection.on('disconnected', () => console.log(`DB is disconnected!`));
mongoose.connection.on('error', (err) => console.log(`DB error ${err}`));

app.listen(PORT, () => console.log(`App is listening on http://localhost:${PORT}`));

