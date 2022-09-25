const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(
    express.urlencoded({
      extended: false,
    }),
);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.use('/boat-slips', require('./routes/boat-slips'));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log('Server started on Port 8080'));