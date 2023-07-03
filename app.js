// express server which can be visited from the browser
require("dotenv").config();

const express = require("express");
const expressLayout = require("express-ejs-layouts");
const app = express();
const connectDB = require('./server/config/db')

app.use(express.static('public'));

connectDB();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// templating engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.use('/', require('./server/routes/main'));
app.use('/', require('./server/routes/admin'));

const PORT = 5000 || process.env.PORT;






app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); }
)