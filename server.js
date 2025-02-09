const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const users = []; // In-memory user storage (use a database in production)

app.post('/api/signup', (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    users.push({ username, password: hashedPassword });
    res.status(201).send({ message: 'User created' });
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ id: user.username }, 'secret', { expiresIn: 86400 });
        res.status(200).send({ auth: true, token });
    } else {
        res.status(401).send({ auth: false, token: null });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});