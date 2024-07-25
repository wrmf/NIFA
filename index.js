const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const app = express();
const port = 5000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    let error = 'You are not currently logged in';
    if (req.session.authenticated) {
        res.redirect('/rec');
    } else {
        res.render('index', { error });
    }
});

app.post('/', (req, res) => {
    const submittedPass = req.body.psw;
    if (submittedPass === 'password') { // Use your actual password checking logic
        req.session.authenticated = true;
        res.redirect('/rec');
    } else {
        let error = 'Incorrect password. Please try again.';
        res.render('index', { error });
    }
});

app.get('/rec', (req, res) => {
    if (!req.session.authenticated) {
        return res.redirect('/');
    }

    // Read your data and pass it to the template
    // Example:
    const recData = {}; // Replace with actual data reading logic
    res.render('rec', { recData });
});

// Other routes...

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
