const express = require('express');
const path = require('path');
const { storeRouter } = require('./Routes/storeRouter');
const { hostRouter } = require('./Routes/hostRouter');
const errorController = require('./controllers/error');
const { mongoConnect } = require('./utils/databaseUtil')

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Debug middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();

});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// routes
app.use(storeRouter);
app.use(hostRouter);

// 404 sabse last(error wala);
app.use(errorController.pageNotFound);


const PORT = 3000;
mongoConnect( ()=>{
    app.listen(PORT, ()=>{
        console.log(`server running at http://localhost:${port}`);
    });
})
