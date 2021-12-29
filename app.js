const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('view engine', 'pug'); //this setsup Pug to be used with Express. And will look for templates in the folder named 'views.'

const mainRoutes = require('./routes');
const cardRoutes = require('./routes/cards');

app.use(mainRoutes); //the 'routes' variable is used to make another middleware by passing 'routes' into it.
app.use('/cards', cardRoutes);



//THESE ARE ALL MIDDLEWARE (APP.GET, ETC). MIDDLEWARE IS ENDED BY EITHER NEXT(); OR PROVIDING A RESPONSE.


app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
}); //this middleware will just be responsible for creating the error object and handing it off to the error handler.

app.use((err, req, res, next) => { //this is the Error Middleware
    res.locals.error = err;
    res.status(err.status); //since http errors is not native to JavaScript, we use the status() method to add the 500 code, which means something unexpected happened.
    res.render('error'); //'error' is the route to our Pug file error.pug
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000');
});


