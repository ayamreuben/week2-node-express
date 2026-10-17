const express = require('express');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

const requestlog = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} request made to: ${req.url}`);
    next();
}

app.use(requestlog);

app.get('/', (req, res) => res.send('My Week2 API!'));

app.post('/user', (req, res) =>{
    const {name, email} = req.body;

    if (!name || !email) return res.status (400).json({
        error: 'Bad request: Kindly fill in the blank space'});
    res.status (201).json({message: `Registered: ${name} (${email})` });
})

app.get('/user/:id', (req, res) => {
    res.json({id: req.params.id, name : 'sample user'});
})

app.listen(PORT, () => {
    console.log(`API live on port ${PORT}`);
});