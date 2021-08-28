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
const serverRoutes = require('./routes/server.routes');
const indexRoute = require('./routes/index.route');
app.use('*', checkUser);
app.use('/', indexRoute);
app.use('/', authRoutes);
app.use('/', requireAuth, serverRoutes);
app.get('/get',requireAuth, (req, res) => {
    res.render('get');
})


const port = 5000;
app.listen(port, () => {
    console.log("App is listening to port ", port);
});