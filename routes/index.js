const express = require('express');
const router = express.Router();

//ROUTES moved from where they were originally created in router.js. 

router.get('/', (req, res) => {
    const name = req.cookies.username;
    if (name) {
        res.render('index', { name }); //we cut and pasted the ', { name: req.cookies.username }' from the /hello page and put it into the root page. We then made things more simpler by creating a new variable 'name' and made it equal to the re.cooies.username then added { name } as the callback to the render.
    } else {
        res.redirect('/hello');
    } //this if else statement makes it so if the user input a name and it's saved as a cookie, they are redirected to the root page with the greeting. If there is not a saved cookie with the unername, then it redirects back to the form page. 
});


router.get('/hello', (req, res) => {
    const name = req.cookies.username;
    if (name) {
        res.redirect('/');
    } else {
        res.render('hello'); //this makes it so the browser automatically gets the value of 'username' from the cookies. So if we submitted a name before, refreshing the page will only show the final welcome with the previous info we submitted. Clearing the cookie and requesting a response again brings us back to the empty form field.
    }
});

router.post('/hello', (req, res) => {
    res.cookie('username', req.body.username);
    res.redirect('/'); //this code makes it so the user can input their name, hit submit, and there name appears in the Welcome.
});

router.post('/goodbye', (req, res) => {
    res.clearCookie('username');
    res.redirect('/hello');
}); //this new router.post route makes it so when the user hits the 'Goodbye' button, the username cookie is cleared and they are redirected back to the '/hello' page. 

module.exports = router;
