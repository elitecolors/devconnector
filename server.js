const express = require('express');
const connectDB = require('./config/db');
const app = express();

connectDB();

// init middleware

app.use(express.json({
    extended: false
}));
app.get('/', (req, res) => res.send('API Running on localhost'));

app.use('/api/user', require('./routes/api/user'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
