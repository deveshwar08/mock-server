const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();

const dbUri = 'mongodb://127.0.0.1:27017/';
mongoose.connect(dbUri,{dbName: 'mock-server', useNewUrlParser: true, useUnifiedTopology: true})
    .then(console.log("Mongo db connected successfully"))
    .catch(err => console.log(err));

app.set('view engine','ejs');


app.use(express.static('./public'));
app.use(express.json());
app.use(cookieParser());

const { requireAuth, checkUser} = require('./middleware/auth.middleware');
const authRoutes = require('./routes/auth.routes');
app.use('*', checkUser);
app.get('/',requireAuth, (req, res) => res.render('index'));
app.use('/', authRoutes);


const port = 5000;
app.listen(port, () => {
    console.log("App is listening to port ", port);
});