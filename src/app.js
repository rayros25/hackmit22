const path = require('path');
const html = require('html')
const express = require('express');
const app = express();

const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));
// app.set('view engine', 'hbs');
// app.set('view engine', 'html');

app.get('', (req, res) => {
    // res.render('index');
    res.sendFile('index.html');
})

app.get('/hello', (req, res) => {
    res.sendFile(publicDirectoryPath + '/hello.html');
    // res.sendFile('hello.html');
})

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})